const { end } = require('../config/database');
const ContractModel = require('../models/contract')
const EmployeeModel = require('../models/employee')

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

    // Function to add months to a date
    const addMonths = (date, months) => {
        const d = new Date(date);
        d.setMonth(d.getMonth() + months);
        return d;
    };

    try {
        // Fetch compId from the database
        const [compIdResult] = await EmployeeModel.getCompIdByNik(nik);
        if (!compId) {
            return res.status(400).json({
                message: 'Employee not found'
            });
        }
        const compId = compIdResult[0].compId;
        const empId = compIdResult[0].empId;
        const empJoinDate = compIdResult[0].empJoinDate;

        // Fetch last No Contract from the database
        const [lastContract] = await ContractModel.getLastContractNo(compId,"PKWT 1", new Date().getFullYear());
        const lastContractNo = lastContract[0].contractNo;

        if (lastContractNo === null) {
            lastContractNo = 1;
        }

        // Add 6 months to the original date
        const endContractDate = addMonths(originalDate, 6);

        // Set the day to one day before the original day
        endContractDate.setDate(originalDate.getDate() - 1);

        const contract = {
            empId: empId,
            empJoinDate: empJoinDate,
            endContractDate: endContractDate,
            compId: compId,
            lastContractNo: lastContractNo,
        }
        
        const [data] = await ContractModel.createNewContract(contract);
        res.json({
            message: 'Create new contract succeed',
            data: data
        })
    } catch (error) {
        res.status(500).json({
            message: "Server is error",
            errMessage: error.message
        })
    }
}

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