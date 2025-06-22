const cartModel = require("../models/cartSchema")

const addToCart = async (req, res) => {
    const userId = req.user.id
    const { productId, quantity } = req.body

    try {
        let cart = await cartModel.findOne({ userId })

        if (!cart) {
            cart = new cartModel({
                userId,
                products: [{ productId, quantity }]
            })
            await cart.save()
        }
        else {
            const existingProduct = cart.products.find(
                p => p.productId.toString() === productId.toString()
            )
            if (existingProduct) {
                existingProduct.quantity += quantity
            } else {
                cart.products.push({ productId, quantity })
            }
            await cart.save()
        }

        res.json({ message: "product added to cart", cart })
    } catch (err) {
        res.status(500).json({ message: "Something went wrong" })
    }
}

const getUserCart = async (req, res) => {
    try {
        const cart = await cartModel.findOne({ userId: req.user.id }).populate("products.productId")
        if (!cart) {
            return res.json({ products: [] })
        }
        res.json(cart)
    } catch (err) {
        res.json({ message: "Error fetching cart", error: err.message })
    }
}

const updateCartItem = async (req, res) => {
    const userId = req.user.id
    const { quantity } = req.body
    const { productId } = req.params

    try {
        let cart = await cartModel.findOne({ userId })

        if (!cart) {
            return res.json({ message: "Cart not found" })
        }

        const product = cart.products.find(p => p.productId.toString() === productId)

        if (!product) {
            return res.json({ message: "Product not in cart" })
        }

        product.quantity = quantity
        await cart.save()

        const updatedCart = await cartModel.findOne({ userId }).populate("products.productId")

        res.json({ message: "Cart updated successfully", cart: updatedCart })

    } catch (err) {
        res.json({ message: "Error updating cart", error: err.message })
    }
}

const removeCartItem = async (req, res) => {
    const userId = req.user.id
    const { productId } = req.params

    try {
        const cart = await cartModel.findOne({ userId })

        if (!cart) {
            return res.json({ message: "Cart not found" })
        }

        cart.products = cart.products.filter(p => p.productId.toString() !== productId)
        await cart.save()

        res.json({ message: "Product removed from cart" })
    } catch (err) {
        res.json({ message: "Error removing product", error: err.message })
    }
}

const clearCart = async (req, res) => {
    const userId = req.user.id
    try {
        await cartModel.findOneAndDelete({ userId })
        res.json({ message: "Cart cleared successfully" })
    } catch (err) {
        res.json({ message: "Error clearig cart", error: err.message })
    }
}

module.exports = { addToCart, getUserCart, updateCartItem, removeCartItem, clearCart }