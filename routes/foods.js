const express = require('express');
const router = express.Router();
const Food = require('../models/food');
const { internal, notFound, badRequest } = require('./problem_details/problem_details');

// GET: /foods
router.get('/foods', function (req, res, next) {
  Food
    .find()
    .exec(function (err, food) {
      if (!err)
        res.status(200).json(food);
      else
        res.status(500).json(internal);
    });
});

// GET: /foods/5f77ba2bfe614c1ac4e63a3d
router.get('/foods/:id', function (req, res, next) {
  Food
    .findById(req.params.id)
    .exec(function (err, food) {
      if (!err && food !== null)
        res.status(200).json(food);
      else if (!err && food === null)
        res.status(404).json(notFound);
      else
        res.status(500).json(internal);
    });
});

// POST: /foods
router.post('/foods', function (req, res, next) {
  if (!req.body.name) {
    res.status(400).json(badRequest);
  }
  else {
    Food
      .create(
        new Food(req.body),
        function (err, food) {
          if (!err && food !== null)
            res.status(201).json(food);
          else
            res.status(500).json(internal);
        }
      );
  }
});

// PUT: /foods/5f77ba2bfe614c1ac4e63a3d
router.put('/foods/:id', function (req, res, next) {
  if (req.body._id !== req.params.id
    || !req.body._id
    || !req.body.name) {
    res.status(400).json(badRequest);
  }
  else {
    Food
      .findByIdAndUpdate(req.params.id, req.body)
      .exec(function (err, food) {
        if (!err && food !== null)
          res.status(204).json();
        else if (!err && food === null)
          res.status(404).json(notFound);
        else
          res.status(500).json(internal);
      }
      );
  }
});

// DELETE: /foods/5f77ba2bfe614c1ac4e63a3d
router.delete('/foods/:id', function (req, res, next) {
  Food
    .findByIdAndDelete(req.params.id)
    .exec(function (err, food) {
      if (!err && food !== null)
        res.status(200).json(food);
      else if (!err && food === null)
        res.status(404).json(notFound);
      else
        res.status(500).json(internal);
    });
});

module.exports = router;
