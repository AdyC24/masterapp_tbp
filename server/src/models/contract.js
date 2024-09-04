const dbPool = require('../config/database');

const getAllContracts = () => {
    const SQLQuery = `
                    SELECT
                        *
                    FROM
                        contract                
                    `;
    
    return dbPool.execute(SQLQuery);
}

module.exports = {
    getAllContracts
}