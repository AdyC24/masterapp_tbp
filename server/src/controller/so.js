const soModel = require('../models/so');

const getSO = async (req, res) => {
    try {
        const [data] = await soModel.getSO();
        res.json({
            message: "Get SO succeed",
            data: data
        })
    } catch (error) {
        res.status(500).json({
            message: "Server is error",
            errMessage: error.message
        })
    }
}

module.exports = {
    getSO
}