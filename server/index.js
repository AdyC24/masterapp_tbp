const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');


const companyRoute = require('./src/route/company');
const departmentRoute = require('./src/route/department');
const positionRoute = require('./src/route/position');
const employeeRoute = require('./src/route/employee');
const contractRoute = require('./src/route/contract');
const requestRoute = require('./src/route/request');
const userRoute = require('./src/route/user');  
const authRoute = require('./src/route/auth')

const app = express();

app.use(cors({ origin: 'http://localhost:3000'}));
app.use(express.json());
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true}));

// Setup Session
app.use(session({
    secret: 'SecretKey',
    resave: false,
    saveUninitialized: false,
    cookie: {secure: false} //Change if it should be HTTPS
}))

app.get("/api", (req, res) => {
    res.json({"user": ["One", "Two", "Three"]})
})

app.use('/auth', authRoute)

app.use('/user', userRoute);
app.use('/company', companyRoute);
app.use('/department', departmentRoute);
app.use('/position', positionRoute);
app.use('/employee', employeeRoute);
app.use('/contract', contractRoute);
app.use('/request', requestRoute);

app.listen(4000, () => {
    console.log('Server running di port 4000')
})