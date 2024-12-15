const dbPool = require('../config/database');

const getAllDepartments = () => {
    const SQLQuery = 'SELECT * FROM department';

    return dbPool.execute(SQLQuery);
}

const getAllDepartmentByCompId = (compId) => {
    const SQLQuery = `
                    SELECT  
                        deptId,
                        deptName
                    FROM company as c
                    join directory as d
                        on c.compId = d.compId
                    join division as dv
                        on d.dirId = dv.dirId
                    join department as dept
                        on dv.divId = dept.divId
                    where
                        c.compId = ?
                    order by
                        deptName ASC
                    `;
    return dbPool.execute(SQLQuery, [compId]);
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
    getAllDepartmentByCompId
}