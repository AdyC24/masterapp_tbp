const dbPool = require('../config/database');

const getAllPositions = () => {
    const SQLQuery = `SELECT 
                    posId,
                    posName,
                    d.deptId,
                    deptName,
                    l.levelId,
                    levelName                    
                    FROM position as p
                    JOIN job as j 
                        ON p.jobId = j.jobId
                    JOIN level as l
                        ON j.levelId = l.levelId
                    JOIN section as s
                        ON p.secId = s.secId
                    JOIN department as d
                        ON s.deptId = d.deptId
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