import { StatusCodes } from 'http-status-codes'

export class ApiError extends Error {
    statusCode: number;

    constructor(statusCode: number, message: string) {
        super(message);

        this.statusCode = statusCode;
    }
}

export class NotFoundError extends ApiError {
    constructor(message: string) {
        super(StatusCodes.NOT_FOUND, message);
    }
}

export class BadRequestError extends ApiError {
    constructor(message: string) {
        super(StatusCodes.BAD_REQUEST, message);
    }
}

export class ConflictError extends ApiError {
    constructor(message: string) {
        super(StatusCodes.CONFLICT, message);
    }
}

export class ServerError extends ApiError {
    constructor(message: string) {
        super(StatusCodes.INTERNAL_SERVER_ERROR, message);
    }
}

export class ForbiddenError extends ApiError {
    constructor(message: string) {
        super(StatusCodes.FORBIDDEN, message);
    }
}

