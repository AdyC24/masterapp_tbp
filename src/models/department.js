const dbPool = require('../config/database');

const getAllDepartments = () => {
    const SQLQuery = 'SELECT * FROM department';

    return dbPool.execute(SQLQuery);
}

module.exports = {
    getAllDepartments,
}