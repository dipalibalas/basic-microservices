const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cookieParser = require('cookie-parser');
const connect = require('./db/db');
const rabbitMQ = require("./service/rabbit");

const app = express();
rabbitMQ.connect();


app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: false, limit: '10kb' }));
app.use(cookieParser());

const captainRoutes = require('./routes/captain.routes');
app.use('/', captainRoutes);

connect();

module.exports = app;