const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === "admin") {
        next()
    } else {
        res.json({ message: "Access denied. Admins only" })
    }
}

module.exports = { isAdmin }
