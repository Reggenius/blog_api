import getRepo from "../utils/general";
import Post from "../entity/Post";
import User from "../entity/User";
import Comment from "../entity/Comment";
import { ICreateArgs } from "../types";
import { IPaginatedResponse } from "../types";
import { ICreateResponse } from "../types";
import { ObjectLiteral } from "typeorm";
import { 
    NotFoundError, 
    BadRequestError, 
    ConflictError, 
    ForbiddenError 
} from "../utils/apiError";
import * as _ from "lodash"

/**-------------------------------- RETRIEVE ALL POSTS (PAGINATED) ----------------------------- */
export async function retrievePaginatedPosts(page: number, limit: number): Promise<IPaginatedResponse<ObjectLiteral>> {
    const offset = (page - 1) * limit;

    const [data, count] = await getRepo(Post)
                            .findAndCount({
                                skip: offset,
                                take: limit,
                                relations: ["user", "comments"]
                            });

    const totalPages = Math.ceil(count / limit);

    return {
        data,
        count,
        totalPages,
        currentPage: page,
    };
}

/**-------------------------------- RETRIEVE A POST ----------------------------- */
export async function retrievePost(id: string): Promise<ObjectLiteral> {
    const postDetails = await getRepo(Post)
                            .createQueryBuilder("post")
                            .leftJoinAndSelect("post.user", "user")
                            .leftJoinAndSelect("post.comments", "comments")
                            .where("post.id = :id", { id })
                            .getOne();
    
    if (postDetails) {
        return postDetails;
    } else {
        throw new NotFoundError("Post with the given ID does not exist.")
    }
}

/**-------------------------------- CREATE A NEW POST ----------------------------- */
export async function createPost(userId: string, payload: ICreateArgs): Promise<ICreateResponse>{
    const userDetails = await getRepo(User)
                        .createQueryBuilder("user")
                        .where("user.id = :userId", { userId })
                        .getOne();
                        
    if (!userDetails)   throw new BadRequestError("User NOT Found");

    const postRepo = getRepo(Post);
    
    const postExists = await getRepo(Post)
                            .createQueryBuilder("post")
                            .leftJoinAndSelect("post.user", "user")
                            .where("user.id = :userId", { userId })
                            .andWhere("post.title = :title", { title: payload.title })
                            .andWhere("post.content = :content", { content: payload.content })
                            .getExists();

    if (postExists)     throw new ConflictError("Post already Exist.");

    const post = new Post();
    const comment: Comment[] = [];
    post.title = payload.title;
    post.content = payload.content;
    post.user = userDetails as User;
    post.comments = comment;
    
    const createdPost: Post = await postRepo.save(post);
    return {
        id: createdPost.id
    }
}

/**-------------------------------- UPDATE POST-------------------------------- */
export async function updatePost(userId: string, postId: string, payload: ICreateArgs): Promise<Object> {
    const postRepo = getRepo(Post);
    const postDetail = await postRepo
                        .createQueryBuilder("post")
                        .leftJoinAndSelect("post.user", "user")
                        .where("post.id = :postId", { postId })
                        .getOne();

    if (!postDetail)    throw new NotFoundError("Sorry, post with the given ID does not exist.");
    
    // If user is not the author
    if (postDetail.user.id !== userId)   throw new ForbiddenError("User can't update this post.");

    const updatablePost: Post = postDetail as Post;
    updatablePost.title = payload.title;
    updatablePost.content = payload.content;
    
    const updatedPost = await postRepo.save(updatablePost);

    return _.omit(updatedPost, ["createdAt"]);
}

/**-------------------------------- DELETE POST-------------------------------- */
export async function deletePost(userId: string, postId: string): Promise<Object> {
    const postRepo = getRepo(Post);
    const postDetail = await postRepo
                        .createQueryBuilder("post")
                        .leftJoinAndSelect("post.user", "user")
                        .where("post.id = :id", { id: postId })
                        .getOne();

    if (!postDetail)    throw new NotFoundError("Sorry, post with the given ID does not exist.");
    
    // If user is not the author
    if (postDetail.user.id !== userId)   throw new ForbiddenError("User can't delete this post.");

    const deletedPost = await postRepo.remove(postDetail);

    return { ...postDetail, ...deletedPost };
}