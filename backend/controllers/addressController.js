const addressModel = require("../models/addressSchema");

const addAddress = async (req, res) => {
    const userId = req.user.id;
    const data = req.body;

    try {
        const address = await addressModel.create({ ...data, userId });
        res.json({ message: "Address added", address });
    } catch (err) {
        res.status(500).json({ message: "Error adding address", error: err.message });
    }
};

const getAddresses = async (req, res) => {
    const userId = req.user.id;

    try {
        const addresses = await addressModel.find({ userId });
        res.json({ message: "Addresses fetched", addresses });
    } catch (err) {
        res.status(500).json({ message: "No address found", error: err.message });
    }
};

const updateAddress = async (req, res) => {
    const userId = req.user.id;
    const addressId = req.params.id;
    const data = req.body;

    try {
        const updatedAddress = await addressModel.findOneAndUpdate(
            { _id: addressId, userId },
            data,
            { new: true }
        );

        if (!updatedAddress) {
            return res.status(404).json({ message: "Address not found" });
        }

        res.json({ message: "Address updated successfully", updatedAddress });
    } catch (err) {
        res.status(500).json({ message: "Address not updated", error: err.message });
    }
};

const deleteAddress = async (req, res) => {
    const userId = req.user.id;
    const addressId = req.params.id;

    try {
        const deleted = await addressModel.findOneAndDelete({ _id: addressId, userId });

        if (!deleted) {
            return res.status(404).json({ message: "Address not found" });
        }

        res.json({ message: "Address deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Address not deleted", error: err.message });
    }
};

module.exports = { addAddress, getAddresses, updateAddress, deleteAddress };
