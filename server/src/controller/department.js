const express = require('express');
const router = express.Router();
const DepartmentModel = require('../models/department');
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
        res.status(201).json({
            message: "Create new department succeed",
        });
    } catch (error) {
        res.status(500).json({
            message: "Server is error",
            errMessage: error,
        });
    }
};

const editDepartment = (req, res) => {
    const { deptId } = req.params;
    const { deptName } = req.body;

    if (!deptName) {
        return res.status(400).json({ errMessage: 'Department cannot be blank' });
    }

    res.status(200).json({ deptId, deptName });
};

const deleteDepartment = (req, res) => {
    // Your logic here
};

module.exports = {
    getAllDepartments,
    createNewDepartment,
    editDepartment,
    deleteDepartment,
    getAllDepartmentByDivId
};