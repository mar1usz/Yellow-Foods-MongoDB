const express = require('express');
const NutrientEntry = require('../models/nutrient-entry');
const {
  createNotFound,
  createValidationProblem
} = require('../problem-details/problem-details-convenience-methods');

const router = express.Router();

router.get('/foods/:food_id/nutriententries', async (req, res, next) => {
  const nutrientEntries = await NutrientEntry.find({
    food: req.params.food_id
  }).select('_id food nutrient unit amount');
  res.status(200).json(nutrientEntries);
});

router.get(
  '/foods/:food_id/nutriententries/:nutrientEntry_id',
  async (req, res, next) => {
    const nutrientEntry = await NutrientEntry.findOne({
      food: req.params.food_id,
      _id: req.params.nutrientEntry_id
    }).select('_id food nutrient unit amount');

    if (nutrientEntry === null) {
      const notFound = createNotFound();
      res.status(notFound.status).problemJson(notFound);
      return;
    }

    res.status(200).json(nutrientEntry);
  }
);

router.post('/foods/:food_id/nutriententries', async (req, res, next) => {
  if (
    req.params.food_id !== req.body.food ||
    !req.params.food_id ||
    !req.body.food ||
    !req.body.nutrient ||
    !req.body.unit ||
    !req.body.amount
  ) {
    const validationProblem = createValidationProblem();
    res.status(validationProblem.status).problemJson(validationProblem);
    return;
  }

  const nutrientEntry = new NutrientEntry({
    food: req.body.food,
    nutrient: req.body.nutrient,
    unit: req.body.unit,
    amount: req.body.amount
  });
  const savedNutrientEntry = await nutrientEntry.save();

  if (savedNutrientEntry === null) {
    const notFound = createNotFound();
    res.status(notFound.status).problemJson(notFound);
    return;
  }

  res.status(201).json({
    _id: savedNutrientEntry._id,
    food: savedNutrientEntry.food,
    nutrient: savedNutrientEntry.nutrient,
    unit: savedNutrientEntry.unit,
    amount: savedNutrientEntry.amount
  });
});

router.put(
  '/foods/:food_id/nutriententries/:nutrientEntry_id',
  async (req, res, next) => {
    if (
      req.params.food_id !== req.body.food ||
      !req.params.food_id ||
      !req.body.food ||
      req.params.nutrientEntry_id !== req.body._id ||
      !req.params.nutrientEntry_id ||
      !req.body._id ||
      !req.body.nutrient ||
      !req.body.unit ||
      !req.body.amount
    ) {
      const validationProblem = createValidationProblem();
      res.status(validationProblem.status).problemJson(validationProblem);
      return;
    }

    const nutrientEntry = new NutrientEntry({
      _id: req.body._id,
      food: req.body.food,
      nutrient: req.body.nutrient,
      unit: req.body.unit,
      amount: req.body.amount
    });
    const updatedNutrientEntry = await NutrientEntry.findByIdAndUpdate(
      req.params.nutrientEntry_id,
      nutrientEntry
    );

    if (updatedNutrientEntry === null) {
      const notFound = createNotFound();
      res.status(notFound.status).problemJson(notFound);
      return;
    }

    res.status(204).json();
  }
);

router.delete(
  '/foods/:food_id/nutriententries/:nutrientEntry_id',
  async (req, res, next) => {
    const removedNutrientEntry = await NutrientEntry.findByIdAndRemove(
      req.params.nutrientEntry_id
    ).select('_id food nutrient unit amount');

    if (removedNutrientEntry === null) {
      const notFound = createNotFound();
      res.status(notFound.status).problemJson(notFound);
      return;
    }

    res.status(200).json(removedNutrientEntry);
  }
);

module.exports = router;
