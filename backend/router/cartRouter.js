const express = require("express")
const router = express.Router()
const { verifyToken } = require("../middleware/authMiddleware")
const { addToCart, getUserCart, updateCartItem, removeCartItem, clearCart } = require("../controllers/cartController")

router.post("/add", verifyToken, addToCart)
router.get("/", verifyToken, getUserCart)
router.put("/update/:productId", verifyToken, updateCartItem)
router.delete("/remove/:productId", verifyToken, removeCartItem)
router.delete("/clear", verifyToken, clearCart)

module.exports = router
