const dbPool = require('../config/database');

const getAllCompanies = () => {
    const SQLQuery = 'SELECT * FROM company';

    return dbPool.execute(SQLQuery);
}

const createNewCompany =(body) => {
    const SQLQuery =    `INSERT INTO company (compName, compAbv, compSite, compUpdate)
                         VALUES ('${body.compName}', '${body.compAbv}', '${body.compSite}', NOW())`

    return dbPool.execute(SQLQuery);
}

module.exports = {
    getAllCompanies,
    createNewCompany,
}