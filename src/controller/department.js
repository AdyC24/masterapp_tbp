const getAllDepartments = (req, res) => {

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