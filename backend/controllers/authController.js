const userModel = require("../models/userSchema")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

// 🔁 Will improve all responses with proper HTTP status codes before deployment
// 🛡️ Will add validation & input sanitization before going live

// Login route
const handleLogin = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.send({ message: "User not found" })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.send({ message: "Wrong password" })
        }

        const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "24h" })
        res.send({
            message: "Login successful", token
            , user: {
                id: user._id,
                userName: user.userName,
                email: user.email,
                gender: user.gender
            }
        })
    } catch (error) {
        console.log("Registration error:", error);
        res.send({ message: "Something went wrong" })
    }
}

// Register route
const handleRegister = async (req, res) => {
    const { userName, email, password, gender, mobile } = req.body
    if (userName || !email || !password || !userName || !mobile) {
        return res.status(400).json({ message: "All fields are required" })
    }
    try {
        const existingUser = await userModel.findOne({ email })

        if (existingUser) {
            return res.send({ message: "This email is already registered" })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        await userModel.create({ userName, email, password: hashedPassword, gender, mobile })
        // 🔁 Later we'll hash password here using bcrypt before saving to DB
        res.send({ message: "User registered" })
    } catch (error) {
        console.log("Registration error:", error);
        res.send({ message: "Something went wrong" })
    }
}

module.exports = { handleLogin, handleRegister }