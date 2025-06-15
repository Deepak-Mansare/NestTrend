const express = require("express")
const router = express.Router()
const { verifyToken } = require("../middleware/authMiddleware")
const { isAdmin } = require("../middleware/isAdmin")
const { createOrder, fetchUserOrders, fetchUserOrder, fetchAdminOrders, deleteOrder } = require('../controllers/orderController')

// User Routes
router.post("/create", verifyToken, createOrder)
router.get("/user", verifyToken, fetchUserOrders)
router.get("/user/:id", verifyToken, fetchUserOrder)

// Admin Routes
router.get("/admin", verifyToken, isAdmin, fetchAdminOrders)
router.delete("/admin/:id", verifyToken, isAdmin, deleteOrder)

module.exports = router