export interface ICredentials {
    port: number,
    host: string,
    username: string,
    password: string,
    name: string
}

export interface IGetPostsResponse<T, M> {
    id: string;
    authorId: string;
    title: string;
    content: string;
    user: T;
    comment: M[];
    createdAt: Date; 
    updateddAt: Date; 
}

export interface ICreateResponse {
    id: string;
}

export interface IPaginatedResponse<T> {
    data: T[];
    count: number;
    totalPages: number;
    currentPage: number;
}

export interface ICreateArgs {
    title?: string;
    content: string;
}