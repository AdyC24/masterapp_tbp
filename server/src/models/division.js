const dbPool = require('../config/database');

const getAllDivisionsByCompId = (compId) => {
    const SQLQuery = `
                    SELECT
                        divId,
                        divName
                    FROM division AS d
                    JOIN directory AS di
                        ON d.dirId = di.dirId
                    JOIN company AS c
                        ON di.compId = c.compId
                    WHERE
                        c.compId = ?
                    ORDER BY
                        divName ASC
                    `;
    return dbPool.execute(SQLQuery, [compId])
}

module.exports = {
    getAllDivisionsByCompId
}