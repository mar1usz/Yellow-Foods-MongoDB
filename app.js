const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');

const foodsRouter = require('./routes/foods');
const { notFound } = require('./problemDetails/problemDetailsConvenienceMethods');

// problem+json convenience method
express.response.problemJson = function (body) { this.type('application/problem+json').json(body); };
const app = express();


mongoose.connect('mongodb://localhost/yellow_foods_mongodb', { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true });

app.use(logger('dev'));
app.use(express.json());

app.use('/api', foodsRouter);

// handle 404 responses
app.use((req, res, next) => {
  const body = notFound();
  res.status(body.status).problemJson(body);
});

module.exports = app;
