const express = require('express');
const teacherRoute = require('./Route/teacherRoute');
const childRoute = require('./Route/childRoute');
const classRoute = require('./Route/classRoute');
const authRoute = require('./Route/authRoute');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const swagger = require('./swagger');
const server = express();
dotenv.config();

mongoose.connect(process.env.DB_url).then(() => {
    console.log('Connected to the database');
    server.listen(process.env.port_number, () => {
        console.log('Server is running on port 4444');
    });
}).catch((error) => {
    console.log('Error connecting to the database');
    console.log(error + '');
});

//=======middleware=======
server.use(morgan('dev'));
server.use(cors());

//======= settings =======
server.use(express.json());
swagger(server, process.env.port_number);
server.use(express.urlencoded({ extended: false }));

//=======routes=======
server.use(authRoute);
server.use(childRoute);
server.use(teacherRoute);
server.use(classRoute);

//=========notfound MW=========
server.use((request, response, next) => {
    console.log("not found middleware");
    response.status(404).json({ message: "not found" });
});

//=======error MW=======
server.use((error, request, response, next) => {
    console.log("Error middleware");
    response.status(500).json({ message: error + '' });
});