const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    }
}, { timestamps: true })

const productModel = mongoose.model("products", productSchema)
module.exports = productModel