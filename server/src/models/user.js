const dbPool = require('../config/database');

// Function to get all users
const getAllUser = () => {
    const SQLQuery = 'SELECT * FROM user';
    return dbPool.execute(SQLQuery);
}

// Function to update a user
const updateUser = (userId, userData) => {
    const { name, email, password } = userData;
    const SQLQuery = `
        UPDATE user 
        SET name = ?, email = ?, password = ?
        WHERE id = ?
    `;
    return dbPool.execute(SQLQuery, [name, email, password, userId]);
}

// Function to create new user
const createNewUser = (body, password) => {
    const { nik } = body;
    const SQLQuery = `INSERT INTO user (empNIK, userPassword, userToken, userAccess)
                        VALUE ('${body.nik}', '${body.nik}', '', '${body.nik}',)`
}

// Function to find user by NIK
const findByNik = async (nik) => {
    const SQLQuery = 'SELECT * FROM user WHERE userNik = ?';
    const [rows] = await dbPool.execute(SQLQuery, [nik]);
    return rows.length > 0 ? rows[0] : null;
}


module.exports = {
    getAllUser,
    updateUser,
    findByNik
}
