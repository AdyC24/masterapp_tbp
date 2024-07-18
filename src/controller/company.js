const CompanyModel = require('../models/company');

const getAllCompanies = async (req, res) => {
    try {
        const [data] = await CompanyModel.getAllCompanies();
        res.json({
            message: "Get all companies succeed",
            data: data
        })        
    } catch (error) {
        res.status(500).json({
            message: "Server is error",
            errMessage: error.message,
        })
        
    }
}

const createNewCompany = async (req, res) => {
    try {
        const {body} = req
        if (!body.compName || !body.compAbv || !body.compSite) {
            return res.status(400).json({
                errMessage: 'Form should be filled completely'
            });
        }

        await CompanyModel.createNewCompany(body);
        res.json({
            message: "Create new company succeed",
        })
    } catch (error) {
        res.status(500).json({
            message: "Server is error",
            errMessage: error
        })
    }
}

const editCompany = (req, res) =>{

}

const deleteCompany = (req, res) => {

}

module.exports = {
    getAllCompanies,
    createNewCompany,
    editCompany,
    deleteCompany
}