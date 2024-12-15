const EmployeeModel = require('../models/employee')
const userController = require('../controller/user')
const securityMiddleware = require('../middleware/security')
const generateRandomString = require('../middleware/security')

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

const getEmployeeByNik = async (req, res) => {
    const { nik } = req.params;

    try {
        const [data] = await EmployeeModel.getEmployeeByNik(nik);
        res.json({
            message: 'Get employee by nik',
            data: data[0]
        })
    } catch (error) {
        res.status(500).json({
            message: "Server is error",
            errMessage: error.message
        })
    }
}

const createNewEmployee = async (req, res) => {
    try {
        // Extract data from request body
        const { body } = req;
        console.log(body)
        
        if (!body)
            return res.status(400).json({
                errMessage: 'Form should be filled completely'
            })

        // Save to database
        await EmployeeModel.createNewEmployee(body);
        res.json({
            message: 'Create new employee succeed',
        })

        // Create new user
        const password = securityMiddleware.generateRandomString()
        userController.createNewUser(body.nik, password)

    } catch (error) {
        // Handle errors
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

const editEmployee = (req, res) => {

}

const deleteEmployee = (req, res) => {

}

module.exports = {
    getAllEmployees,
    createNewEmployee,
    editEmployee,
    deleteEmployee, 
    getEmployeeByNik
}