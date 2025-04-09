import mongoose, { model, Schema } from "mongoose";

const foodSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Food Title is required!']
    },
    foodTags: {
        type: Array
    },
    category: {
        type: String
    },
    code: {
        type: String
    },
    isAvailable: {
        type: Boolean,
        default: true
    },
    restaurant: {
        type: mongoose.Types.ObjectId,
        ref: 'Restaurant'
    },
    rating: {
        type: Number,
        default: 4,
        min: 1,
        max: 5
    },
    ratingCount: {
        type: String
    },
    description: {
        type: String,
        required: [true, 'Description is required!']
    },
    price: {
        type: Number,
        required: [true, 'Price is required!']
    },
    imageUrl: {
        type: String,
        default: ''
    }
}, {
    timestamps: true
})

const FoodModel = model('Food', foodSchema)
export default FoodModel