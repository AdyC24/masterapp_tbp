const express = require('express');
const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
const fs = require('fs');
const employeeController = require('../controller/employee');

const router = express.Router();

// Set up Multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/signature'); // Ensure this directory exists
    },
    filename: (req, file, cb) => {
        const generateUniqueName = () => {
            const randomName = crypto.randomBytes(20).toString('hex'); // Generate a random 40-character string
            const extension = path.extname(file.originalname);
            const fullPath = path.join('uploads/signature', `${randomName}${extension}`);
            if (fs.existsSync(fullPath)) {
                // If the file already exists, generate a new name
                return generateUniqueName();
            }
            return `${randomName}${extension}`;
        };

        const uniqueName = generateUniqueName();
        cb(null, uniqueName);
    }
});

const upload = multer({ storage });

// GET All Employees
router.get('/', employeeController.getAllEmployees);

// GET Employee by Id
router.get('/:nik', employeeController.getEmployeeByNik);

// CREATE New Employee
router.post('/', employeeController.createNewEmployee);

// CREATE Bunch of Employees
router.post('/bunch', employeeController.createBunchOfEmployees);

// PATCH endpoint to update employee signature
router.patch('/:nik/signature', upload.single('signature'), employeeController.updateEmployeeSignature);

module.exports = router;