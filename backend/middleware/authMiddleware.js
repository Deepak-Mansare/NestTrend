const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]
    if (!token) {
        res.json({ message: "Access denied, token not provided" })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch (err) {
        res.json({ message: "Invalid token" })
    }
}

module.exports = { verifyToken }