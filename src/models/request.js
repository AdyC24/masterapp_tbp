const dbPool = require('../config/database');

const getAllRequests = () => {
    const SQLQuery = 'SELECT * FROM request';

    return dbPool.execute(SQLQuery);
}

module.exports = {
    getAllRequests,
}