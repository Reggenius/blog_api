import getRepo from "../utils/general";
import Comment from "../entity/Comment";
import User from "../entity/User";
import Post from "../entity/Post";
import { IPaginatedResponse } from "../types";
import { ObjectLiteral } from "typeorm";
import { retrievePost } from "./postCrud";
import { NotFoundError, BadRequestError, ForbiddenError } from "../utils/apiError";
import { ICreateResponse, ICreateArgs } from "../types";
import * as _ from "lodash"

/**-------------------------------- RETRIEVE ALL COMMENTS (PAGINATED) ----------------------------- */
export async function retrievePaginatedComments(postId: string, page: number, limit: number): Promise<IPaginatedResponse<ObjectLiteral>> {
    const postDetails = await retrievePost(postId);
    if (!postDetails)  throw new NotFoundError("Post with the given ID does not exist");

    const offset = (page - 1) * limit;
    const [data, count] = await getRepo(Comment)
                                .createQueryBuilder("comment")
                                .leftJoinAndSelect("comment.post", "post")
                                .where("comment.postId = :postId", { postId })
                                .skip(offset)
                                .take(limit)
                                .getManyAndCount();

    const totalPages = Math.ceil(count / limit);

    return {
        data,
        count,
        totalPages,
        currentPage: page,
    };
}

/**-------------------------------- CREATE A NEW COMMENT ----------------------------- */
export async function createComment(userId: string, postId: string, content: string): Promise<ICreateResponse>{
    const userDetails = await getRepo(User)
                        .createQueryBuilder("user")
                        .where("user.id = :userId", { userId })
                        .getOne();
    
    const postDetails = await getRepo(Post)
                        .createQueryBuilder("post")
                        .where("post.id = :postId", { postId })
                        .getOne();
                        
    if (!userDetails)   throw new BadRequestError("User with the given ID does not exist!.");
    else if (!postDetails)  throw new BadRequestError("Post with the given ID does not exist!.")

    const comment = new Comment();
    comment.content = content;
    comment.user = userDetails as User;
    comment.post = postDetails as Post;
    
    const createdComment: Comment = await getRepo(Comment).save(comment);
    return {
        id: createdComment.id
    }
}

/**-------------------------------- UPDATE A COMMENT-------------------------------- */
export async function updateComment(userId: string, commentId: string, payload: ICreateArgs): Promise<Object> {
    const commentRepo = getRepo(Comment);
    const commentDetail = await commentRepo
                        .createQueryBuilder("comment")
                        .leftJoinAndSelect("comment.user", "user")
                        .where("comment.id = :id", { id: commentId })
                        .getOne();

    if (!commentDetail)    throw new NotFoundError("Sorry, comment with the given ID does not exist!.");
    
    // If user is not the author
    if (commentDetail.user.id, userId !== userId)   throw new ForbiddenError("User can't update this comment.");

    const updatableComment: Comment = commentDetail as Comment;
    updatableComment.content = payload.content;
    
    const updatedComment = await commentRepo.save(updatableComment);

    return _.omit(updatedComment, ["createdAt", "user"]);
}

/**-------------------------------- DELETE A COMMENT-------------------------------- */
export async function deleteComment(userId: string, commentId: string): Promise<Object> {
    const commentRepo = getRepo(Comment);
    const commentToDelete = await commentRepo
                        .createQueryBuilder("comment")
                        .leftJoinAndSelect("comment.user", "user")
                        .where("comment.id = :id", { id: commentId })
                        .getOne();

    if (!commentToDelete)    throw new NotFoundError("Sorry, comment with the given ID does not exist.");
    
    // If user is not the author
    if (commentToDelete.user.id !== userId)   throw new ForbiddenError("User can't delete this comment.");

    const deletedcomment = await commentRepo.delete(commentId);

    return { ...commentToDelete, ...deletedcomment };
}