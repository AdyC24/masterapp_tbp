const dbPool = require('../config/database');

const getAllRequests = () => {
    const SQLQuery = 'SELECT * FROM request';

    return dbPool.execute(SQLQuery);
}

const createNewRequest = (body) => {
    const SQLQuery = `INSERT INTO request (empId, posId, reqFulfillDate, reqWorkingArea, reqPOH, reqWorkingStatus, reqReason, reqReplaceId, reqBudgetStatus, reqUnbudgetReason, reqEducation, reqMinAge, reqMaxAge, reqExperience, reqLanguage, reqLangOther, reqComputer, reqCompOther, reqSpesific, reqSertification, reqDate, reqHRAppDate, reqHeadSiteAppDate, reqHRGAAppDate)
                        VALUE ('${body.employeeId}', '${body.posId}', '${body.requiredDate}', '${body.workingArea}', '${body.POH}', '${body.agreementStatus}', '${body.reasonFulfillment}', '${body.replaceEmpId}', '${body.budgetStatus}',)`

    return dbPool.execute(SQLQuery);
}

module.exports = {
    getAllRequests,
    createNewRequest,
}