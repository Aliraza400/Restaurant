import express from 'express'
import { login, register } from '../controllers/auth.controller.js'
import { AuthMiddleware } from '../middlewares/auth.middleware.js'
const AuthRouter = express.Router()

AuthRouter.post('/register', register)
AuthRouter.post('/login', AuthMiddleware, login)

export default AuthRouter