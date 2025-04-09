import mongoose, { model, Schema } from "mongoose";

const orderSchema = new Schema({
    foods: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Food'
        }
    ],
    payment: {},
    buyer: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    status: { 
        type: String,
        enum: ['preparing', 'prepared', 'on the way', 'delivered'],
        default: 'preparing'
    }
})

const OrderModel = model('Order', orderSchema)
export default OrderModel