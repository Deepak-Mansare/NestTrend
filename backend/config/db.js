const mongoose = require("mongoose")

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Databse connected");
    }
    catch (err) {
        console.log("Connection fialed", err);
        process.exit(1)
    }
}

module.exports = connectDB