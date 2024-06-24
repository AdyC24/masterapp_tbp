const getAllCompanies = (req, res) => {
    const data = {
        compId : "1",
        compName : "PT. Trimegah Bangun Persada",
        compAbv : "TBP",
        compSite : "Kawasi",
        compUpdated : 7618438
    }

    res.json(data)
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