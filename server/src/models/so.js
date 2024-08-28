const dbPool = require('../config/database');

const getSO = () => {
    const SQLQuery = `
        WITH RECURSIVE OrgChart AS (
            SELECT
                posId,
                posName,
                0 AS parentPosId,
                1 AS level
            FROM
                position
            WHERE
                posId NOT IN (SELECT childPosId FROM position_relation)

            UNION ALL

            SELECT
                p.posId,
                p.posName,
                pr.parentPosId,
                oc.level + 1
            FROM 
                position p
            JOIN 
                position_relation pr ON p.posId = pr.childPosId
            JOIN
                OrgChart oc ON pr.parentPosId = oc.posId
        )    
        SELECT * FROM OrgChart ORDER BY level, parentPosId;
    `;

    return dbPool.execute(SQLQuery);
};

module.exports = {
    getSO
}
