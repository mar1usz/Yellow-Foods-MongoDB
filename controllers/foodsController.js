const express = require("express");
const Food = require("../models/food");

const {
  createNotFound,
  createProblem,
  createValidationProblem,
} = require("../problemDetails/problemDetailsConvenienceMethods");

const router = express.Router();

// GET /foods
router.get("/foods", (req, res, next) => {
  Food.find()
    .select("_id, name")
    .exec(function (err, foods) {
      if (!err) {
        res.status(200).json(foods);
      } else {
        const problem = createProblem();
        res.status(problem.status).problemJson(problem);
      }
    });
});

// GET /foods/5f77ba2bfe614c1ac4e63a3d
router.get("/foods/:_id", (req, res, next) => {
  Food.findById(req.params._id)
    .select("_id, name")
    .exec(function (err, food) {
      if (!err && food !== null) {
        res.status(200).json(food);
      } else if (!err && food === null) {
        const notFound = createNotFound();
        res.status(notFound.status).problemJson(notFound);
      } else {
        const problem = createProblem();
        res.status(problem.status).problemJson(problem);
      }
    });
});

// POST /foods
router.post("/foods", (req, res, next) => {
  if (!req.body.name) {
    const validationProblem = createValidationProblem();
    res.status(validationProblem.status).problemJson(validationProblem);
  } else {
    const food = new Food({
      name: req.body.name,
    });

    food.save(function (err, createdFood) {
      if (!err && createdFood !== null) {
        res.status(201).json({
          _id: createdFood._id,
          name: createdFood.name,
        });
      } else if (!err && createdFood === null) {
        const notFound = createNotFound();
        res.status(notFound.status).problemJson(notFound);
      } else {
        const problem = createProblem();
        res.status(problem.status).problemJson(problem);
      }
    });
  }
});

// PUT /foods/5f77ba2bfe614c1ac4e63a3d
router.put("/foods/:_id", (req, res, next) => {
  if (
    !req.params._id ||
    !req.body._id ||
    req.params._id !== req.body._id ||
    !req.body.name
  ) {
    const validationProblem = createValidationProblem();
    res.status(validationProblem.status).problemJson(validationProblem);
  } else {
    const food = new Food({
      _id: req.body._id,
      name: req.body.name,
    });

    Food.findByIdAndUpdate(req.params._id, food).exec(function (
      err,
      updatedFood
    ) {
      if (!err && updatedFood !== null) {
        res.status(204).json();
      } else if (!err && updatedFood === null) {
        const notFound = createNotFound();
        res.status(notFound.status).problemJson(notFound);
      } else {
        const problem = createProblem();
        res.status(problem.status).problemJson(problem);
      }
    });
  }
});

// DELETE /foods/5f77ba2bfe614c1ac4e63a3d
router.delete("/foods/:_id", (req, res, next) => {
  Food.findByIdAndRemove(req.params._id)
    .select("_id, name")
    .exec(function (err, deletedFood) {
      if (!err && deletedFood !== null) {
        res.status(200).json(deletedFood);
      } else if (!err && deletedFood === null) {
        const notFound = createNotFound();
        res.status(notFound.status).problemJson(notFound);
      } else {
        const problem = createProblem();
        res.status(problem.status).problemJson(problem);
      }
    });
});

module.exports = router;
