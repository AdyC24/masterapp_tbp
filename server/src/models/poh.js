const dbPool = require('../config/database');

const getAllPoh = () => {
    const SQLQuery = `
        SELECT 
            *
        FROM
            poh
    `;
    return dbPool.execute(SQLQuery)
}

module.exports = {
    getAllPoh
}