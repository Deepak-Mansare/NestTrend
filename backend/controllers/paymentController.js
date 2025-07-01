const razorpay = require("../utils/razorpayInstance");
const crypto = require("crypto");
const paymentModel = require("../models/paymentSchema");
const orderModel = require("../models/orderSchema");
const cartModel = require("../models/cartSchema");
const sendEmail = require("../utils/sendEmail");

const createPaymentOrder = async (req, res) => {
    let { amount } = req.body;

    if (!amount || isNaN(amount)) {
        return res.status(400).json({ success: false, message: "Invalid amount" });
    }

    const options = {
        amount: Math.round(amount * 100),
        currency: "INR",
        receipt: `receipt_order_${Date.now()}`,
    };

    try {
        const order = await razorpay.orders.create(options);
        res.status(201).json({ success: true, order });
    } catch (err) {
        res.status(500).json({
            message: "Payment order creation failed",
            success: false,
            error: err.message,
        });
    }
};

const verifyPayment = async (req, res) => {
    const userId = req.user._id;
    const userEmail = req.user.email;
    const {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        amount,
        appOrderId,
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(body)
        .digest("hex");

    const isValid = expectedSignature === razorpay_signature;

    if (!isValid) {
        return res.status(400).json({ message: "Invalid payment signature", success: false });
    }

    try {
        await paymentModel.create({
            userId,
            orderId: razorpay_order_id,
            paymentId: razorpay_payment_id,
            signature: razorpay_signature,
            amount,
            status: "success",
        })

        const order = await orderModel.findByIdAndUpdate(
            appOrderId,
            {
                orderStatus: "Confirmed",
                paymentStatus: "Paid",
            },
            { new: true }
        ).populate("shippingAddress");

        if (order) {
            const address = order.shippingAddress;
            const addressString = address
                ? `${address.name}, ${address.street}, ${address.city}, ${address.state} - ${address.pincode}, ${address.country}`
                : "Shipping address not available";

            await sendEmail(
                userEmail,
                "Order confirmation - NestTrend",
                `<h2>Thank you for your order!</h2>
                <p>Your payment of ₹${order.totalPrice.toLocaleString("en-IN")} has been received successfully.</p>
                <p><strong>Shipping Address: </strong><br>${addressString}</p>
                <p>We'll notify you once your order is shipped.</p>`
            );
        }

        await cartModel.findOneAndDelete({ userId });

        return res.status(200).json({ message: "Payment verified", success: true });
    } catch (err) {
        return res.status(500).json({
            message: "Error saving payment or updating order",
            success: false,
            error: err.message,
        });
    }
};

module.exports = { createPaymentOrder, verifyPayment };
