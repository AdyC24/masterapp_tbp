const express = require('express');
const userController = require('../controller/user');

const router = express.Router();

// SEND user & password to login into home
router.post('/', userController.login);

module.exports = router;
