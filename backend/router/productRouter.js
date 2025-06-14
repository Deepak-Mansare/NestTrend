const express = require("express")
const router = express.Router()
const { handlecreateProduct, handlegetProducts, handlegetProduct, handleUpdateProduct, handleDeleteProduct } = require("../controllers/productController")
const { verifyToken } = require("../middleware/authMiddleware")

router.post("/createProduct", verifyToken, handlecreateProduct)
router.get("/getProducts", verifyToken, handlegetProducts)
router.get("/getProduct/:id", verifyToken, handlegetProduct)
router.put("/updateProduct/:id", verifyToken, handleUpdateProduct)
router.delete("/deleteProduct/:id", verifyToken, handleDeleteProduct)

module.exports = router
