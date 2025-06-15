const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
            },
            quantity: {
                type: Number,
                default: 1
            }
        }
    ],
    shippingAddress: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Address",
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    orderStatus: {
        type: String,
        enum: ["pending", "paid", "delivered"],
        default: "pending"
    },
    paymentStatus: {
        type: String,
        enum: ["unpaid", "paid"],
        default: "unpaid"
    }
}, { timestamps: true })

const orderModel = mongoose.model("Order", orderSchema)

module.exports = orderModel