const dbPool = require('../config/database');

const getAllEmployees = () => {
    const SQLQuery = 'SELECT * FROM employee';

    return dbPool.execute(SQLQuery);
}

const createNewEmployee = (body) => {
    const SQLQuery = `INSERT INTO employee (empNIK, posId, pohId, empName, empJoinDate, empReligion, empGender, empBirthPlace, empBirthDate, empAddress, empMaritalStatus, empStatus)
                        VALUE ('${body.nik}','${body.posId}','${body.pohId}','${body.name}','${body.joinDate}','${body.religion}','${body.gender}','${body.birthPlace}','${body.birthDate}','${body.address}','${body.maritalStatus}','Active',)`;

    return dbPool.execute(SQLQuery);
}
    
module.exports = {
    getAllEmployees, 
    createNewEmployee
}