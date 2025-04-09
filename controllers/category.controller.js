import CategoryModel from "../models/category.model.js"

export const createCategory = async (req, res) => {
    try {
        const category = new CategoryModel(req.body)
        await category.save()
        res.json({
            success: true,
            message: 'Category Added Successfully!',
            category
        })
    }
    catch(err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

export const getCategory = async (req, res) => {
    try {
        const categories = await CategoryModel.find()
        res.json({
            success: true,
            totalCount: categories.length,
            categories
        })
    }
    catch(err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}
export const getCategoryById = async (req, res) => {
    try {
        const { id } = req.params
        const category = await CategoryModel.findById(id)
        if(!category) {
            return res.status(404).json({
                success: false,
                message: 'Category not found!'
            })
        }

        res.json({
            success: true,
            message: 'Category Fetched By Id!',
            category
        })
    }
    catch(err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

export const updateCategory = async (req, res) => {
    try {
        const { id } = req.params
        const categories = await CategoryModel.findByIdAndUpdate(id, req.body, {new: true})
        if(!categories) {
            return res.status(404).json({
                success: false,
                message: 'Category not found!'
            })
        }

        res.json({
            success: true,
            message: 'Category Updated!',
            categories
        })
    }
    catch(err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}
export const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params
        const category = await CategoryModel.findByIdAndDelete(id)
        if(!category) {
            return res.status(404).json({
                success: false,
                message: 'Category not found!'
            })
        }

        res.json({
            success: true,
            message: 'Category Deleted!'
        })
    }
    catch(err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}