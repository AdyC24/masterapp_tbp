const dbPool = require('../config/database');

const getAllCompanies = () => {
    const SQLQuery = 'SELECT * FROM company';

    return dbPool.execute(SQLQuery);
}

module.exports = {
    getAllCompanies,
}