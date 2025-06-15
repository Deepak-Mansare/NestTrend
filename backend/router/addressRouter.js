const express = require("express")
const router = express.Router()
const { verifyToken } = require("../middleware/authMiddleware")
const { addAddress, getAddresses, updateAddress, deleteAddress } = require("../controllers/addressController")

router.post("/add", verifyToken, addAddress)
router.get("/", verifyToken, getAddresses)
router.put("/:id", verifyToken, updateAddress)
router.delete("/:id", verifyToken, deleteAddress)

module.exports = router