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
                    LEFT JOIN
                        (SELECT 
                            empId, 
                            MAX(contractId) AS contractId
                        FROM 
                            contract
                        GROUP BY 
                            empId) AS latest_contract
                    ON 
                        employee.empId = latest_contract.empId
                    LEFT JOIN
                        contract ON latest_contract.contractId = contract.contractId
                    ORDER BY
                        empJoinDate DESC
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

const createNewEmployee = async (body) => {

    const { ktpNo, name, gender, birthPlace, birthDate, address, village, district, city, mariageStatus, phoneNumber, email, nik, position, doh, province, locId } = body

    const insertFamilyQuery = `
        INSERT INTO family
            (famNum, famSpouseName, famSpouseGender, famSpouseBirthPlace, famSpouseBirthDate, famFirstKidName, famFirstKidGender, famFirstKidBirthPlace, famFirstKidBirthDate, famSecondKidName, famSecondKidGender, famSecondKidBirthPlace, famSecondKidBirthDate, famThirdKidName, famThirdKidGender, famThirdKidBirthPlace, famThirdKidBirthDate, famFatherName, famMotherName, famMaritalStatus)
        VALUE
            (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const insertPersonalQuery = `
        INSERT INTO personal 
            (famId, payId, perNik, persName, persBirthPlace, persBirthDate, persGender, perReligion, persAddress, persKelurahan, persKecamatan, persKota, presProv, persPosNum, persPhoneNum, persEmail, presEdu, persEmergencyNum, persEmergencyContract, persEmergencyRelative)
        VALUE
            (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)             
    `;

    const insertEmployeeQuery = `
        INSERT INTO employee 
            (persId, posId, locId, payId, empNik, empResidence, empJoinDate, empWorkingDate, empTerminationDate, empTerminationReason, empStatus, empWorkingStatus) 
        VALUES 
            (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)   
    `;

    const connection = await dbPool.getConnection();

    try {
        await connection.beginTransaction();

        // Insert family
        const [familyResult] = await connection.execute(insertFamilyQuery, [NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, mariageStatus])

        const famId = familyResult.famId;

        // Insert personal 
        const [personalResult] = await connection.execute(insertPersonalQuery, [famId, NULL, ktpNo, name, birthPlace, birthDate, gender, NULL, address, village, district, city, province, NULL, phoneNumber, email, NULL, NULL, NULL, NULL]);
        
        const persId = personalResult.persId;

        // Insert employee
        await connection.execute(persId, position, locId, NULL, nik, NULL, doh, doh, NULL, NULL, 'Active', NULL);

        await connection.commit();
        return {success: true, message: 'Employee created successfully'};
    } catch (error) {
        await connection.rollback();
        return {success: false, message: 'Failed to create employee', error};
    } finally {
        connection.release()
    }
}

    
module.exports = {
    getAllEmployees, 
    createNewEmployee,
    getEmployeeByNik
}