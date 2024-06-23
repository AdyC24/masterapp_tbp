const express = require('express')
const departmentController = require('../controller/department')

const router = express.Router()

// GET All Department
router.get('/', departmentController.getAllDepartments)

// CREATE Departmnet
router.post('/', departmentController.createNewDepartment)

// EDIT Department
router.patch('/:deptId', departmentController.editDepartment)

// DELETE Department
router.delete('/:deptId', departmentController.deleteDepartment)


module.exports = router

