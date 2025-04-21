import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';


const AuthMiddleware = (req: Request, res: Response, next: NextFunction) => {

    const authHeader = req.headers.authorization

    if (authHeader === null || authHeader === undefined) {
        return res.status(401).json({ message: 'Token not provided' })
    }

    const token = authHeader.split(" ")[1]

    jwt.verify(token, process.env.JWT_SECRET_KEY as string, (err, user) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid token' })
        }
        req.user = user as AuthUser
        next()

    })


}


export default AuthMiddleware