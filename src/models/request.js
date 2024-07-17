const dbPool = require('../config/database');

const getAllRequests = () => {
    const SQLQuery = 'SELECT * FROM request';

    return dbPool.execute(SQLQuery);
}

const createNewRequest = (body) => {
    const SQLQuery = `INSERT INTO request ()
                        VALUE ('')`

    return dbPool.execute(SQLQuery);
}

module.exports = {
    getAllRequests,
    createNewRequest,
}