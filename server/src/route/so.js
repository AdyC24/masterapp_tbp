const express = require('express');
const router = express.Router()
const soController = require('../controller/so')

router.get('/', soController.getSO);

module.exports = router;