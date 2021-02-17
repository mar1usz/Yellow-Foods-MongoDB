const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');

const foodsRouter = require('./controllers/foods');
const { createNotFound } = require('./problemDetails/problemDetailsConvenienceMethods');

// problem+json convenience method
express.response.problemJson = function (body) { this.type('application/problem+json').json(body); };
const app = express();


// connect to mongodb
const db_url = 'mongodb://localhost/yellow_foods_mongodb';
mongoose.connect(db_url, { useNewUrlParser: true, useUnifiedTopology: true });


// mount express middleware
app.use(logger('dev'));
app.use(express.json());
app.use('/api', foodsRouter);

// handle 404 responses
app.use((req, res, next) => {
  const notFound = createNotFound();
  res.status(notFound.status).problemJson(notFound);
});

module.exports = app;
