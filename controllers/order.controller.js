import { message } from "antd";
import OrderModel from "../models/order.model.js";

export const createOrder = async (req, res) => {
    try {
        const { cart, payment } = req.body
        let total = 0;
        cart.map((i) => {
            total += i.price
        })
        const newOrder = new OrderModel({
            foods: cart,
            payment: total,
            buyer: req.user
        })

        await newOrder.save()

        res.json({
            success: true,
            message: 'Order Placed Successfully!',
            newOrder
        })
    }
    catch(err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}



export const orderStatus = async (req, res) => {
    try {
        const { id } = req.params
        const { status } = req.body
        const order = await OrderModel.findByIdAndUpdate(id, {status}, {new: true})

        res.json({
            success: true,
            message: 'Order Status Updated!',
            order
        })
    }
    catch(err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}