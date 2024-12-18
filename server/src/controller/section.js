const SectionModel = require('../models/section');

const getAllSectionByDeptId = async (req, res) => {
    const { deptId } = req.params;

    try {
        const [data] = await SectionModel.getAllSectionByDeptId(deptId);
        res.json({
            message: 'Get all section by deptId',
            data: data
        })
    } catch (error) {
        res.status({
            message: "Server is error",
            errMessage: error
        })
    }
}

module.exports = {
    getAllSectionByDeptId
}