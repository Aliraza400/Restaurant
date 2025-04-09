import FoodModel from "../models/food.model.js"

export const createFood = async (req, res) => {
    try {
        const foods = new FoodModel(req.body)
        await foods.save()
        res.json({
            success: true,
            message: 'Food Added Successfully!',
            foods
        })
    }
    catch(err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}


export const getFoods = async (req, res) => {
    try {
        const foods = await FoodModel.find()
        res.json({
            success: true,
            totalCount: foods.length,
            foods
        })
    }
    catch(err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

export const getFoodsById = async (req, res) => {
    try {
        const { id } = req.params
        const food = await FoodModel.findById(id)
        if(!food) {
            return res.status(404).json({
                success: false,
                message: 'Foods not found!'
            })
        }

        res.json({
            success: true,
            message: 'Food Fetched By Id!',
            food
        })
    }
    catch(err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

export const getRestaurantsById = async (req, res) => {
    try {
        const { id } = req.params
        const food = await FoodModel.findOne({restaurant: id})
        if(!food) {
            return res.status(404).json({
                success: false,
                message: 'Foods not found!'
            })
        }

        res.json({
            success: true,
            message: 'Food Fetched By Restaurant Id!',
            food
        })
    }
    catch(err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

export const updateFoods = async (req, res) => {
    try {
        const { id } = req.params
        const food = await FoodModel.findByIdAndUpdate(id, req.body, {new: true})
        if(!food) {
            return res.status(404).json({
                success: false,
                message: 'Foods not found!'
            })
        }

        res.json({
            success: true,
            message: 'Food Updated!',
            food
        })
    }
    catch(err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}
export const deleteFoods = async (req, res) => {
    try {
        const { id } = req.params
        const food = await FoodModel.findByIdAndDelete(id)
    
        if(!food) {
            return res.status(404).json({
                success: false,
                message: 'Foods not found!'
            })
        }

        res.json({
            success: true,
            message: 'Food Deleted!'
        })
    }
    catch(err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}