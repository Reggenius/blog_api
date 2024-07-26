import { Request, Response, NextFunction } from 'express';

export default function validate(validator, isParam: Boolean = true, payload: Object = undefined) {
    if (isParam) {
        return (req: Request, res: Response, next: NextFunction) => {
            const { error } = validator(req.params);
            if(error)   return res.status(400).send(error.details[0].message);

            next()
        }
    }
    else {
        return (req: Request, res: Response, next: NextFunction) => {
            const { error } = validator(payload || req.body);
            if(error)   return res.status(400).send(error.details[0].message);
            else {
                next();
            }

        }
    }
}