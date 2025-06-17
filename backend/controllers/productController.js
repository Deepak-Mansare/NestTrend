const productModel = require("../models/productSchema")

const handlecreateProduct = async (req, res) => {
    const { name, brand, price } = req.body
    try {
        const product = await productModel.create({ name, brand, price })
        if (!product) {
            return res.send({ message: "product not added" })
        }
        res.json({ message: "product added", product })
    } catch (err) {
        res.json({ message: "Something went wrong" })
    }
}

const handlegetProducts = async (req, res) => {
    try {
        const products = await productModel.find()
        if (!products) {
            return res.json({ message: "Products not found" })
        }
        res.json({ message: "success", products })
    } catch (err) {
        res.json({ message: "Something went wrong" })
    }
}

const handlegetProduct = async (req, res) => {
    const id = req.params.id
    try {
        const product = await productModel.findById(id)
        if (!product) {
            return res.json({ message: "This product is not available" })
        }
        res.json({ message: "Success", product: product })
    } catch (err) {
        res.json({ message: "Something went wrong" })
    }
}

const handleUpdateProduct = async (req, res) => {
    const id = req.params.id
    const { name, brand, price } = req.body
    try {

        const existingProduct = await productModel.findById(id)

        if (!existingProduct) {
            return res.json({ message: "Product not found" })
        }

        const updatedProduct = await productModel.findByIdAndUpdate(
            id,
            { name, brand, price },
            { new: true, runValidators: true })

        if (!updatedProduct) {
            return res.json({ message: "product not updated" })
        }

        res.json({ message: "product updated", updatedProduct: updatedProduct })
    } catch (err) {
        res.json({ message: "Something went wrong" })
    }
}

const handleDeleteProduct = async (req, res) => {
    const id = req.params.id
    try {
        const existingProduct = await productModel.findById(id)

        if (!existingProduct) {
            return res.json({ message: "Product not found" })
        }

        const deletedProduct = await productModel.findByIdAndDelete(id)

        if (!deletedProduct) {
            return res.json({ message: "product not deleted" })
        }

        res.json({ message: "product deleted sucessfully" })
    } catch (err) {
        res.json({ message: "Something went wrong" })
    }
}

module.exports = { handlecreateProduct, handlegetProducts, handlegetProduct, handleUpdateProduct, handleDeleteProduct }