import { Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ApiError } from '../utils/apiError'

export class ErrorHandler {
    static handle = (
        err: ApiError,
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
        return res.status(statusCode).json({
            success: false,
            message: err.message
        });
    }
}