let express = require('express');
let router = express.Router();
let food = require('../models/food');
const { badRequest, notFound, internal } = require('./helpers/errors');

// GET: api/foods
router.get('/foods', function (req, res, next) {
  food.find().exec(function (err, food) {
    if (!err)
      res.status(200).json(food);
    else
      res.status(500).json(internal);
  });
});

// GET: api/foods/5f77ba2bfe614c1ac4e63a3d
router.get('/foods/:id', function (req, res, next) {
  food.findById(req.params.id).exec(function (err, food) {
    if (!err && food !== null)
      res.status(200).json(food);
    else if  (!err && food === null)
      res.status(404).json(notFound);
    else
      res.status(500).json(internal);
  });
});

// POST: api/foods
router.post('/foods', function (req, res, next) {
  if (!req.body.name) {
    res.status(400).json(badRequest);
  }
  else {
    let newFood = new food({ name: req.body.name });
    newFood.save(function (err, food) {
      if (!err && food !== null)
        res.status(201).json(food);
      else
        res.status(500).json(internal);
    });
  }
});

// PUT: api/foods/5f77ba2bfe614c1ac4e63a3d
router.put('/foods/:id', function (req, res, next) {
  if (!req.body._id || req.body._id !== req.params.id || !req.body.name) {
    res.status(400).json(badRequest);
  }
  else {
    food.findByIdAndUpdate(req.params.id, req.body).exec(function (err, food) {
      if (!err && food !== null)
        res.status(204).json();
      else if  (!err && food === null)
        res.status(404).json(notFound);
      else
        res.status(500).json(internal);
    });
  }
});

// DELETE: api/foods/5f77ba2bfe614c1ac4e63a3d
router.delete('/foods/:id', function (req, res, next) {
  food.findByIdAndDelete(req.params.id).exec(function (err, food) {
    if (!err && food !== null)
      res.status(200).json(food);
    else if  (!err && food === null)
      res.status(404).json(notFound);
    else
      res.status(500).json(internal);
  });
});

module.exports = router;
