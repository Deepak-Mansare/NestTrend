const express = require("express")
const app = express()
const cors = require('cors')
const authRouter = require("./router/authRouter")
const productRouter = require("./router/productRouter")
const dotenv = require("dotenv")
const mongoose = require("mongoose")

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

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("database connected"))
    .catch(() => console.log("connection failed"))

app.use("/auth", authRouter)
app.use("/product", productRouter)

app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`);
})