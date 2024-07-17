const dbPool = require('../config/database');

const getAllPositions = () => {
    const SQLQuery = 'SELECT * FROM position';

    return dbPool.execute(SQLQuery);
}

const createNewPosition = (body) => {
    const SQLQuery =    `INSERT INTO masterapp_tbp.position (deptId, posName, posLevel, posSlot, posNum, posUpdate)
                        VALUES ('${body.deptId}', '${body.posName}', '${body.posLevel}','${body.posSlot}', '${body.posNum}', NOW())`
    // 'SELECT * FROM position'
    // `INSERT INTO position (deptId, posName, posSlot, posNum, posUpdate) 
    //                     VALUES ('${body.deptId}', '${body.posName}', '${body.posSlot}', '${body.posNum}', NOW())`

    return dbPool.execute(SQLQuery);
}

module.exports = {
    getAllPositions,
    createNewPosition,
}