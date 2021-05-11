const express = require('express');
require('express-async-errors');
const logger = require('morgan');
const mongoose = require('mongoose');
const foodsRouter = require('./routes/foods-router');
const nutrientsRouter = require('./routes/nutrients-router');
const nutrientEntriesRouter = require('./routes/nutrient-entries-router');
const unitsRouter = require('./routes/units-router');
const {
  createNotFound,
  createProblem
} = require('./problem-details/problem-details-convenience-methods');

const app = express();
app.response.problemJson = function (body) {
  this.type('application/problem+json').json(body);
};

const db_url = 'mongodb://localhost/yellow_foods_mongodb';
mongoose.connect(db_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

app.use(logger('common'));
app.use(express.json());

const api_route = '/api';
app.use(api_route, foodsRouter);
app.use(api_route, nutrientsRouter);
app.use(api_route, nutrientEntriesRouter);
app.use(api_route, unitsRouter);

app.use(function (req, res, next) {
  const notFound = createNotFound();
  res.status(notFound.status).problemJson(notFound);
});

app.use(function (err, req, res, next) {
  const problem =
    app.get('env') === 'development'
      ? createProblem({ title: err.message, detail: err.stack })
      : createProblem();
  res.status(problem.status).problemJson(problem);
});

module.exports = app;
