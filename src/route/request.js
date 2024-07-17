const express = require('express');
const requestController = require('../controller/request')

const router = express.Router()

// GET All Employee Request
router.get('/', requestController.getAllRequests)

// CREATE New Employee Request
router.post('/', requestController.createNewRequest)

// EDIT Employee Request
router.patch('/:reqId', (req, res) =>{

})

// DELETE Employee Request
router.delete('/:reqId', (req, res) => {
    
})

module.exports = router