let express = require('express');
let logger = require('morgan');
let foodsRouter = require('./routes/foods');
let mongoose = require('mongoose');

let app = express();

mongoose.connect('mongodb://localhost/yellow_foods_mongodb', { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true });

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', foodsRouter);
app.use(function(req, res, next){
    res.status(404).json({ status: 404, title: 'Not Found' });
});

module.exports = app;
