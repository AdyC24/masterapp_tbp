const dbPool = require('../config/database');
const crypto = require('crypto');

const getAllContracts = () => {
    const SQLQuery = `
                    SELECT
                        contractId,
                        empNik,
                        contractType,
                        level.compId,
                        contractNo,
                        contractEnd,
                        contractPA,
                        contractSP,
                        contractStatus,
                        persName,
                        posName,
                        levelCode,
                        deptName,
                        empJoinDate
                    FROM
                        contract
                    JOIN
                        employee ON contract.empId = employee.empId
                    JOIN
                        personal ON employee.persId = personal.persId
                    JOIN
                        position ON employee.posId = position.posId
                    JOIN
                        job ON position.jobId = job.jobId
                    JOIN
                        level ON job.levelId = level.levelId
                    JOIN
                        section ON position.secId = section.secId
                    JOIN
                        department ON section.deptId = department.deptId
                    JOIN
                        pic ON department.picId = pic.picId
                    WHERE
                        contractStatus = 'Open'
                    ORDER BY
                        contractEnd ASC            
                    `;
    
    return dbPool.execute(SQLQuery);
}

const getAllContractsByNik = (nik) => {
    const SQLQuery = `
                    SELECT
                        *
                    FROM
                        contract
                    JOIN 
                        employee ON contract.empId = employee.empId
                    WHERE
                        employee.empNik = ?
                    `;
    return dbPool.execute(SQLQuery, [nik]);
}

const getAllContractByDept = (dept) => {
    const SQLQuery = `
                    SELECT
                        contractId,
                        empNik,
                        contractType,
                        level.compId,
                        contractNo,
                        contractEnd,
                        contractPA,
                        contractSP,
                        contractSign,
                        contractStatus,
                        persName,
                        posName,
                        levelCode
                    FROM
                        contract
                    JOIN
                        employee ON contract.empId = employee.empId
                    JOIN
                        personal ON employee.persId = personal.persId
                    JOIN
                        position ON employee.posId = position.posId
                    JOIN
                        job ON position.jobId = job.jobId
                    JOIN
                        level ON job.levelId = level.levelId
                    JOIN
                        section ON position.secId = section.secId
                    JOIN
                        department ON section.deptId = department.deptId
                    JOIN
                        pic ON department.picId = pic.picId
                    ORDER BY
                        contractEnd ASC
                    `;

    return dbPool.execute(SQLQuery, [dept])                
}

const getContractByCgId = (cgId) => {
    const SQLQuery = `
        SELECT
            contractNo
        FROM contract
        WHERE cgId = ?
    `;
    return dbPool.execute(SQLQuery, [cgId]);
}

const getLastContractNo = ({ compId, contractType, year }) => {
    const SQLQuery = `
        SELECT 
            cgNo,
            cgConcat
        FROM contract_generator
        WHERE compId = ? AND contractType = ? AND cgYear = ?
        ORDER BY cgNo DESC
        LIMIT 1
    `;
    return dbPool.execute(SQLQuery, [compId, contractType, year]);
};

const createNewContract = async (contract) => {
    const connection = await dbPool.getConnection();
    try {
        await connection.beginTransaction();

        // Insert into contract_generator to create contractNo
        const contractGenereatorQuery = `
            INSERT INTO contract_generator (compId, contractType, cgNo, cgMonth, cgYear, cgConcat, cgDate)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        const currentYear = new Date().getFullYear();
        const currentMonth = new Date().getMonth() + 1; // Get current month (1-12)
        const monthToRoman = (month) => {
            const romanNumerals = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];
            return romanNumerals[month - 1];
        };
        const currentMonthRoman = monthToRoman(currentMonth);
        const contractConcat = `${contract.contractNo}/HRD/PKWT 1/${contract.compId}/${currentMonthRoman}/${currentYear}`;
        const [contractNoResult] = await connection.execute(contractGenereatorQuery, [contract.compId, contract.contractType, contract.contractNo, currentMonthRoman, currentYear, contractConcat, new Date()]);
        const cgId = contractNoResult.insertId;

        // Insert into contract table
        const contractQuery = `
            INSERT INTO contract
                (empId, contractType, compId, cgId, contractNo, contractStart, contractEnd, contractToken, contractStatus)
            VALUES
                (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        await connection.execute(contractQuery, [
            contract.empId,
            contract.contractType,
            contract.compId,
            cgId,
            contractConcat,
            contract.contractStart,
            contract.contractEnd,
            contract.contractToken,
            contract.contractStatus
        ]);

        await connection.commit();
        return { cgId, success: true, message: 'Contract created successfully' };
    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
};

module.exports = {
    getAllContracts,
    getAllContractsByNik,
    getAllContractByDept,
    getLastContractNo,
    createNewContract,
    getContractByCgId
}