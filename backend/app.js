const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const helmet = require("helmet");
const compression = require("compression");
const connectDB = require("./config/db");
const authRouter = require("./router/authRouter");
const productRouter = require("./router/productRouter");
const cartRouter = require("./router/cartRouter");
const addressRouter = require("./router/addressRouter");
const orderRouter = require("./router/orderRouter");
const paymentRouter = require("./router/paymentRouter");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

dotenv.config();

const PORT = process.env.PORT || 5000;

app.use(
    cors({
        origin: process.env.CLIENT_URL,
        credentials: true,
    })
);

app.use(express.json());
app.use(helmet());
app.use(compression());

app.use("/auth", authRouter);
app.use("/product", productRouter);
app.use("/cart", cartRouter);
app.use("/address", addressRouter);
app.use("/order", orderRouter);
app.use("/payment", paymentRouter);

app.use(notFound);
app.use(errorHandler);

(async () => {
    try {
        await connectDB();
        console.log("MongoDB connected");
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch {
        console.error("Failed to connect to DB, server not started");
        process.exit(1);
    }
})();
