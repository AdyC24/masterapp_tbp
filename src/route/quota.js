const express = require('express');

const router = express.Router()

// GET All Quotas
router.get('/', (req, res) => {
    res.json('route quota ok')
})

// CREATE New Quota
router.post('/', (req, res) => {

})

// DELETE Quota
router.delete('/:compId', (req, res) => {
    
})

module.exports = router