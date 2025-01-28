const EmployeeModel = require('../models/employee')
const LocationModel = require('../models/location')
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
    const { body } = req; 

    const [rows] = await LocationModel.getLocationByCompId(body.company)
    const locId = rows[0].locId;

    body.locId = locId

    try {
        // Save to database
        await EmployeeModel.createNewEmployee(body);
        res.json({
            message: 'Create new employee succeed',
        })

    } catch (error) {
        // Handle errors
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

const createBunchOfEmployees = async (req, res) => {
    const { dataType, data } = req.body;
    console.log('Received data:', dataType, data);

    try {
        if (dataType === 'Employee Data') {
            await EmployeeModel.createBunchOfEmployees(data);
        } 
        res.json({
            message: 'Data successfully saved to database'
        });
    } catch (error) {
        console.error('Error saving data to database:', error);
        res.status(500).json({
            message: 'Error saving data to database',
            error: error.message
        });
    }
}

const editEmployee = (req, res) => {

}

const deleteEmployee = (req, res) => {

}

module.exports = {
    getAllEmployees,
    createNewEmployee,
    createBunchOfEmployees,
    editEmployee,
    deleteEmployee, 
    getEmployeeByNik
}