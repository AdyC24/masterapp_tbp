const ContractModel = require('../models/contract')
const EmployeeModel = require('../models/employee')
const crypto = require('crypto');
const generateContractPDF = require('../utils/pdfGenerator');
const path = require('path');

const getAllContracts = async (req, res) => {
    try {
        const[data] = await ContractModel.getAllContracts();
        res.json({
            message: 'Get all contracts succeed',
            data: data
        })
    } catch (error) {
        res.status(500).json({
            message: "Server is error",
            errMessage: error.message
        })
    }
}

const getAllContractsByNik = async (req, res) => {
    const { nik } = req.params;

    try {
        const[data] = await ContractModel.getAllContractsByNik(nik);
        res.json({
            message: 'Get all contract by nik',
            data: data
        })
    } catch (error) {
        res.status(500).json({
            message: "Server is error",
            errMessage: error.message
        })
    }
}

const getAllContractByDept = async (req, res) => {
    const { dept } = req.params;

    try {
        const[data] = await ContractModel.getAllContractByDept(dept);
        res.json({
            message: 'Get all contract by dept',
            data: data
        })
    } catch (error) {
        res.status(500).json({
            message: "Server is error",
            errMessage: error.message
        })
    }
}


const createNewContract = async (req, res) => {
    const { nik } = req.params;

    try {
        // Fetch compId and empId from the database
        const [employeeResult] = await EmployeeModel.getCompIdByNik(nik);
        if (employeeResult.length === 0) {
            return res.status(404).json({
                message: 'Employee not found'
            });
        }
        const { compId, empId, empJoinDate } = employeeResult[0];

        // Fetch last No Contract from the database
        const [lastContractResult] = await ContractModel.getLastContractNo({ compId, contractType: "PKWT 1", year: new Date().getFullYear() });
        const lastContractNo = lastContractResult.length > 0 ? lastContractResult[0].cgNo : 0;
        const newContractNo = (lastContractNo + 1).toString().padStart(3, '0'); // Format with leading zeros

        
        // Add 6 months to the original date
        const addMonths = (date, months) => {
            const d = new Date(date);
            d.setMonth(d.getMonth() + months);
            return d;
        };
        const endContractDate = addMonths(empJoinDate, 6);
        endContractDate.setDate(empJoinDate.getDate() - 1);


        const contract = {
            empId: empId, // Use the correct empId
            contractType: 'PKWT 1', // Example contract type
            compId: compId,
            cgId: null, // This will be set after inserting into contract_generator
            contractNo: newContractNo,
            contractStart: empJoinDate,
            contractEnd: endContractDate,
            contractToken: crypto.randomBytes(16).toString('hex'),
            contractStatus: 'draft'
        };

        const data = await ContractModel.createNewContract(contract);

        // Generate PDF draft of the contract
        const pdfFilePath = path.join(__dirname, `../../pdfs/contract_${contract.contractNo}.pdf`);
        generateContractPDF(contract, pdfFilePath);

        res.json({
            message: 'Create new contract succeed',
            data: data,
            pdfPath: pdfFilePath
        });
    } catch (error) {
        console.error('Error creating new contract:', error);
        res.status(500).json({
            message: "Server error",
            errMessage: error.message
        });
    }
};

const editContract = () => {

}

const deleteContract = () => {

}

module.exports = {
    getAllContracts,
    getAllContractsByNik,
    getAllContractByDept,
    createNewContract,
    editContract,
    deleteContract
}