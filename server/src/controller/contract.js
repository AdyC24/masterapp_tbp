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

    console.log('NIK: ', nik);

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

const createNewContract = () => {

}

const editContract = () => {

}

const deleteContract = () => {

}

module.exports = {
    getAllContracts,
    getAllContractsByNik,
    createNewContract,
    editContract,
    deleteContract
}