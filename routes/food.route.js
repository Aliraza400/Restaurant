import express from 'express'
import { createFood, deleteFoods, getFoods, getFoodsById, getRestaurantsById, updateFoods } from '../controllers/food.controller.js'
import { AuthMiddleware } from '../middlewares/auth.middleware.js'
const FoodRouter = express.Router()


FoodRouter.post('/create', createFood)
FoodRouter.get('/get-all-foods', getFoods)
FoodRouter.get('/get/:id', getFoodsById)
FoodRouter.get('/get-restaurant/:id', getRestaurantsById)
FoodRouter.put('/update/:id', AuthMiddleware, updateFoods)
FoodRouter.delete('/delete/:id', AuthMiddleware, deleteFoods)

export default FoodRouter