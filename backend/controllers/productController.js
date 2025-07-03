const productModel = require("../models/productSchema");

// Create Product
const handlecreateProduct = async (req, res) => {
    const { name, brand, price, image, description, category } = req.body;
    try {
        const product = await productModel.create({ name, brand, price, image, description, category });
        if (!product) {
            return res.status(400).json({ message: "Product not added" });
        }
        res.status(201).json({ message: "Product added", product });
    } catch (err) {
        console.error("Create Product Error:", err.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Get All Products
const handlegetProducts = async (req, res) => {
    try {
        const products = await productModel.find();
        res.status(200).json({
            message: products.length > 0 ? "Success" : "No products available",
            products
        });
    } catch (err) {
        console.error("Get Products Error:", err.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Get Single Product
const handlegetProduct = async (req, res) => {
    const id = req.params.id;
    try {
        const product = await productModel.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: "Success", product });
    } catch (err) {
        console.error("Get Product Error:", err.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Update Product
const handleUpdateProduct = async (req, res) => {
    const id = req.params.id;
    const { name, brand, price, image, description, category } = req.body;
    try {
        const existingProduct = await productModel.findById(id);
        if (!existingProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        const updatedProduct = await productModel.findByIdAndUpdate(
            id,
            { name, brand, price, image, description, category },
            { new: true, runValidators: true }
        );

        res.status(200).json({ message: "Product updated", updatedProduct });
    } catch (err) {
        console.error("Update Product Error:", err.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Delete Product
const handleDeleteProduct = async (req, res) => {
    const id = req.params.id;
    try {
        const existingProduct = await productModel.findById(id);
        if (!existingProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        await productModel.findByIdAndDelete(id);
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (err) {
        console.error("Delete Product Error:", err.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = {
    handlecreateProduct,
    handlegetProducts,
    handlegetProduct,
    handleUpdateProduct,
    handleDeleteProduct,
};
