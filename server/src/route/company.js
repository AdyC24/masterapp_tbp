const express = require('express');
const companyController = require('../controller/company')

const router = express.Router()

// GET All Companies
router.get('/', companyController.getAllCompanies )

// CREATE New Company
router.post('/', companyController.createNewCompany)

// EDIT Company
router.patch('/:compId', companyController.editCompany)

// DELETE Company
router.delete('/:compId', )


module.exports = router