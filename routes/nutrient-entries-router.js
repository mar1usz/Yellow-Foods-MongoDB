const express = require('express');
const NutrientEntry = require('../models/nutrient-entry');
const {
  createNotFound,
  createValidationProblem
} = require('../problem-details/problem-details-convenience-methods');
const { body, param, validationResult } = require('express-validator');

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

router.post(
  '/foods/:food_id/nutriententries',
  param('food_id')
    .isMongoId()
    .custom((food_id, { req }) => food_id === req.body.food_id),
  body('food_id').isMongoId(),
  body('nutrient_id').isMongoId(),
  body('unit_id').isMongoId(),
  body('amount.$numberDecimal').isDecimal(),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const validationProblem = createValidationProblem({
        errors: errors.array()
      });
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
  }
);

router.put(
  '/foods/:food_id/nutriententries/:nutrientEntry_id',
  param('food_id')
    .isMongoId()
    .custom((food_id, { req }) => food_id === req.body.food_id),
  body('food_id').isMongoId(),
  param('nutrientEntry_id')
    .isMongoId()
    .custom((nutrientEntry_id, { req }) => nutrientEntry_id === req.body._id),
  body('_id').isMongoId(),
  body('nutrient_id').isMongoId(),
  body('unit_id').isMongoId(),
  body('amount.$numberDecimal').isDecimal(),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const validationProblem = createValidationProblem({
        errors: errors.array()
      });
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
