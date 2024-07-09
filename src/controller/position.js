const PositionModel = require('../models/position');

const getAllPositions = async (req, res) => {
    try {
        const [data] = await PositionModel.getAllPositions();
        res.json({
            message: "Get all position succeed",
            data: data,
        })
    } catch (error) {
        res.status(500).json({
            message: "Server is error",
            errMessage: error,
        })
    }

}

const createNewPostion = (req, res) => {

}

const editPosition = (req, res) => {

}

const deletePosition = (req, res) => {

}


module.exports = {
    getAllPositions,
    createNewPostion,
    editPosition,
    deletePosition
}
