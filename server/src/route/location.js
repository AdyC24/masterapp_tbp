const express = require('express');
const locationController = require('../controller/location');

const router = express.Router();

// Get a single location by ID
router.get('/:id', locationController.getLocationById);


module.exports = router;