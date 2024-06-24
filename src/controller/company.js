const CompanyModel = require('../models/company');

const getAllCompanies = async (req, res) => {
    try {
        const [data] = await CompanyModel.getAllCompanies();
        // const data = {
        //     compId : "1",
        //     compName : "PT. Trimegah Bangun Persada",
        //     compAbv : "TBP",
        //     compSite : "Kawasi",
        //     compUpdated : 7618438
        // }
        res.json({
            message: "Get all companies success",
            data: data
        })        
    } catch (error) {
        res.json({
            message: "Server is error",
            errMessage: error,
        })
        
    }
}

const createNewCompany = (req, res) => {
    const {compName, compSite} = req.body
    res.json(req.body);
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