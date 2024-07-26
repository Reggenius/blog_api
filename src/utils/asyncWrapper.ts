import { Request, Response, NextFunction } from 'express';

export const asyncWrapper =
    (fn: any) => (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch((err) => {
            let errorMessage;
            let statusCode;
            try {
                const parsedError = JSON.parse(err.message);
                errorMessage = parsedError.message || 'Unknown Error';
                statusCode = err.statusCode || 500;
            } catch (parseError) {
                // If parsing fails, use plain text
                errorMessage = err.message || 'Unknown Error';
                statusCode = err.statusCode || 500;
            }
            finally {
                res.status(statusCode).send(errorMessage);
            }
        });
    };

export default asyncWrapper;
