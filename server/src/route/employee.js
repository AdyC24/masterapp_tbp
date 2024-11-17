const express = require('express');
const employeeController = require('../controller/employee')

const router = express.Router()

// GET All Employees
router.get('/', employeeController.getAllEmployees)

// GET Employee by Id
router.get('/:nik', employeeController.getEmployeeByNik)

// CREATE New Employee
router.post('/', employeeController.createNewEmployee)

// EDIT Employee
router.patch('/:empId', employeeController.editEmployee)

// DELETE Employee
router.delete('/:empId', employeeController.deleteEmployee)


module.exports = router