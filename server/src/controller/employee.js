const EmployeeModel = require('../models/employee')

const getAllEmployees = async (req, res) => {
    try {
        const [data] = await EmployeeModel.getAllEmployees()
        res.json({
            message: 'Get all employee succeed',
            data: data 
        })
    } catch (error) {
        res.status(500).json({
            message: "Server is error",
            errMessage: error.message,
        })
    }
}

const createNewEmployee = (req, res) => {

}

const editEmployee = (req, res) => {

}

const deleteEmployee = (req, res) => {

}

module.exports = {
    getAllEmployees,
    createNewEmployee,
    editEmployee,
    deleteEmployee
}