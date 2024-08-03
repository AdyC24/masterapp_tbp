const dbPool = require('../config/database');

const getAllEmployees = () => {
    const SQLQuery = 'SELECT * FROM employee';

    return dbPool.execute(SQLQuery);
}

module.exports = {
    getAllEmployees
}