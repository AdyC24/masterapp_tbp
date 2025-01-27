const dbPool = require('../config/database');

const getAllPositions = () => {
    const SQLQuery = `SELECT 
                    p.posId,
                    p.posName,
                    l.levelId,  
                    l.levelName,                  
                    s.secId,
                    s.secName,
                    d.deptId,
                    d.deptName,
                    dv.divName,
                    c.compName,
                    j.jobName
                    FROM position AS p
                    LEFT JOIN job AS j 
                        ON p.jobId = j.jobId
                    LEFT JOIN level AS l
                        ON j.levelId = l.levelId
                    LEFT JOIN section AS s
                        ON p.secId = s.secId
                    LEFT JOIN department AS d
                        ON s.deptId = d.deptId
                    LEFT JOIN division AS dv
                        ON d.divId = dv.divId
                    LEFT JOIN directory AS dr
                        ON dv.dirId = dr.dirId
                    LEFT JOIN company AS c
                        ON dr.compId = c.compId
                    ORDER BY
                        p.posName ASC
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