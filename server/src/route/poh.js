const express = require('express');
const pohController = require('../controller/poh');

const router = express.Router();

// Get All poh
router.get('/', pohController.getAllPoh);

module.exports = router