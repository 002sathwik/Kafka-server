import { Request, Response } from 'express'
import prisma from '../config/db.config.js';
import jwt from "jsonwebtoken"


type LoginPayloadType = {
    name: string
    email: string
    password: string
    provider: string;
    oauth_id: string;
    image?: string;
}

class AuthController {
    static async login(req: Request, res: Response) {
        try {
            const body: LoginPayloadType = req.body
            let findUser = await prisma.user.findUnique({
                where: {
                    email: body.email
                }
            })

            if (!findUser) {
                findUser = await prisma.user.create({
                    data: {
                        name: body.name,
                        email: body.email,
                        password: body.password,
                        provider: body.provider,
                        oauth_id: body.oauth_id,
                        image: body.image ? body.image : ""
                    }
                })
            }
            let JWTPayload = {
                name: body.name,
                email: body.email,
                image: body.image,
                provider: body.provider,
                oauth_id: body.oauth_id,
                id: findUser.id
            }
            const token = jwt.sign(JWTPayload, process.env.JWT_SECRET as string, {
                expiresIn: "365d"
            })

            return res.json({
                message: "Login successful",

                user: {
                    ...findUser,
                    token: `Bearer ${token}`
                }
            })

        } catch (error) {
            return res.status(500).json({ message: "Internal server error" })
        }
    }
}


export default AuthController