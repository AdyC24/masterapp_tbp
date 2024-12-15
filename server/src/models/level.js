const dbPool = require('../config/database');

const getAllLevelByCompId = (compId) => {
    const SQLQuery = `
                    SELECT
                        levelId,
                        levelName
                    FROM level as l
                    JOIN company as c
                        ON l.compId = c.compId
                    WHERE
                        l.compId = ?
                    `;
    return dbPool.execute(SQLQuery, [compId])
}

module.exports = {
    getAllLevelByCompId
}