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

const getAllDepartmentByDivId = async (req, res) => {
    const { divId } = req.params;

    try {
        const [data] = await DepartmentModel.getAllDepartmentByDivId(divId);
        res.json({
            message: 'Get department by divId',
            data: data
        })
    } catch (error) {
        res.status(500).json({
            message: "Server is error",
            errMessage: error.message
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

        // Baca file excelnya
        const workbook = XLSX.readFile(filePath);
        const sheetName = workbook.SheetNames[0]; //sheet pertama
        const sheet = workbook.Sheets[sheetName];

        // Ubah datanya menjadi JSON
        const data = XLSX.utils.sheet_to_json(sheet, {header: 1});

        // Menaghapus header pada data
        const headers = data.shift();

        // Format data sesuai ekspektasi
        const formattedData = data.map(row => ({
            compId: row[0],
            deptName: row[1]
        }));

        // Hapus file yang sudah diproses
        fs.unlinkSync(filePath)

        await DepartmentModel.createBunchDepartment(formattedData)
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
    createBunchDepartment,
    editDepartment,
    deleteDepartment,
    getAllDepartmentByDivId
}