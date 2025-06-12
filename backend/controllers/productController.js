const productModel = require("../models/productSchema")

const handlecreateProduct = async (req, res) => {
    const { name, brand, price } = req.body
    try {
        const product = await productModel.create({ name, brand, price })
        if (!product) {
            return res.send({ message: "product not added" })
        }
        res.send({ message: "product added" })
    } catch (err) {
        res.send({ message: "Something went wrong" })
    }
}

const handlegetProducts = async (req, res) => {
    try {
        const products = await productModel.find()
        if (!products) {
            return res.send({ message: "Products not found" })
        }
        res.send({ message: "success", products: products })
    } catch (err) {
        res.send({ message: "Something went wrong" })
    }
}

const handlegetProduct = async (req, res) => {
    const id = req.params.id
    try {
        const product = await productModel.findById(id)
        if (!product) {
            return res.send({ message: "This product is not available" })
        }
        res.send({ message: "Product found", product: product })
    } catch (err) {
        res.send({ message: "Something went wrong" })
    }
}

const handleUpdateProduct = async (req, res) => {
    const id = req.params.id
    const { name, brand, price } = req.body
    try {
        const product = await productModel.findByIdAndUpdate(id,
            { name, brand, price },
            { new: true, runValidators: true })
        if (!product) {
            return res.send({ message: "product not updated" })
        }
        res.send({ message: "product updated", product: product })
    } catch (err) {
        res.send({ message: "Something went wrong" })
    }
}

const handleDeleteProduct = async (req, res) => {
    const id = req.params.id
    try {
        const product = await productModel.findByIdAndDelete(id)
        if (!product) {
            return res.send({ message: "product not found" })
        }
        res.send({ message: "product deleted" })
    } catch (err) {
        res.send({ message: "Something went wrong" })
    }
}

module.exports = { handlecreateProduct, handlegetProducts, handlegetProduct, handleUpdateProduct, handleDeleteProduct }