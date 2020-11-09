let express = require('express');
let logger = require('morgan');
let mongoose = require('mongoose');
let foodsRouter = require('./routes/foods');
const { notFound } = require('./routes/helpers/errors');

let app = express();

mongoose.connect('mongodb://localhost/yellow_foods_mongodb', { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true });

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', foodsRouter);
app.use(function (req, res, next) {
  res.status(404).json(notFound);
});

module.exports = app;
