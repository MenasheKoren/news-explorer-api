require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');
const routes = require('./routes/index');
const { requestLogger, errorLogger } = require('./middleware/logger');
const { pageNotFoundErrorHandler } = require('./errors/not-found-error');
const { defaultErrorHandler } = require('./errors/default-error');

const app = express();
mongoose.connect('mongodb://localhost:27017/news');
app.use(helmet());
app.use(cors());
app.options('*', cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(requestLogger);

app.use(routes);

app.use(errorLogger);

app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

module.exports = app;
