const express = require('express');

const companyRoute = require('./src/route/company');
const departmentRoute = require('./src/route/department');
const positionRoute = require('./src/route/position');
const employeeRoute = require('./src/route/employee');
const contractRoute = require('./src/route/contract');
const requestRoute = require('./src/route/request');
const userRoute = require('./src/route/user');  

const app = express();

app.use(express.json());

app.use('/user', userRoute)
app.use('/company', companyRoute);
app.use('/department', departmentRoute);
app.use('/position', positionRoute);
app.use('/employee', employeeRoute);
app.use('/contract', contractRoute);
app.use('/request', requestRoute);

app.listen(4000, () => {
    console.log('Server running di port 4000')
})