const crypto = require("crypto");

const order_id = "order_QhvAxl9C96x5UU"; // Replace with the ID you got from /create-order
const payment_id = "pay_TEST123456789";  // Fake any ID here (must be same in Postman later)
const secret = "iaB82HhPWJ4yOPARc6hNqdQj"; // Your RAZORPAY_KEY_SECRET from .env

const generatedSignature = crypto
    .createHmac("sha256", secret)
    .update(`${order_id}|${payment_id}`)
    .digest("hex");

console.log("✅ Signature to use in Postman:", generatedSignature);
