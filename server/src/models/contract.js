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

const getAllContractsByNik = (nik) => {
    const SQLQuery = `
                    SELECT
                        *
                    FROM
                        contract
                    WHERE
                        empNik = ?
                    `;
    return dbPool.execute(SQLQuery, [nik]);
}

module.exports = {
    getAllContracts,
    getAllContractsByNik
}