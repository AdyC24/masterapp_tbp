const dbPool = require('../config/database');

const getAllPic = () => {
    const SQLQuery = 'SELECT * FROM pic';

    return dbPool.execute(SQLQuery);
}

module.exports = {
    getAllPic
}