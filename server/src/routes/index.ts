import { Router } from 'express'
import AuthController from '../controllers/authController.js'
import AuthMiddleware from '../middlewares/AuthMiddleware.js'
import ChatGroupController from '../controllers/ChatGroupController.js'



const router = Router()


router.post("/auth/login", AuthController.login)


router.post("/chat-group", AuthMiddleware, ChatGroupController.store)


export default router