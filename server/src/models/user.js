const dbPool = require('../config/database');

const getAllUser = () => {
    const SQLQuery = 'SELECT * FROM user';

    return dbPool.execute(SQLQuery);
}

const updateUser = () => {
    const SQLQuery = `UPDATE user 
                        SET ''`
}

module.exports = {
    getAllUser
}