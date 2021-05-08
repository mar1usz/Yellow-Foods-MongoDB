const express = require('express');
const NutrientEntry = require('../models/nutrient-entry');
const {
  createNotFound,
  createValidationProblem
} = require('../problem-details/problem-details-convenience-methods');

const router = express.Router();

router.get('/foods/:food_id/nutriententries', async (req, res, next) => {
  const nutrientEntries = await NutrientEntry.find({
    food_id: req.params.food_id
  });
  res.status(200).json(nutrientEntries.map((ne) => toJson(ne)));
});

router.get(
  '/foods/:food_id/nutriententries/:nutrientEntry_id',
  async (req, res, next) => {
    const nutrientEntry = await NutrientEntry.findOne({
      food_id: req.params.food_id,
      _id: req.params.nutrientEntry_id
    });

    if (nutrientEntry === null) {
      const notFound = createNotFound();
      res.status(notFound.status).problemJson(notFound);
      return;
    }

    res.status(200).json(toJson(nutrientEntry));
  }
);

router.post('/foods/:food_id/nutriententries', async (req, res, next) => {
  if (
    req.params.food_id !== req.body.food_id ||
    !req.params.food_id ||
    !req.body.food_id ||
    !req.body.nutrient_id ||
    !req.body.unit_id ||
    !req.body.amount
  ) {
    const validationProblem = createValidationProblem();
    res.status(validationProblem.status).problemJson(validationProblem);
    return;
  }

  const nutrientEntry = new NutrientEntry({
    food_id: req.body.food_id,
    nutrient_id: req.body.nutrient_id,
    unit_id: req.body.unit_id,
    amount: req.body.amount
  });
  const savedNutrientEntry = await nutrientEntry.save();

  if (savedNutrientEntry === null) {
    const notFound = createNotFound();
    res.status(notFound.status).problemJson(notFound);
    return;
  }

  res.status(201).json(toJson(savedNutrientEntry));
});

router.put(
  '/foods/:food_id/nutriententries/:nutrientEntry_id',
  async (req, res, next) => {
    if (
      req.params.food_id !== req.body.food_id ||
      !req.params.food_id ||
      !req.body.food_id ||
      req.params.nutrientEntry_id !== req.body._id ||
      !req.params.nutrientEntry_id ||
      !req.body._id ||
      !req.body.nutrient_id ||
      !req.body.unit_id ||
      !req.body.amount
    ) {
      const validationProblem = createValidationProblem();
      res.status(validationProblem.status).problemJson(validationProblem);
      return;
    }

    const nutrientEntry = new NutrientEntry({
      _id: req.body._id,
      food_id: req.body.food_id,
      nutrient_id: req.body.nutrient_id,
      unit_id: req.body.unit_id,
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
    );

    if (removedNutrientEntry === null) {
      const notFound = createNotFound();
      res.status(notFound.status).problemJson(notFound);
      return;
    }

    res.status(200).json(toJson(removedNutrientEntry));
  }
);

function toJson(nutrientEntry) {
  return {
    _id: nutrientEntry._id,
    food_id: nutrientEntry.food_id,
    nutrient_id: nutrientEntry.nutrient_id,
    unit_id: nutrientEntry.unit_id,
    amount: nutrientEntry.amount
  };
}

module.exports = router;
