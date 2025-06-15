const express = require("express")
const app = express()
const cors = require('cors')
const authRouter = require("./router/authRouter")
const productRouter = require("./router/productRouter")
const cartRouter = require("./router/cartRouter")
const addressRouter = require("./router/addressRouter")
const orderRouter = require("./router/orderRouter")
const dotenv = require("dotenv")
const connectDB = require("./config/db")
const { notFound, errorHandler } = require("./middleware/errorMiddleware")

// 🔁 Will change origin in CORS during deployment (Render URL)
// ✅ MongoDB URI will be replaced with Render’s DB URI in deployment
// 🔁 Can add middleware like helmet, morgan, compression for production later

dotenv.config()

const PORT = process.env.PORT || 5000

app.use(cors({
    origin: "http://localhost:5173", // 🔁 Replace this with frontend Render URL during deployment
    credentials: true
}))
app.use(express.json())

connectDB()

app.use("/auth", authRouter)
app.use("/product", productRouter)
app.use("/cart", cartRouter)
app.use("/address", addressRouter)
app.use("/order", orderRouter)

app.use(notFound)
app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`);
})