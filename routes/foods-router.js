const express = require('express');
const Food = require('../models/food');
const {
  createNotFound,
  createValidationProblem
} = require('../problem-details/problem-details-convenience-methods');

const router = express.Router();

router.get('/foods', async (req, res, next) => {
  const foods = await Food.find().select('_id, name');
  res.status(200).json(foods);
});

router.get('/foods/:_id', async (req, res, next) => {
  const food = await Food.findById(req.params._id).select('_id, name');

  if (food === null) {
    const notFound = createNotFound();
    res.status(notFound.status).problemJson(notFound);
  }

  res.status(200).json(food);
});

router.post('/foods', async (req, res, next) => {
  if (!req.body.name) {
    const validationProblem = createValidationProblem();
    res.status(validationProblem.status).problemJson(validationProblem);
  }

  const food = new Food({
    name: req.body.name
  });
  const savedFood = await food.save();

  if (savedFood === null) {
    const notFound = createNotFound();
    res.status(notFound.status).problemJson(notFound);
  }

  res.status(201).json({ _id: savedFood._id, name: savedFood.name });
});

router.put('/foods/:_id', async (req, res, next) => {
  if (
    req.params._id !== req.body._id ||
    !req.params._id ||
    !req.body._id ||
    !req.body.name
  ) {
    const validationProblem = createValidationProblem();
    res.status(validationProblem.status).problemJson(validationProblem);
  }

  const food = new Food({
    _id: req.body._id,
    name: req.body.name
  });
  const updatedFood = await Food.findByIdAndUpdate(req.params._id, food);

  if (updatedFood === null) {
    const notFound = createNotFound();
    res.status(notFound.status).problemJson(notFound);
  }

  res.status(204).json();
});

router.delete('/foods/:_id', async (req, res, next) => {
  const removedFood = await Food.findByIdAndRemove(req.params._id).select(
    '_id, name'
  );

  if (removedFood === null) {
    const notFound = createNotFound();
    res.status(notFound.status).problemJson(notFound);
  }

  res.status(200).json(removedFood);
});

module.exports = router;
