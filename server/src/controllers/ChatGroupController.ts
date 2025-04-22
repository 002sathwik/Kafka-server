import { Request, Response } from 'express';
import { title } from 'process';
import prisma from '../config/db.config.js';
class ChatGroupController {
    // Add your methods and properties here

    static async store(req: Request, res: Response) {
        try {
            const body = req.body
            const user = req.user

            await prisma.chatGroup.create({
                data: {
                    title: body.title,
                    passcode: body.passcode,
                    user_id: user.id,
                }

            })



            return res.status(200).json({ message: 'Chat group created successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}


export default ChatGroupController;