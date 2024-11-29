const dbPool = require('../config/database');

const getAllContractType = () => {
    const SQLQuery = `
                    SELECT
                        *
                    FROM
                        contract_type
    `;

    return dbPool.execute(SQLQuery);
}

module.exports = {
    getAllContractType
}