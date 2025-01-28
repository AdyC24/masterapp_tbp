const LocationModel = require('../models/location');

const getLocationById = async (req, res) => {
    const { id } = req.params;

    try {
        const [data] = await LocationModel.getLocationByPosId(id);
        res.json({
            message: 'Get location by id',
            data: data[0]
        })
    } catch (error) {
        res.status(500).json({
            message: "Server is error",
            errMessage: error.message
        })
    }
}

module.exports = {
    getLocationById
}