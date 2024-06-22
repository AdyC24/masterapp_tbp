const express = require('express');

const router = express.Router()

// GET All Companies
router.get('/', (req, res) => {

})

// CREATE New Company
router.post('/', (req, res) => {
    const {compName, compSite} = req.body
    res.json(req.body);
})

// EDIT Company
router.patch('/:compId', (req, res) =>{

})

// DELETE Company
router.delete('/:compId', (req, res) => {

})

module.exports = router