require('dotenv').config({ debug: true });

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');
const { errorLogger } = require('express-winston');
const routes = require('./routes/index');
const { requestLogger } = require('./middleware/logger');

const app = express();
mongoose.connect('mongodb://localhost:27017/news');
app.use(helmet());
app.use(cors());
app.options('*', cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(requestLogger);
app.get('/test', (req, res) => {
  res.status(200).send('Hello World!');
});

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
