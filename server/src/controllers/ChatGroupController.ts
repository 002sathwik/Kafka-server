import { Request, Response } from 'express';
import prisma from '../config/db.config.js';
class ChatGroupController {

    static async index(req: Request, res: Response) {
        try {
            const user = req.user
            const chatGroups = await prisma.chatGroup.findMany({
                where: {
                    user_id: user.id
                },
                orderBy: {
                    createdAt: 'desc'
                },
            })
            return res.status(200).json({ message: "Chat Groups", chatGroups: chatGroups });

        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }

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

    static async show(req: Request, res: Response) {
        try {
            const user = req.user
            const { id } = req.params
            const chatGroups = await prisma.chatGroup.findUnique({
                where: {
                    id: id,

                }
            })
            return res.status(200).json({ message: "Chat Group", chatGroups: chatGroups });

        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    static async update(req: Request, res: Response) {
        try {
            const body = req.body
            const user = req.user
            const { id } = req.params
            await prisma.chatGroup.update({
                data: {
                    title: body.title,
                    passcode: body.passcode,
                    user_id: user.id,
                },
                where: {
                    id: id,
                }

            })



            return res.status(200).json({ message: 'Chat group updated successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    static async destroy(req: Request, res: Response) {
        try {
            const body = req.body
            const user = req.user
            const { id } = req.params
            await prisma.chatGroup.delete({
                where: {
                    id: id,
                }

            })



            return res.status(200).json({ message: 'Chat group deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}


export default ChatGroupController;