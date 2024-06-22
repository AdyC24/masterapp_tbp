const express = require('express');

const companyRoute = require('./src/route/company');
const departmentRoute = require('./src/route/department');
const positionRoute = require('./src/route/position');
const quotaRoute = require('./src/route/quota');
const employeeRoute = require('./src/route/employee');
const contractRoute = require('./src/route/contract');

const app = express();

app.use(express.json());

app.use('/company', companyRoute);
app.use('/department', departmentRoute);
app.use('/position', positionRoute);
app.use('/employee', employeeRoute);
app.use('/contract', contractRoute);
app.use('/quota', quotaRoute);

app.listen(4000)