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
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ""
    },
    category: {
        type: String,
        default: "All"
    },
}, { timestamps: true })

const productModel = mongoose.model("Product", productSchema)
module.exports = productModel