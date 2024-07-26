const jwt = require('jsonwebtoken');
const config = require('config');
import { Request, Response, NextFunction } from 'express';
import { retrieveUser } from '../crud/userCrud';
import asyncWrapper from '../utils/asyncWrapper';

const authMiddleware = asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send('Access denied. No token provided.');
    
    const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
    const adminDetail = await retrieveUser(decoded['id']);
    
    if(!adminDetail['id'] || adminDetail['id'] !== decoded.id)
        return res.status(403).send('User is not authorized.');  //  Forbidden
    else {
        req.userId = decoded.id;
        next();
    }
})

export default authMiddleware;