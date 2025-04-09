import express from 'express'
import { AuthMiddleware } from '../middlewares/auth.middleware.js'
import { deleteUser, getUser, updateUser } from '../controllers/user.controller.js'
const UserRouter = express.Router()

UserRouter.get('/get-user', AuthMiddleware, getUser)
UserRouter.put('/update-user/:id', AuthMiddleware, updateUser)
UserRouter.delete('/delete-user/:id', AuthMiddleware, deleteUser)

export default UserRouter