const PohModel = require('../models/poh');

const getAllPoh = async (req, res) => {
    try {
        const [data] = await PohModel.getAllPoh();
        res.json({
            message: "Get all poh succeed",
            data: data
        })
    } catch (error) {
        res.status(500).json({
            message: "Server is error",
            errMessage: error
        })
    }
}

module.exports = {
    getAllPoh
}