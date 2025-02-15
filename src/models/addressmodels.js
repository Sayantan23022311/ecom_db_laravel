const axios = require("axios");

exports.fetchAddressByPostalCode = async (postalCode, country = "US") => {
    try {
        const response = await axios.get("https://nominatim.openstreetmap.org/search", {
            params: {
                postalcode: postalCode,
                country: country,
                format: "json",
            },
        });

        if (response.data.length === 0) {
            return null;
        }

        return response.data[0]; // Return the first matched result
    } catch (error) {
        console.error("Error in model:", error);
        throw error;
    }
};
