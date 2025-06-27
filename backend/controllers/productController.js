const productModel = require("../models/productSchema");

const handlecreateProduct = async (req, res) => {
    const { name, brand, price, image, description, category } = req.body;
    try {
        const product = await productModel.create({ name, brand, price, image, description, category });
        if (!product) {
            return res.status(400).json({ message: "Product not added" });
        }
        res.status(201).json({ message: "Product added", product });
    } catch (err) {
        res.status(500).json({ message: "Internal server error" });
    }
};

const handlegetProducts = async (req, res) => {
    try {
        const products = await productModel.find();
        if (!products || products.length === 0) {
            return res.status(404).json({ message: "No products found" });
        }
        res.status(200).json({ message: "Success", products });
    } catch (err) {
        res.status(500).json({ message: "Internal server error" });
    }
};

const handlegetProduct = async (req, res) => {
    const id = req.params.id;
    try {
        const product = await productModel.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: "Success", product });
    } catch (err) {
        res.status(500).json({ message: "Internal server error" });
    }
};

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

        if (!updatedProduct) {
            return res.status(400).json({ message: "Product not updated" });
        }

        res.status(200).json({ message: "Product updated", updatedProduct });
    } catch (err) {
        res.status(500).json({ message: "Internal server error" });
    }
};

const handleDeleteProduct = async (req, res) => {
    const id = req.params.id;
    try {
        const existingProduct = await productModel.findById(id);
        if (!existingProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        const deletedProduct = await productModel.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(400).json({ message: "Product not deleted" });
        }

        res.status(200).json({ message: "Product deleted successfully" });
    } catch (err) {
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
