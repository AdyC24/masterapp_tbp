const dbPool = require('../config/database');

const getAllEmployees = () => {
    const SQLQuery = `
                    SELECT 
                        employee.empNik,
                        employee.empName,
                        position.posName,
                        company.compName,
                        section.secName
                    FROM 
                        employee
                    JOIN
                        position ON employee.posId = position.posId
                    JOIN
                        job ON position.jobId = job.jobId
                    JOIN
                        level ON job.levelId = level.levelId
                    JOIN
                        company ON level.compId = company.compId
                    JOIN
                        section ON position.secId = section.secId
                    JOIN
                        department ON section.deptId = department.deptId
                    `;

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