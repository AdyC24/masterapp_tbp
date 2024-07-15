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

const createNewPostion = async (req, res) => {
    try {
        const {body} = req

        if(!body.deptId) {
            res.status(400).json({
                errMessage: 'Department cannot be blank'
            })
        }
        if(!body.posName) {
            res.status(400).json({
                errMessage: 'Position Name cannot be blank'
            })
        }

        await PositionModel.createNewPosition(body);
        res.json({
            message: "Create new position succeed",
        })
    } catch (error){
        res.status(500).json({
            message: "Server is error",
            errMessage: error,
        })
}
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
