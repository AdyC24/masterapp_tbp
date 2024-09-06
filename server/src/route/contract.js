const express = require('express');
const contractController = require('../controller/contract')

const router = express.Router()


// GET All Contract by NIK
router.get('/:nik', contractController.getAllContractsByNik);

// GET All Contract by Dept
router.get('/dept/:dept', contractController.getAllContractByDept)

// GET All Contracts
router.get('/', contractController.getAllContracts)

// CREATE New Contract
router.post('/', contractController.createNewContract)

// EDIT Contract
router.patch('/:contId', contractController.editContract)

// DELETE Contract
router.delete('/:contId', contractController.deleteContract)


module.exports = router