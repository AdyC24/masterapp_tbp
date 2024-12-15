const LevelModel = require('../models/level')

const getAllLevelByCompId = async (req, res) => {
    const { compId } = req.params;

    try {
        const [data] = await LevelModel.getAllLevelByCompId(compId);
        res.json({
            message: 'Get all level by compId',
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
    getAllLevelByCompId
}