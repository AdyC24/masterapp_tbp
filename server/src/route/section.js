const express = require('express');
const sectionController = require('../controller/section');

const router = express.Router();

// Get all section by deptId
router.get('/:deptId', sectionController.getAllSectionByDeptId);

module.exports = router