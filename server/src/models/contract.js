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
                        persName,
                        posName
                    FROM
                        contract
                    JOIN
                        employee ON contract.empId = employee.empId
                    JOIN
                        personal ON employee.persId = personal.persId
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
                        AND DATEDIFF(contractEnd, CURRENT_DATE) <= 30
                        AND contractEnd >= CURRENT_DATE
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