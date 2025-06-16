const razorpay = require("../utils/razorpayInstance")
const crypto = require("crypto")

const createPaymentOrder = async (req, res) => {
    const { amount } = req.body

    const options = {
        amount: amount * 100,
        currency: "INR",
        receipt: `receipt_order_${Date.now()}`
    }

    try {
        const order = await razorpay.orders.create(options)
        res.json({ success: true, order })
    } catch (err) {
        res.json({ message: "Payment order creation failed", success: false, error: err.message })
    }
}

const verifyPayment = async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body

    const body = razorpay_order_id + "|" + razorpay_payment_id

    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(body)
        .digest("hex")

    const isValid = expectedSignature === razorpay_signature

    if (isValid) {
        res.json({ message: "Payment verified", success: true })
    }
    else {
        res.json({ message: "Invalid payment signature", success: false })
    }
}

module.exports = { createPaymentOrder, verifyPayment }