const express = require('express');
const contractTypeController = require('../controller/contractType');

const router = express.Router()

router.get('/', contractTypeController.getAllContractType)

module.exports = router