import { App } from 'antd'
import express from 'express'
import { createRestaurant, deleteRestaurant, getRestaurant, getRestaurantById, uploadRestaurantImage } from '../controllers/restaurant.controller.js'
import multer from 'multer'
import path from 'path'
import { v4 as uniqueId } from 'uuid'
const RestaurantRouter = express.Router()

const storage = multer.diskStorage({
    destination: (req, file, next) => {
        next(null, 'uploads/')
    },
    filename: (req, file, next) => {
        const ext = path.extname(file.originalname);
        next(null, `${uniqueId()}.${ext}`)
    }
})

const upload = multer({
    storage
})



RestaurantRouter.post('/create', createRestaurant)
RestaurantRouter.put('/update-image/:id', upload.single('imageUrl'), uploadRestaurantImage)
RestaurantRouter.get('/get-restaurant', getRestaurant)
RestaurantRouter.get('/get/:id', getRestaurantById)
RestaurantRouter.delete('/delete/:id', deleteRestaurant)

export default RestaurantRouter