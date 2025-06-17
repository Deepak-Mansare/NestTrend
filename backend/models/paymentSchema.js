const mongoose = require("mongoose")

const paymentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    orderId: String,
    paymentId: String,
    signature: String,
    amount: Number,
    status: {
        type: String,
        enum: ["success", "failed"],
        default: "success"
    }
}, { timestamps: true })

const paymentModel = mongoose.model("Payment", paymentSchema)
module.exports = paymentModel