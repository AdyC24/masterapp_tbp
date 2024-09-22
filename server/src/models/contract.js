const dbPool = require('../config/database');

const getAllContracts = () => {
    const SQLQuery = `
                    SELECT
                        *
                    FROM
                        contract                
                    `;
    
    return dbPool.execute(SQLQuery);
}

const getAllContractsByNik = (nik) => {
    const SQLQuery = `
                    SELECT
                        *
                    FROM
                        contract
                    WHERE
                        empNik = ?
                    `;
    return dbPool.execute(SQLQuery, [nik]);
}

const getAllContractByDept = (dept) => {
    const SQLQuery = `
                    SELECT
                        contractId,
                        employee.empNik,
                        contractType,
                        compId,
                        contractNo,
                        contractEnd,
                        contractPA,
                        contractSP,
                        contractSign,
                        contractStatus,
                        empName,
                        posName
                    FROM
                        contract
                    JOIN
                        employee ON contract.empNik = employee.empNik
                    JOIN
                        position ON employee.posId = position.posId
                    JOIN
                        section ON position.secId = section.secId
                    JOIN
                        department ON section.deptId = department.deptId
                    JOIN
                        pic ON department.picId = pic.picId
                    WHERE
                        picNick = ?
                    `;

    return dbPool.execute(SQLQuery, [dept])                
}

module.exports = {
    getAllContracts,
    getAllContractsByNik,
    getAllContractByDept
}