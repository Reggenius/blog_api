export interface IRegisterUserArgs {
    username: string;
    email: string;
    phone: string;
    password: string;
}

export interface IAuthenticateUserArgs {
    username: string;
    password: string;
}

export interface IAuthenticateUserResponse {
    token: string;
}

export interface IGetUserResponse<T> {
    id: string;
    username: string;
    email: string;
    posts: T[]
}