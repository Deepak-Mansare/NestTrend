const cartModel = require("../models/cartSchema");

// Add to cart
const addToCart = async (req, res) => {
    const userId = req.user._id;
    const { productId, quantity } = req.body;

    try {
        let cart = await cartModel.findOne({ userId });

        if (!cart) {
            cart = new cartModel({
                userId,
                products: [{ productId, quantity }],
            });
        } else {
            cart.products = cart.products.filter(p => p && p.productId);

            const existingProduct = cart.products.find(
                p => p.productId.toString() === productId.toString()
            );

            if (existingProduct) {
                existingProduct.quantity += quantity;
            } else {
                cart.products.push({ productId, quantity });
            }
        }

        await cart.save();

        const populatedCart = await cartModel
            .findOne({ userId })
            .populate("products.productId");

        res.status(200).json({ message: "Product added to cart", cart: populatedCart });
    } catch (err) {
        res.status(500).json({ message: "Failed to add to cart", error: err.message });
    }
};

// Get user's cart
const getUserCart = async (req, res) => {
    const userId = req.user._id;

    try {
        const cart = await cartModel.findOne({ userId }).populate("products.productId");

        if (!cart) {
            return res.status(200).json({ products: [] });
        }

        res.status(200).json({ products: cart.products || [] });
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch cart", error: err.message });
    }
};

// Update quantity of item
const updateCartItem = async (req, res) => {
    const userId = req.user._id;
    const { quantity } = req.body;
    const { productId } = req.params;

    try {
        const cart = await cartModel.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        const product = cart.products.find(p => p.productId.toString() === productId);
        if (!product) {
            return res.status(404).json({ message: "Product not in cart" });
        }

        product.quantity = quantity;
        await cart.save();

        const updatedCart = await cartModel
            .findOne({ userId })
            .populate("products.productId");

        res.status(200).json({ message: "Cart updated", cart: updatedCart });
    } catch (err) {
        res.status(500).json({ message: "Failed to update cart", error: err.message });
    }
};

// Remove item from cart
const removeCartItem = async (req, res) => {
    const userId = req.user._id;
    const { productId } = req.params;

    try {
        const cart = await cartModel.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        cart.products = cart.products.filter(p => p.productId.toString() !== productId);
        await cart.save();

        const updatedCart = await cartModel
            .findOne({ userId })
            .populate("products.productId");

        res.status(200).json({ message: "Product removed from cart", cart: updatedCart });
    } catch (err) {
        res.status(500).json({ message: "Failed to remove product", error: err.message });
    }
};

// Clear entire cart
const clearCart = async (req, res) => {
    const userId = req.user._id;

    try {
        await cartModel.findOneAndDelete({ userId });
        res.status(200).json({ message: "Cart cleared successfully" });
    } catch (err) {
        res.status(500).json({ message: "Failed to clear cart", error: err.message });
    }
};

module.exports = {
    addToCart,
    getUserCart,
    updateCartItem,
    removeCartItem,
    clearCart,
};
