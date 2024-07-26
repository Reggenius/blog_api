import { asyncWrapper } from "../utils/asyncWrapper";
import { Request, Response } from "express";
import { 
    retrievePaginatedPosts, 
    retrievePost, 
    createPost, 
    updatePost,
    deletePost
} from "../crud/postCrud";
import { StatusCodes } from "http-status-codes";

class PostController {
    getPaginatedPosts = asyncWrapper(async (req: Request, res: Response) => {
        const { page = 1, limit = 10 } = req.query;
        const paginatedPosts = await retrievePaginatedPosts(page, limit);
        res.json({
            status: StatusCodes.OK,
            data: { ...paginatedPosts }
        });
    });

    getPost = asyncWrapper(async (req: Request, res: Response) => {
        const { id } = req.params;
        const postDetail = await retrievePost(id);
        res.json({
            status: StatusCodes.OK,
            data: { ...postDetail }
        });
    });

    createAPost = asyncWrapper(async (req: Request, res: Response) => {
        const { userId } = req;
        const createdPostId = await createPost(userId, req.body);
        res.json({
            status: StatusCodes.OK,
            data: { ...createdPostId }
        });
    });

    updateAPost = asyncWrapper(async (req: Request, res: Response) => {
        const { id } = req.params;
        const { userId } = req;
        const updatedPost = await updatePost(userId, id, req.body);
        res.json({
            status: StatusCodes.OK,
            data: { ...updatedPost }
        });
    });

    deleteAPost = asyncWrapper(async (req: Request, res: Response) => {
        const { id } = req.params;
        const { userId } = req;
        const deletedPostPayload = await deletePost(userId, id);
        res.json({
            status: StatusCodes.OK,
            data: { 
                ...deletedPostPayload
            }
        });
    });
}

const postController = new PostController();

export default postController;