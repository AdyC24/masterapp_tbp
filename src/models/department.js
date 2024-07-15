const dbPool = require('../config/database');

const getAllDepartments = () => {
    const SQLQuery = 'SELECT * FROM department';

    return dbPool.execute(SQLQuery);
}

const createNewDepartment = (body) => {
    const SQLQuery = `INSERT INTO department (compId, deptName, deptUpdate)
                      VALUE ('${body.compId}', '${body.deptName}', NOW())`

    return dbPool.execute(SQLQuery);
}

module.exports = {
    getAllDepartments,
    createNewDepartment,
}