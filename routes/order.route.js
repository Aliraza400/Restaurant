import express from 'express'
import { createOrder, orderStatus } from '../controllers/order.controller.js'
import { AdminMiddleware, AuthMiddleware } from '../middlewares/auth.middleware.js'
const OrderRouter = express.Router()

OrderRouter.post('/create', AuthMiddleware, createOrder)
OrderRouter.put('/order-status/:id', AuthMiddleware, AdminMiddleware, orderStatus)


export default OrderRouter