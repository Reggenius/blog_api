const express = require("express");
import { Request } from 'express';
import { NotFoundError } from "../utils/apiError";

import comment from "../routes/comment";
import post from "../routes/post";
import user from "../routes/user";


export default function routes(app) {
    app.use(express.json());
    // User Endpoints
    app.use('/api/users', user);

    // Comment Endpoints
    app.use('/api/posts/:postId/comments', comment);
    
    // Post Endpoints
    app.use('/api/posts', post);
    
    // Comment Endpoints
    app.use('/api/comments', comment);

    app.use((req: Request) => {
        throw new NotFoundError(`The requested path: ${ req.path } was not found`);
    });
}