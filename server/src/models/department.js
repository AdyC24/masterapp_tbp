const dbPool = require('../config/database');

const getAllDepartments = () => {
    const SQLQuery = 'SELECT * FROM department';

    return dbPool.execute(SQLQuery);
}

const getAllDepartmentByDivId = (divId) => {
    const SQLQuery = `
                    SELECT  
                        deptId,
                        deptName
                    FROM department AS d
                    JOIN division AS di
                        ON d.divId = di.divId
                    WHERE 
                        di.divId = ?
                    ORDER BY
                        deptName ASC
                    `;
    return dbPool.execute(SQLQuery, [divId]);
}

const createNewDepartment = (body) => {
    const SQLQuery = `INSERT INTO department (compId, deptName, deptUpdate)
                      VALUE ('${body.compId}', '${body.deptName}', NOW())`

    return dbPool.execute(SQLQuery);
}

const createBunchDepartment = (body) => {
    const SQLQuery = `INSERT INTO department (compId, deptName, deptUpdate)
                      VALUES (?, ?, NOW())`;

    return dbPool(SQLQuery, [body.compId, body.deptName])
}

module.exports = {
    getAllDepartments,
    createNewDepartment,
    createBunchDepartment,
    getAllDepartmentByDivId
}