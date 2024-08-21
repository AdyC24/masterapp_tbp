const dbPool = require('../config/database')

const getUserEmployee = async (nik) => {
    let SQLQuery = `
        SELECT
            user.userId,
            user.userPassword,
            employee.empId,
            employee.empNIK
        FROM
            user
        JOIN
            employee ON user.empId = employee.empId
        WHERE employee.empNIK = ?
    `;

    const queryParams = [nik];

    try {
        const [rows] = await dbPool.query(SQLQuery, queryParams);
        return rows;
    } catch (error) {
        console.error('Error executing SQL query:', error);
        throw error;
    }
}

module.exports= {
    getUserEmployee
}
