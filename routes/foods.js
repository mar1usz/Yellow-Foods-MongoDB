const express = require('express');
const Food = require('../models/food');

const { problem, notFound, validationProblem } = require('../problemDetails/problemDetailsConvenienceMethods');

const router = express.Router();

// GET: /foods
router.get(
  '/foods',
  (req, res, next) => {
    Food
      .find()
      .exec(
        function (err, foods) {
          if (!err) {
            const body = foods.map(food => ({
              _id: food._id,
              name: food.name
            }));
            res.status(200).json(body);
          }
          else {
            const body = problem();
            res.status(body.status).problemJson(body.status);
          }
        }
      );
  });

// GET: /foods/5f77ba2bfe614c1ac4e63a3d
router.get(
  '/foods/:_id',
  (req, res, next) => {
    Food
      .findById(
        req.params._id
      )
      .exec(
        function (err, food) {
          if (!err && food !== null) {
            const body = {
              _id: food._id,
              name: food.name
            };
            res.status(200).json(body);
          }
          else if (!err && food === null) {
            const body = notFound();
            res.status(body.status).problemJson(body);
          }
          else {
            const body = problem();
            res.status(body.status).problemJson(body);
          }
        }
      );
  });

// POST: /foods
router.post(
  '/foods',
  (req, res, next) => {
    if (!req.body.name) {
      const body = validationProblem();
      res.status(body.status).problemJson(body);
    }
    else {
      const food = new Food({
        name: req.body.name
      });

      Food
        .create(
          food,
          function (err, createdFood) {
            if (!err && food !== null) {
              const body = {
                _id: createdFood._id,
                name: createdFood.name
              };
              res.status(201).json(body);
            }
            else if (!err && createdFood === null) {
              const body = notFound();
              res.status(body.status).problemJson(body);
            }
            else {
              const body = problem();
              res.status(body.status).problemJson(body);
            }
          }
        );
    }
  });

// PUT: /foods/5f77ba2bfe614c1ac4e63a3d
router.put(
  '/foods/:_id',
  (req, res, next) => {
    if (!req.params._id
      || !req.body._id
      || req.params._id !== req.body._id
      || !req.body.name) {
      const body = validationProblem();
      res.status(body.status).problemJson(body);
    }
    else {
      const food = new Food({
        _id: req.body._id,
        name: req.body.name
      });

      Food
        .findByIdAndUpdate(
          req.params._id,
          food
        )
        .exec(
          function (err, updatedFood) {
            if (!err && updatedFood !== null) {
              res.status(204).json(null);
            }
            else if (!err && updatedFood === null) {
              const body = notFound();
              res.status(body.status).problemJson(body);
            }
            else {
              const body = problem();
              res.status(body.status).problemJson(body);
            }
          }
        );
    }
  });

// DELETE: /foods/5f77ba2bfe614c1ac4e63a3d
router.delete(
  '/foods/:_id',
  (req, res, next) => {
    Food
      .findByIdAndDelete(
        req.params._id
      )
      .exec(
        function (err, deletedFood) {
          if (!err && deletedFood !== null) {
            const body = {
              _id: deletedFood._id,
              name: deletedFood.name
            };
            res.status(200).json(body);
          }
          else if (!err && food === null) {
            const body = notFound();
            res.status(body.status).problemJson(body);
          }
          else {
            const body = problem();
            res.status(body.status).problemJson(body);
          }
        }
      );
  });

module.exports = router;
