const DepartmentModel = require('../models/department');

const getAllDepartments = async (req, res) => {
    try {
        /**
         * deptId:
         * compId:
         * deptName:
         * deptUpdate:
         */
        const [data] = await DepartmentModel.getAllDepartments();
        res.json({
            message: "Get all departments succeed",
            data: data
        })
    } catch (error) {
        res.status(500).json({
            message: "Server is error",
            errMessage: error,
        })
        
    }

}

const createNewDepartment = (req, res) => {
    const {deptName} = req.body
    if (!deptName) {
        return res.status(400).json({errMessage: 'Department cannot be blank'});
    }
    res.status(200).json(deptName);
}

const editDepartment = (req, res) => {
    const {deptId} = req.params;
    const {deptName} = req.body;

    if (!deptName) {
        return res.status(400).json({errMessage: 'Department cannot be blank'});
    }

    res.status(200).json({deptId, deptName})
}

const deleteDepartment = (req, res) => {
    
}

module.exports = {
    getAllDepartments,
    createNewDepartment,
    editDepartment,
    deleteDepartment
}