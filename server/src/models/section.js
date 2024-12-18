const dbPool = require('../config/database')

const getAllSectionByDeptId = (deptId) => {
    const SQLQuery = `
                    SELECT
                        *
                    FROM section AS s
                    JOIN department AS d
                        ON s.deptId = d.deptId
                    WHERE 
                        s.deptId = ?
                    `;

    return dbPool.execute(SQLQuery, [deptId]);
}

module.exports = {
    getAllSectionByDeptId
}