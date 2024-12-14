const dbPool = require('../config/database');

const getAllEmployees = () => {
    const SQLQuery = `
                    SELECT 
                        employee.empNik,
                        personal.persName,
                        position.posName,
                        company.compName,
                        section.secName,
                        contract.contractType
                    FROM 
                        employee
                    JOIN
                        personal ON employee.persId = personal.persId
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
                    JOIN
                        (SELECT 
                            empId, 
                            MAX(contractId) AS contractId
                        FROM 
                            contract
                        GROUP BY 
                            empId) AS latest_contract
                    ON 
                        employee.empId = latest_contract.empId
                    JOIN
                        contract ON latest_contract.contractId = contract.contractId
                    `;

    return dbPool.execute(SQLQuery);
}

const getEmployeeByNik = (nik) => {
    const SQLQuery = `
                    SELECT
                        empNik,
                        persName,
                        persGender,
                        persEmail,
                        persPhoneNum,
                        persAddress,
                        persKelurahan,
                        persKecamatan,
                        persKota,
                        persProv,
                        persBirthDate,
                        perNik,
                        famNum,
                        compName,
                        locName,
                        deptName,
                        posName,
                        levelCode,
                        pohName,
                        empResidence,
                        empJoinDate,
                        empWorkingDate,
                        perReligion,
                        persGender,
                        persBirthPlace,
                        famMaritalStatus,
                        famSpouseName,
                        famFatherName,
                        famMotherName,
                        famFirstKidName,
                        famSecondKidName,
                        famThirdKidName,
                        persEmergencyNum,
                        persEmergencyContact
                    FROM   
                        employee
                    JOIN
                        poh ON employee.pohId = poh.pohId
                    JOIN 
                        personal ON employee.persId = personal.persId
                    JOIN
                        family ON personal.famId = family.famId
                    JOIN
                        position ON employee.posId = position.posId
                    JOIN
                        section ON position.secId = section.secId
                    JOIN 
                        department on section.deptId = department.deptId
                    JOIN
                        job ON position.jobId = job.jobId
                    JOIN 
                        level ON job.levelId = level.levelId
                    JOIN 
                        company ON level.compId = company.compId
                    JOIN
                        location ON employee.locId = location.locId
                    WHERE
                        employee.empNik = ?
                    `;
    return dbPool.execute(SQLQuery, [nik]);
}

const createNewEmployee = (body) => {
    const SQLQuery = `INSERT INTO employee (empNIK, posId, pohId, empName, empJoinDate, empReligion, empGender, empBirthPlace, empBirthDate, empAddress, empMaritalStatus, empStatus)
                        VALUE ('${body.nik}','${body.posId}','${body.pohId}','${body.name}','${body.joinDate}','${body.religion}','${body.gender}','${body.birthPlace}','${body.birthDate}','${body.address}','${body.maritalStatus}','Active',)`;

    return dbPool.execute(SQLQuery);
}
    
module.exports = {
    getAllEmployees, 
    createNewEmployee,
    getEmployeeByNik
}