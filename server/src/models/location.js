const dbPool = require('../config/database');

const getLocationByCompId = (compId) => {
    const SQLQuery = `
                    SELECT locId
                    FROM location
                    WHERE compId = ?
    `;

    return dbPool.execute(SQLQuery, [compId]);
}

module.exports = {
    getLocationByCompId
}