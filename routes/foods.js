let express = require('express');
let router = express.Router();
let foods = require('../models/food');
let errors = require('./helpers/errors');

// GET: api/foods
router.get('/foods', function (req, res, next) {
  foods.find().exec(function (err, food) {
    if (!err)
      res.status(200).json(food);
    else
      errors.internalServerError(req, res, next);
  });
});

// GET: api/foods/1
router.get('/foods/:id', function (req, res, next) {
  foods.findById(req.params.id).exec(function (err, food) {
    if (!err && food !== null)
      res.status(200).json(food);
    else
      errors.internalServerError(req, res, next);
  });
});

// POST: api/foods
router.post('/foods', function (req, res, next) {
  if (!req.body.name) {
    errors.badRequest(req, res, next);
  }
  else {
    let foodToSave = new foods({ name: req.body.name });
    foodToSave.save(function (err, food) {
      if (!err && food !== null)
        res.status(201).json(food);
      else
        errors.internalServerError(req, res, next);
    });
  }
});

// PUT: api/foods/1
router.put('/foods/:id', function (req, res, next) {
  if (!req.body._id || req.body._id !== req.params.id || !req.body.name) {
    errors.badRequest(req, res, next);
  }
  else {
    foods.findByIdAndUpdate(req.params.id, req.body).exec(function (err, food) {
      if (!err && food !== null)
        res.status(204).json({});
      else
        errors.internalServerError(req, res, next);
    });
  }
});

// DELETE: api/foods/1
router.delete('/foods/:id', function (req, res, next) {
  foods.findByIdAndDelete(req.params.id).exec(function (err, food) {
    if (!err && food !== null)
      res.status(200).json(food);
    else
      errors.internalServerError(req, res, next);
  });
});

module.exports = router;
