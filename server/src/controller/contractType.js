const ContractTypeModel = require('../models/contractType')

const getAllContractType = async (req, res) => {
    try {
        const[data] = await ContractTypeModel.getAllContractType();
        res.json({
            message: 'Get all contract type succeed',
            data: data
        })
    } catch (error) {
        res.status(500).json({
            message:"Server is error",
            errMessage: error.message 
        })
    }
} 

module.exports = {
    getAllContractType
}