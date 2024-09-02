const picModel = require('../models/pic');

const getAllPic = async (req, res) => {
    try {
        const [data] = await picModel.getAllPic();
        res.json({
            message: "Get all pic succeed",
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
    getAllPic
}