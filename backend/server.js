'use strict'

const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const fs = require('fs');

const options = {

  useUnifiedTopology: true,
  authSource: process.env.MONGO_DB_DATABASE,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  autoIndex: false, // Don't build indexes
  poolSize: 30, // Maintain up to 10 socket connections
  // If not connected, return errors immediately rather than waiting for reconnect
  connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4, // Use IPv4, skip trying IPv6
  dbName: process.env.MONGO_DB_DATABASE
};

mongoose.set('debug', true);
mongoose.connect(process.env.NODE_ENV === 'development'? 'mongodb://'+ process.env.MONGO_DB_USERNAME + ':' + process.env.MONGO_DB_PASSWORD + process.env.MONGO_DB_HOST
+ ':' + process.env.MONGO_DB_PORT: 'mongodb+srv://' + process.env.MONGO_DB_USERNAME + ':' + process.env.MONGO_DB_PASSWORD + process.env.MONGO_DB_HOST, options)
  .then(() => {
    // console.log(process.env.MONGO_DB_DATABASE);
    console.log(process.env.NODE_ENV);
    console.log(options.dbName + process.env.MONGO_DB_HOST);
    console.log('Connected to Database!');
  })
  .catch((error) => {
    console.log(error);
    console.log('Connection Failed!!!');
  });

const employeeRoutes = require('./routes/employees');

app.use(cors({origin: '*'}));
app.use(express.json({ limit: '1024mb' }));
app.use(express.urlencoded({ limit: '1024mb', extended: true }));
app.use(express.static(path.join("assets")));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
  next();
});

app.use('/api/employees', employeeRoutes);

const server =  app.listen(process.env.PORT);

console.log("Server is running on Port: " + process.env.PORT);

console.log(`Server ready at http://localhost:${process.env.PORT}`);

app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

module.exports = app;
