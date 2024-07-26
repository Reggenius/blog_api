const Joi = require('joi');
import { IRegisterUserArgs, IAuthenticateUserArgs } from "../types/user";
import { ICreateArgs } from "../types";
import asyncWrapper from '../utils/asyncWrapper';
import extractGuidsFromPath from '../utils/extractGUID';
import { Request, Response, NextFunction } from 'express';
import { BadRequestError } from "./apiError";

/**----------------------------------------- USER VALIDATIONS ----------------------------------------- */
// SIGNUP VALIDATION
export function validateUserRegistration(user: IRegisterUserArgs) {
    const schema = Joi.object({
        username: Joi.string().min(5).max(15).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).max(255).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&_*-])/).required().messages({
            'string.pattern.base': 'Password must contain at least an uppercase, a lowercase letter and one special character',
        })
    });

    return schema.validate(user);
}

// LOGIN VALIDATION
export function validateLoginInput(user: IAuthenticateUserArgs) {
    const schema = Joi.object({
        username: Joi.string().min(5).max(50).required(),
        password: Joi.string().min(8).max(255).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&_*-])/).required().messages({
            'string.pattern.base': 'Password must contain at least one lowercase letter, one uppercase letter, and one special character.'
        })
    });

    return schema.validate(user);
}


/**----------------------------------------- POST VALIDATIONS ----------------------------------------- */
export function validatePostCreation(post: ICreateArgs) {
    const schema = Joi.object({
        title: Joi.string().min(10).max(30).messages({
            'string.base': 'Title should be a type of text',
            'string.empty': 'Title cannot be an empty field',
            'string.min': 'Title should have a minimum length of 10 characters',
            'string.max': 'Title should have a maximum length of 30 characters',
            'any.required': 'Title is a required field'
        }).required(),
        content: Joi.string().min(20).required()
            .messages({
                'string.base': 'Content should be a type of text',
                'string.empty': 'Content cannot be an empty field',
                'string.min': 'Content should have a minimum length of 20 characters',
                'any.required': 'Content is a required field'
            }).required()
        });

        return schema.validate(post);
}

/**----------------------------------------- COMMENT VALIDATIONS ----------------------------------------- */
// COMMENT CREATION
export function validateComment(post: ICreateArgs) {
    const schema = Joi.object({
        content: Joi.string().min(1).required()
            .messages({
                'string.base': 'Content should be a type of text',
                'string.empty': 'Content cannot be an empty field',
                'string.min': 'Content should have at least a character',
                'any.required': 'Content is a required field'
            }).required()
        });

        return schema.validate(post);
}

// EXTRACT PARAMS IN COMMENT ROUTE
export const extractParamFromBaseURL = asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
    const guids = extractGuidsFromPath(req.baseUrl);
    if (guids.length > 0) {
        req.postId = guids[0];
        next();
    }
    else throw new BadRequestError("postId must be a valid GUID");
})


/**
 * GENERAL
 */
// VALIDATE ID
export function validateId(uniqueId) {
    const schema = Joi.object({
        id: Joi.string().uuid({
            version: 'uuidv4'
          }),
        postId: Joi.string().uuid({
            version: 'uuidv4'
          })
    }).xor('id', 'postId');

    return schema.validate(uniqueId);
}