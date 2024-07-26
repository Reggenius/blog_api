import { asyncWrapper } from "../utils/asyncWrapper";
import { Request, Response, NextFunction } from "express";
import { createUser, authUser, retrieveUser } from "../crud/userCrud";
import { StatusCodes } from "http-status-codes";

class UserController {
    registerUser = asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
        const registeredUser = await createUser(req.body);
        res.json({
            status: StatusCodes.OK,
            data: { ...registeredUser }
        });
    });

    authenticateUser = asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
        const { username, password } = req.body;
        const authenticatedUser = await authUser(username, password);
        res.json({
            status: StatusCodes.OK,
            data: { ...authenticatedUser }
        });
    });

    getUser = asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
        const { userId } = req;
        const userProfile = await retrieveUser(userId);
        res.json({
            status: StatusCodes.OK,
            data: { ...userProfile }
        });
    });
}

const userController = new UserController();

export default userController;