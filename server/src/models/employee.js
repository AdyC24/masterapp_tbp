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
                    LEFT JOIN
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
        VALUES
            (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const insertPersonalQuery = `
        INSERT INTO personal 
            (famId, payId, perNik, persName, persBirthPlace, persBirthDate, persGender, perReligion, persAddress, persKelurahan, persKecamatan, persKota, persProv, persPosNum, persPhoneNum, persEmail, persEdu, persEmergencyNum, persEmergencyContact, persEmergencyRelative)
        VALUES
            (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)             
    `;

    const insertEmployeeQuery = `
        INSERT INTO employee 
            (persId, posId, locId, payId, empNik, empResidence, empJoinDate, empWorkingDate, empTerminationDate, empTerminationReason, empStatus, empWorkingStatus) 
        VALUES 
            (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)   
    `;

    const connection = await dbPool.getConnection();
    console.log('Database connection established:', connection.threadId);


    try {
        await connection.beginTransaction();

        // Insert family
        const [familyResult] = await connection.execute(insertFamilyQuery, [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, mariageStatus])
        const famId = familyResult.insertId;

        // Insert personal 
        const [personalResult] = await connection.execute(insertPersonalQuery, [famId, 0, ktpNo, name, birthPlace, birthDate, gender, null, address, village, district, city, province, null, phoneNumber, email, 0, null, null, null]);
        const persId = personalResult.insertId;   

        // Insert employee
        await connection.execute(insertEmployeeQuery, [persId, position, locId, null, nik, null, doh, doh, null, null, 'Active', null]);

        await connection.commit();
        return {success: true, 
                message: 'Employee created successfully',};
    } catch (error) {
        await connection.rollback();
        return {success: false, message: 'Failed to create employee', error};
    } finally {
        connection.release()
    }
}

const createBunchOfEmployees = async (data) => {
    const insertEmployeeQuery = `
        INSERT INTO employee 
            (persId, posId, locId, payId, empNik, empResidence, empJoinDate, empWorkingDate, empTerminationDate, empTerminationReason, empStatus, empWorkingStatus) 
        VALUES 
            (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `;
    const insertPersonalQuery = `
        INSERT INTO personal 
            (famId, payId, perNik, persName, persBirthPlace, persBirthDate, persGender, perReligion, persAddress, persKelurahan, persKecamatan, persKota, persProv, persPosNum, persPhoneNum, persEmail, persEdu, persEmergencyNum, persEmergencyContact, persEmergencyRelative)
        VALUES
            (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) 
            `;
    const insertFamilyQuery = `
        INSERT INTO family
            (famNum, famSpouseName, famSpouseGender, famSpouseBirthPlace, famSpouseBirthDate, famFirstKidName, famFirstKidGender, famFirstKidBirthPlace, famFirstKidBirthDate, famSecondKidName, famSecondKidGender, famSecondKidBirthPlace, famSecondKidBirthDate, famThirdKidName, famThirdKidGender, famThirdKidBirthPlace, famThirdKidBirthDate, famFatherName, famMotherName, famMaritalStatus)
        VALUES
            (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `;

    const connection = await dbPool.getConnection();
    console.log('Database connection established:', connection.threadId);
    
    try {  
        await connection.beginTransaction();

        for (let i = 0; i < data.length; i++) {

            const [familyResult] = await connection.execute(insertFamilyQuery, [null, data[i][5], null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, data[i][16]]);
            const famId = familyResult.insertId;

            const [personalResult] = await connection.execute(insertPersonalQuery, [famId, 0, data[i][4], data[i][4], data[i][8], data[i][9], data[i][7], null, data[i][14], data[i][13], data[i][12], data[i][11], data[i][10], null, data[i][17], data[i][18], "Others", null, null, null]);
            const persId = personalResult.insertId;
        
            await connection.execute(insertEmployeeQuery, [[persId, data[i][12], data[i][13], null, data[i][14], null, data[i][15], data[i][15], null, null, 'Active', null]]);
        }
        
        await connection.commit();
        return {success: true, message: 'Employee created successfully'};
    }
    catch (error) {
        await connection.rollback();
        return {success: false, message: 'Failed to create employee', error};
    }
    finally {
        connection.release();
    }
}

    
module.exports = {
    getAllEmployees, 
    createNewEmployee,
    createBunchOfEmployees,
    getEmployeeByNik
}