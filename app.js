const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');

const foodsRouter = require('./routes/foods');
const { notFound } = require('./routes/problem_details/problem_details');

const app = express();

mongoose.connect('mongodb://localhost/yellow_foods_mongodb', { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true });

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', foodsRouter);

// handle 404 responses
app.use(function (req, res, next) {
  res.status(404).json(notFound);
});

module.exports = app;
