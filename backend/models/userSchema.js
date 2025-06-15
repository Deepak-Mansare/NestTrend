const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minLength: 4
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
        required: true
    },
    mobile: {
        type: String,
        required: true,
        minLength: 4
    }
}, { timestamps: true })

const userModel = mongoose.model("User", userSchema)

module.exports = userModel