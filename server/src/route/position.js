const express = require('express');
const positionController = require('../controller/position')

const router = express.Router()

// GET All Positions
router.get('/', positionController.getAllPositions)

// CREATE New Position
router.post('/', positionController.createNewPosition)

// EDIT Position
router.patch('/:posId', positionController.editPosition)

// DELETE Position
router.delete('/:posId', positionController.editPosition)


module.exports = router