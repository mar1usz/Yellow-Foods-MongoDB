const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const foodsRouter = require('./routes/foods-router');
const {
  createNotFound
} = require('./problem-details/problem-details-convenience-methods');

const app = express();
app.response.problemJson = function (body) {
  this.type('application/problem+json').json(body);
};

const db_url = 'mongodb://localhost/yellow_foods_mongodb';
mongoose.connect(db_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

app.use(logger('common'));
app.use(express.json());
app.use('/api', foodsRouter);

app.use((req, res, next) => {
  const notFound = createNotFound();
  res.status(notFound.status).problemJson(notFound);
});

module.exports = app;
