const addressModel = require("../models/addressSchema");

// ➕ POST /address/add
const addAddress = async (req, res) => {
    const userId = req.user._id;
    const data = req.body;

    try {
        const address = await addressModel.create({ ...data, userId });
        res.status(201).json({ message: "Address added", address });
    } catch (err) {
        res.status(500).json({ message: "Error adding address", error: err.message });
    }
};

// 📦 GET /address/
const getAddresses = async (req, res) => {
    const userId = req.user._id;

    try {
        const addresses = await addressModel.find({ userId });
        res.status(200).json({ message: "Addresses fetched", addresses });
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch addresses", error: err.message });
    }
};

// ✏️ PUT /address/update/:id
const updateAddress = async (req, res) => {
    const userId = req.user._id;
    const addressId = req.params.id;
    const data = req.body;

    try {
        const updatedAddress = await addressModel.findOneAndUpdate(
            { _id: addressId, userId },
            data,
            { new: true, runValidators: true }
        );

        if (!updatedAddress) {
            return res.status(404).json({ message: "Address not found" });
        }

        res.status(200).json({ message: "Address updated successfully", updatedAddress });
    } catch (err) {
        res.status(500).json({ message: "Address not updated", error: err.message });
    }
};

// 🗑️ DELETE /address/delete/:id
const deleteAddress = async (req, res) => {
    const userId = req.user._id;
    const addressId = req.params.id;

    try {
        const deleted = await addressModel.findOneAndDelete({ _id: addressId, userId });

        if (!deleted) {
            return res.status(404).json({ message: "Address not found" });
        }

        res.status(200).json({ message: "Address deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Address not deleted", error: err.message });
    }
};

module.exports = {
    addAddress,
    getAddresses,
    updateAddress,
    deleteAddress
};
