const PositionModel = require('../models/position');

const getAllPositions = async (req, res) => {
    const { deptId, levelId } = req.query;

    try {
        const [data] = await PositionModel.getAllPositions();

        let filterdata = data

        if (deptId && levelId) {
            filterdata = data.filter(
                (position) => position.deptId === deptId && position.levelId === levelId
            )
        }

        res.json({
            message: "Get all position succeed",
            data: filterdata,
        })
    } catch (error) {
        res.status(500).json({
            message: "Server is error",
            errMessage: error,
        })
    }
}

const createNewPosition = async (req, res) => {
    try {
        const {body} = req

        if(!body.deptId || !body.posName || !body.posLevel) {
            res.status(400).json({
                errMessage: 'Form should be filled completely'
            })
        }

        if(!body.posSlot) {
            body.posSlot = 0
        }
        if(!body.posNum) {
            body.posNum = 0
        }

        await PositionModel.createNewPosition(body);
        res.json({
            message: "Create new position succeed",
        })
    } catch (error){
        res.status(500).json({
            message: "Server is error",
            errMessage: error.message,
        })
}
}

const editPosition = (req, res) => {

}

const deletePosition = (req, res) => {

}


module.exports = {
    getAllPositions,
    createNewPosition,
    editPosition,
    deletePosition
}
