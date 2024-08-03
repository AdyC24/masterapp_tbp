const express = require('express');
const contractController = require('../controller/contract')

const router = express.Router()

// GET All Contracts
router.get('/', contractController.getAllContracts)

// CREATE New Contract
router.post('/', contractController.createNewContract)

// EDIT Contract
router.patch('/:contId', contractController.editContract)

// DELETE Contract
router.delete('/:contId', contractController.deleteContract)


module.exports = router