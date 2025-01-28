const dbPool = require('../config/database');

const getLocationByCompId = (compId) => {
    const SQLQuery = `
                    SELECT locId
                    FROM location
                    WHERE compId = ?
    `;

    return dbPool.execute(SQLQuery, [compId]);
}

const getLocationByPosId = (posId) => {
    const SQLQuery = `
                    SELECT loc.locId
                    FROM location AS loc
                    JOIN company AS comp ON loc.compId = comp.compId
                    JOIN directory AS dir ON comp.compId = dir.compId
                    JOIN division AS dv ON dir.dirId = dv.dirId
                    JOIN department AS dep ON dv.divId = dep.divId
                    JOIN section AS sec ON dep.deptId = sec.deptId
                    JOIN position AS pos ON sec.secId = pos.secId
                    WHERE pos.posId = ?
    `;

    return dbPool.execute(SQLQuery, [posId]);
}

module.exports = {
    getLocationByCompId,
    getLocationByPosId
}