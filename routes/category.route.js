import express from 'express'
import { createCategory, deleteCategory, getCategory, getCategoryById, updateCategory } from '../controllers/category.controller.js'
const CategoryRouter = express.Router()

CategoryRouter.post('/create', createCategory)
CategoryRouter.get('/get-all-categories', getCategory)
CategoryRouter.get('/get/:id', getCategoryById)
CategoryRouter.put('/update/:id', updateCategory)
CategoryRouter.delete('/delete/:id', deleteCategory)


export default CategoryRouter