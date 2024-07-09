const dbPool = require('../config/database');

const getAllPositions = () => {
    const SQLQuery = 'SELECT * FROM position';

    return dbPool.execute(SQLQuery);
}

module.exports = {
    getAllPositions,
}