import { asyncWrapper } from "../utils/asyncWrapper";
import { Request, Response } from "express";
import { retrievePaginatedComments } from "../crud/commentCrud";
import { createComment, updateComment, deleteComment } from "../crud/commentCrud";
import { StatusCodes } from "http-status-codes";

class CommentController {
    getPaginatedComments = asyncWrapper(async (req: Request, res: Response) => {
        const { postId } = req;
        const { page = 1, limit = 10 } = req.query;
        const paginatedComments = await retrievePaginatedComments(postId, page, limit);
        res.json({
            status: StatusCodes.OK,
            data: { ...paginatedComments }
        });
    });

    createAComment = asyncWrapper(async (req: Request, res: Response) => {
        const { userId, postId } = req;
        const { content } = req.body;
        const createdCommentId = await createComment(userId, postId, content);
        res.json({
            status: StatusCodes.OK,
            data: { ...createdCommentId }
        });
    });
    
    updateAComment = asyncWrapper(async (req: Request, res: Response) => {
        const { id } = req.params;
        const { userId } = req;
        const updatedComment = await updateComment(userId, id, req.body);
        res.json({
            status: StatusCodes.OK,
            data: { ...updatedComment }
        });
    });

    deleteAComment = asyncWrapper(async (req: Request, res: Response) => {
        const { id } = req.params;
        const { userId } = req;
        const deletedCommentPayload = await deleteComment(userId, id);
        res.json({
            status: StatusCodes.NO_CONTENT,
            data: { 
                ...deletedCommentPayload
            }
        });
    });

}

const commentController = new CommentController();

export default commentController;