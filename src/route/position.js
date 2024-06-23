const express = require('express');
const postionController = require('../controller/position')

const router = express.Router()

// GET All Positions
router.get('/', postionController.getAllPositions)

// CREATE New Position
router.post('/', postionController.createNewPostion)

// EDIT Position
router.patch('/:posId', postionController.editPosition)

// DELETE Position
router.delete('/:posId', postionController.editPosition)


module.exports = router