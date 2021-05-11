const Food = require('../models/food');
const {
  createNotFound,
  createValidationProblem
} = require('../problem-details/problem-details-convenience-methods');
const { body, param, validationResult } = require('express-validator');

exports.getFoods = async function (req, res, next) {
  const foods = await Food.find();
  res.status(200).json(foods.map((f) => toJson(f)));
};

exports.getFood = async function (req, res, next) {
  const food = await Food.findById(req.params._id);

  if (food === null) {
    const notFound = createNotFound();
    res.status(notFound.status).problemJson(notFound);
    return;
  }

  res.status(200).json(toJson(food));
};

exports.postFood = [
  body('name').isString(),

  async function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const validationProblem = createValidationProblem({
        errors: errors.array()
      });
      res.status(validationProblem.status).problemJson(validationProblem);
      return;
    }

    const food = new Food({
      name: req.body.name
    });
    const savedFood = await food.save();

    if (savedFood === null) {
      const notFound = createNotFound();
      res.status(notFound.status).problemJson(notFound);
      return;
    }

    res.status(201).json(toJson(savedFood));
  }
];

exports.putFood = [
  param('_id')
    .isMongoId()
    .custom((_id, { req }) => _id === req.body._id),
  body('_id').isMongoId(),
  body('name').isString(),

  async function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const validationProblem = createValidationProblem({
        errors: errors.array()
      });
      res.status(validationProblem.status).problemJson(validationProblem);
      return;
    }

    const food = new Food({
      _id: req.body._id,
      name: req.body.name
    });
    const updatedFood = await Food.findByIdAndUpdate(req.params._id, food);

    if (updatedFood === null) {
      const notFound = createNotFound();
      res.status(notFound.status).problemJson(notFound);
      return;
    }

    res.status(204).json();
  }
];

exports.deleteFood = async function (req, res, next) {
  const removedFood = await Food.findByIdAndRemove(req.params._id);

  if (removedFood === null) {
    const notFound = createNotFound();
    res.status(notFound.status).problemJson(notFound);
    return;
  }

  res.status(200).json(toJson(removedFood));
};

function toJson(food) {
  return { _id: food._id, name: food.name };
}
