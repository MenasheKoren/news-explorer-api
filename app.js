require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');
const routes = require('./routes/index');
const { requestLogger, errorLogger } = require('./middleware/logger');
const { pageNotFoundErrorHandler } = require('./errors/not-found-error');
const { defaultErrorHandler } = require('./errors/default-error');
const { limiter } = require('./middleware/rate-limiter');

const { DB_ADDRESS } = process.env;

const app = express();
mongoose.connect(`${DB_ADDRESS}`);
app.use(helmet());
app.use(cors());
app.options('*', cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(requestLogger);

app.use(limiter, routes);

app.use(errorLogger);

app.use('*', pageNotFoundErrorHandler);
app.use(defaultErrorHandler);

module.exports = app;
