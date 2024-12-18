const DivisionModel = require('../models/division');

const getAllDivisionsByCompId = async (req, res) => {
    const { compId } = req.params;

    try {
        const [data] = await DivisionModel.getAllDivisionsByCompId(compId);
        res.json({
            message: 'Get divisions by compId successed',
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
    getAllDivisionsByCompId
}