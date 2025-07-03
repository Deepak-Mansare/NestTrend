const userModel = require("../models/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");

//  POST /auth/login
const handleLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Incorrect password" });
        }

        const token = jwt.sign(
            { id: user._id, role: user.role, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "24h" }
        );

        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                userName: user.userName,
                email: user.email,
                gender: user.gender,
                role: user.role
            }
        });
    } catch (err) {
        // Log removed for production
        res.status(500).json({ message: "Something went wrong" });
    }
};

//  POST /auth/register
const handleRegister = async (req, res) => {
    const { userName, email, password, gender, mobile, role } = req.body;

    if (!userName || !email || !password || !gender || !mobile) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "This email is already registered" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await userModel.create({
            userName,
            email,
            password: hashedPassword,
            gender,
            mobile,
            role
        });

        await sendEmail(
            email,
            "Welcome to NestTrend 👋",
            `<h2>Hi, ${userName},</h2>
            <p>Welcome to <strong>NestTrend</strong>! Your account has been successfully created.</p>
            <p>We're excited to have you on board.</p>
            <p>Explore our fashion store and enjoy shopping!</p>`
        );

        res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
        // Log removed for production
        res.status(500).json({ message: "Something went wrong" });
    }
};

module.exports = {
    handleLogin,
    handleRegister,
};
