import getRepo from "../utils/general";
import User from "../entity/User";
import Post from "../entity/Post";
import * as _ from 'lodash';
import { 
    IAuthenticateUserResponse, 
    IRegisterUserArgs,
    IGetUserResponse 
} from "../types/user";
import * as bcrypt from "bcryptjs";
import { ConflictError, BadRequestError, NotFoundError } from "../utils/apiError";
import generateAuthToken from "../utils/token";
import { ICreateResponse } from "../types";

/**-------------------------------- RETRIEVE A USER ----------------------------- */
export async function retrieveUser(id: string): Promise<IGetUserResponse<Post>> {
    const result = await getRepo(User)
                        .createQueryBuilder("user")
                        .leftJoinAndSelect("user.posts", "posts")
                        .where("user.id = :id", { id })
                        .getOne();
    if (result) {
        return _.pick(result, ['id', 'username', 'email', "posts"]);
    }
    else {
        throw new NotFoundError("User NOT Found.");
    }
}

/**-------------------------------- CREATE A NEW USER ----------------------------- */
export async function createUser(payload: IRegisterUserArgs): Promise<ICreateResponse>{
    const userRepo = getRepo(User);
    const checkUser = await userRepo
                            .createQueryBuilder("user") 
                            .where("user.username = :username", { username: payload.username })
                            .orWhere("user.email = :email", { email: payload.email })
                            .getOne();
                            
    if (checkUser)  throw new ConflictError("User Already Exist!.");
    else {
        const user: User = new User();
        user.username = payload.username;
        user.email = payload.email;

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(payload.password, salt);

        const result: User = await userRepo.save(user);
        return {
            id: result.id
        };
    }
}

/**------------------------AUTHENTICATE USER(LOGIN) -------------------------- */
export async function authUser(username: string, password: string): Promise<IAuthenticateUserResponse> {
    const user = await getRepo(User)
                        .createQueryBuilder("user")
                        .where("user.username = :username", { username: username })
                        .getOne();
                        
    if(!user)  throw new BadRequestError("User does not Exist!");
    else {
        const validPassword = await bcrypt.compare(password, user.password);   //  returns boolean
        if(!validPassword) throw new BadRequestError("Incorrect Username or Password.");
        else {
            const token = await generateAuthToken(user);
            return  {
                token: token
            };
        }
    }
}