const { fetchAddressByPostalCode } = require("../models/addressmodels");

exports.getAddressByPostalCode = async (req, res) => {
    const { postalCode, country } = req.query;

    if (!postalCode) {
        return res.status(400).json({ message: "Postal code is required" });
    }

    try {
        const address = await fetchAddressByPostalCode(postalCode, country);
        if (!address) {
            return res.status(404).json({ message: "No address found" });
        }

        res.status(200).json({ status: "True", address });
    } catch (error) {
        console.error("Error in controller:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
