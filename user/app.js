const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cookieParser = require('cookie-parser');
const connect = require('./db/db');

const app = express();

app.disable('x-powered-by');

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: false, limit: '10kb' }));
app.use(cookieParser());

const userRoutes = require('./routes/user.routes');
app.use('/', userRoutes);

connect();

module.exports = app;