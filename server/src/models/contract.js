const dbPool = require('../config/database');

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

module.exports = {
    getAllContracts,
    getAllContractsByNik,
    getAllContractByDept
}