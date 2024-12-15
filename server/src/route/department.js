const express = require('express')
const departmentController = require('../controller/department')
const upload = require('../config/multer');

const router = express.Router()

// GET All Department
router.get('/', departmentController.getAllDepartments)

// GET All Department By CompId
router.get('/:compId', departmentController.getAllDepartmentByCompId)

// CREATE Departmnet
router.post('/', departmentController.createNewDepartment)

// CREATE Bunch Department
router.post('/departments', upload.single('file'), departmentController.createBunchDepartment)

// EDIT Department
router.patch('/:deptId', departmentController.editDepartment)

// DELETE Department
router.delete('/:deptId', departmentController.deleteDepartment)


module.exports = router

