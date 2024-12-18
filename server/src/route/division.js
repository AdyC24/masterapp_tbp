const express = require('express');
const divisionController = require('../controller/division');

const router = express.Router();

// Get all division by compId
router.get('/:compId', divisionController.getAllDivisionsByCompId);

module.exports = router