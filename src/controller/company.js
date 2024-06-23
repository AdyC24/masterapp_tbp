const getAllCompanies = (req, res) => {
    res.json('get all companies success')
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