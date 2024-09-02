const express = require('express');
const picController = require('../controller/pic');

const router = express.Router();

router.get('/', picController.getAllPic)

module.exports = router
