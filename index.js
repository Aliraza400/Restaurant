import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import connectDB from './config/db.js'
import AuthRouter from './routes/auth.route.js'
import cookieParser from 'cookie-parser'
import UserRouter from './routes/user.route.js'
import RestaurantRouter from './routes/restaurant.route.js'
import CategoryRouter from './routes/category.route.js'
import FoodRouter from './routes/food.route.js'
import OrderRouter from './routes/order.route.js'
const app = express()

connectDB()

app.use(express.urlencoded({
    extended: false
}))
app.use(express.json())

app.use(cookieParser())
app.listen(process.env.PORT)

app.use('/api/v1/auth', AuthRouter)
app.use('/api/v1/user', UserRouter)

app.use('/api/v1/restaurant', RestaurantRouter)

app.use('/api/v1/category', CategoryRouter)

app.use('/api/v1/food', FoodRouter)
app.use('/api/v1/order', OrderRouter)