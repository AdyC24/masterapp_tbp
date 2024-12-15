const express = require('express');
const levelController = require('../controller/level')

const router = express.Router()

// Get All Level By CompId
router.get('/:compId', levelController.getAllLevelByCompId)

module.exports = router