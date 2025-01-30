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

const getSignatureByNik = (nik) => {
    const SQLQuery = `
                    SELECT
                        signature
                    FROM
                        employee
                    WHERE
                        empNik = ?
                    `;
    return dbPool.execute(SQLQuery, [nik]);
}

const getCompIdByNik = (nik) => {
    const SQLQuery = `
                    SELECT
                        compId,
                        empId,
                        empJoinDate
                    FROM
                        level
                    JOIN
                        job ON level.levelId = job.levelId
                    JOIN
                        position ON job.jobId = position.jobId
                    JOIN
                        employee ON position.posId = employee.posId
                    WHERE
                        empNik = ?
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
        I INSERT INTO employee 
            (persId, posId, pohId, locId, payId, empNik, empResidence, empJoinDate, empWorkingDate, empTerminationDate, empTerminationReason, empStatus, empWorkingStatus, signature) 
        VALUES 
            (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)    
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
        await connection.execute(insertEmployeeQuery, [persId, position, locId, null, nik, null, doh, doh, null, null, 'Active', null, null]);

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
            (persId, posId, pohId, locId, payId, empNik, empResidence, empJoinDate, empWorkingDate, empTerminationDate, empTerminationReason, empStatus, empWorkingStatus, signature) 
        VALUES 
            (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)   
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
            console.log(`Processing row ${i + 1}`);


            // Log data for debugging
            console.log('Family Data:', data[i][5], data[i][16]);
            console.log('Personal Data:', data[i][4], data[i][6], data[i][8], data[i][9], data[i][7], data[i][14], data[i][13], data[i][12], data[i][11], data[i][10], data[i][17], data[i][18]);
            console.log('Employee Data:', data[i][2], data[i][15], data[i][22], data[i][1], data[i][0]);

            const [familyResult] = await connection.execute(insertFamilyQuery, [data[i][5], null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, data[i][16]]);
            const famId = familyResult.insertId;
            console.log(`Inserted family with ID: ${famId}`);

            const [personalResult] = await connection.execute(insertPersonalQuery, [famId, 0, data[i][4], data[i][6], data[i][8], data[i][9], data[i][7], null, data[i][14], data[i][13], data[i][12], data[i][11], data[i][10], null, data[i][17], data[i][18], "Others", null, null, null]);
            const persId = personalResult.insertId;
            console.log(`Inserted personal with ID: ${persId}`);
        
            await connection.execute(insertEmployeeQuery, [persId, data[i][2], data[i][15], data[i][22], null, data[i][1], null, data[i][0], data[i][0], null, null, 'Active', null, null]);
            console.log(`Inserted employee with personal ID: ${persId}`);
        }

        await connection.commit();
        console.log('Transaction committed');
        return {success: true, message: 'Employee created successfully'};
    }
    catch (error) {
        console.error('Error during transaction:', error);
        await connection.rollback();
        return {success: false, message: 'Failed to create employee', error};
    }
    finally {
        connection.release();
        console.log('Database connection released');
    }
}

const updateEmployeeSignature = async (nik, signature) => {
    const updateQuery = `
        UPDATE employee
        SET signature = ?
        WHERE empNik = ?
    `;

    const [result] = await dbPool.execute(updateQuery, [signature, nik]);

    if (result.affectedRows === 0) {
        throw new Error('Employee not found');
    }
};

module.exports = {
    getAllEmployees, 
    getEmployeeByNik,
    getSignatureByNik,
    getCompIdByNik,
    createNewEmployee,
    createBunchOfEmployees,
    updateEmployeeSignature
}