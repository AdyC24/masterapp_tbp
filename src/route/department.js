const express = require('express')

const router = express.Router()

// GET All Department
router.get('/', (req, res) => {

})

// CREATE Departmnet
router.post('/', (req, res) => {
    const {deptName} = req.body
    if (!deptName) {
        return res.status(400).json({errMessage: 'Department cannot be blank'});
    }
    res.status(200).json(deptName);
})

// EDIT Department
router.patch('/:deptId', (req, res) => {
    const {deptId} = req.params;
    const {deptName} = req.body;

    if (!deptName) {
        return res.status(400).json({errMessage: 'Department cannot be blank'});
    }

    res.status(200).json({deptId, deptName})
})

// DELETE Department
router.delete('/:deptId', (req, res) => {
    
})

module.exports = router

