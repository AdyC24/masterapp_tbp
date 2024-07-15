const dbPool = require('../config/database');

const getAllPositions = () => {
    const SQLQuery = 'SELECT * FROM position';

    return dbPool.execute(SQLQuery);
}

const createNewPosition = (body) => {
    const SQLQuery = `INSERT INTO position (deptId, posName, posSlot, posNum, posUpdate)
                      VALUES ('${body.deptId}', '${body.posName}', '${body.posSlot}', '${posNum}', NOW())`
    
    return dbPool.execute(SQLQuery);
}

module.exports = {
    getAllPositions,
    createNewPosition,
}