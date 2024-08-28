require('dotenv').config();

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
const authRoute = require('./src/route/auth');
const soRoute = require('./src/route/so');

const app = express();

app.use(cors({ 
    origin: ['http://localhost:3000'],
    credentials: true //Cookie sesi dikirim dari front-end
}));
app.use(express.json());
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true}));

// Setup Session
app.use(session({
    secret: process.env.SECRET_SESSION, //perlu ganti secret key yang lebih kompleks dan aman
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, //set true jika di HTTPS
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 //24 jam 
    } 
}))

app.use('/auth', authRoute)

app.use('/user', userRoute);
app.use('/company', companyRoute);
app.use('/department', departmentRoute);
app.use('/position', positionRoute);
app.use('/employee', employeeRoute);
app.use('/contract', contractRoute);
app.use('/request', requestRoute);
app.use('/so', soRoute);

app.listen(4000, () => {
    console.log('Server running di port 4000')
})