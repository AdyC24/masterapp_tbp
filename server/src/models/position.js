const dbPool = require('../config/database');

const getAllPositions = () => {
    const SQLQuery = `SELECT 
                    posId,
                    posName,
                    l.levelId,  
                    l.levelName,                  
                    s.secId,
                    s.secName,
                    d.deptId,
                    d.deptName,
                    dv.divName,
                    c.compName
                    FROM position as p
                    JOIN job as j 
                        ON p.jobId = j.jobId
                    JOIN level as l
                        ON j.levelId = l.levelId
                    JOIN section as s
                        ON p.secId = s.secId
                    JOIN department as d
                        ON s.deptId = d.deptId
                    JOIN division as dv
                        ON d.divId = dv.divId
                    JOIN directory as dr
                        ON dv.dirId = dr.dirId
                    JOIN company as c
                        ON dr.compId = c.compId
                    ORDER BY
                        posName ASC
                    `;

    return dbPool.execute(SQLQuery);
}

const createNewPosition = (body) => {
    const SQLQuery =    `INSERT INTO masterapp_tbp.position (deptId, posName, posLevel, posSlot, posNum, posUpdate)
                        VALUES ('${body.deptId}', '${body.posName}', '${body.posLevel}','${body.posSlot}', '${body.posNum}', NOW())`
    return dbPool.execute(SQLQuery);
}

module.exports = {
    getAllPositions,
    createNewPosition,
}