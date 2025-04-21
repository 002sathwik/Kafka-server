import { Request, Response } from 'express';
class ChatGroupController {
    // Add your methods and properties here

    static async store(req: Request, res: Response) {
        try {
            const body = req.body
            res.status(201).json({ message: 'Chat group created successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}


export default ChatGroupController;