const orderModel = require("../models/orderSchema")

const createOrder = async (req, res) => {
    const userId = req.user.id
    const { products, shippingAddress, totalPrice } = req.body

    try {
        const order = await orderModel.create({
            userId,
            products,
            shippingAddress,
            totalPrice
        })
        res.json({ message: "Order created", order })
    } catch (err) {
        res.json({ message: "Order not created", error: err.message })
    }
}

const fetchUserOrders = async (req, res) => {
    const userId = req.user.id

    try {
        const orders = await orderModel.find({ userId })
            .populate("products.productId")
            .populate("shippingAddress")
        res.json({ message: "Your orders", orders })
    } catch (err) {
        res.json({ message: "Failed to fetch orders", error: err.message })
    }
}

const fetchUserOrder = async (req, res) => {
    const userId = req.user.id
    const orderId = req.params.id

    try {
        const order = await orderModel.findOne({ _id: orderId, userId })
            .populate("products.productId")
            .populate("shippingAddress")

        if (!order) {
            return res.json({ message: "Order not found" })
        }

        res.json({ message: "Order found", order })
    } catch (err) {
        res.json({ message: "Error fetching order", error: err.message })
    }
}

const fetchAdminOrders = async (req, res) => {
    try {
        const orders = await orderModel.find()
            .populate("userId")
            .populate("products.productId")
            .populate("shippingAddress")
        res.json({ message: "All orders", orders })
    } catch (err) {
        res.json({ message: "Failed to fetch all orders", error: err.message })
    }
}

const deleteOrder = async (req, res) => {
    const orderId = req.params.id

    try {
        const deleteOrder = await orderModel.findByIdAndDelete(orderId)

        if (!deleteOrder) {
            return res.json({ message: "Order not found" })
        }

        res.json({ message: "Order deleted" })
    } catch (err) {
        res.json({ message: "Error deleting order", error: err.message })
    }
}

module.exports = { createOrder, fetchUserOrders, fetchUserOrder, fetchAdminOrders, deleteOrder }