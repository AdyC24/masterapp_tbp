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

const createNewContract = () => {

}

const editContract = () => {

}

const deleteContract = () => {

}

module.exports = {
    getAllContracts,
    createNewContract,
    editContract,
    deleteContract
}