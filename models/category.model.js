import { model, Schema } from "mongoose";

const categorySchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required!']
    },
    imageUrl: {
        type: String,
        default: ''
    }
}, {
    timestamps: true
})
const CategoryModel = model('Category', categorySchema)

export default CategoryModel