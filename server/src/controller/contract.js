const ContractModel = require('../models/contract')

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

    console.log(dept);

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

const createNewContract = () => {

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