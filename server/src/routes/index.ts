import { Router } from 'express'
import AuthController from '../controllers/authController.js'
import AuthMiddleware from '../middlewares/AuthMiddleware.js'
import ChatGroupController from '../controllers/ChatGroupController.js'



const router = Router()


router.post("/auth/login", AuthController.login)


router.post("/chat-group", AuthMiddleware, ChatGroupController.store)
router.get("/chat-group/:id", AuthMiddleware, ChatGroupController.show)
router.get("/chat-group", AuthMiddleware, ChatGroupController.index)
router.put("/chat-group/:id", AuthMiddleware, ChatGroupController.update)


export default router