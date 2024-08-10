const DepartmentModel = require('../models/department');
const XLSX = require('xlsx');
const path = require('path');
const fs = require('fs');


const getAllDepartments = async (req, res) => {
    try {
        const [data] = await DepartmentModel.getAllDepartments();
        res.json({
            message: "Get all departments succeed",
            data: data
        })
    } catch (error) {
        res.status(500).json({
            message: "Server is error",
            errMessage: error,
        })
        
    }

}

const createNewDepartment = async (req, res) => {
    try {
        const {body} = req
        if (!body.compId) {
            return res.status(400).json(
                {errMessage: 'Company cannot be blank'}
            )
        }
        if (!body.deptName) {
            return res.status(400).json(
                {errMessage: 'Department cannot be blank'}
            )
        }

        await DepartmentModel.createNewDepartment(body);
        res.json({
            message: "Create new department succeed",
        })
    } catch (error) {
        res.status(500).json({
            message: "Server is error",
            errMessage: error,
        })
    }
}

const createBunchDepartment = async (req, res) => {
    try {
        // Cek file yang diupload
        if (!req.file){
            res.status(400).json({message: 'No file uploaded'})
        }

        // Path file ditaruh
        const filePath = path.join(__dirname, 'upload', req.file.filename)
        
        const {body} = req

        await DepartmentModel.createBunchDepartment(body)
        res.json({
            message: "Create new departments succeed"
        })
    } catch(error) {
        res.status(500).json({
            message: "Server is error",
            errMessage: error,
        })  
    }
}

const editDepartment = (req, res) => {
    const {deptId} = req.params;
    const {deptName} = req.body;

    if (!deptName) {
        return res.status(400).json({errMessage: 'Department cannot be blank'});
    }

    res.status(200).json({deptId, deptName})
}

const deleteDepartment = (req, res) => {
    
}

module.exports = {
    getAllDepartments,
    createNewDepartment,
    editDepartment,
    deleteDepartment
}