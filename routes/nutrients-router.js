const express = require('express');
const Nutrient = require('../models/nutrient');
const {
  createNotFound
} = require('../problem-details/problem-details-convenience-methods');

const router = express.Router();

router.get('/nutrients', async (req, res, next) => {
  const nutrients = await Nutrient.find();
  res.status(200).json(nutrients.map((n) => toJson(n)));
});

router.get('/nutrients/:_id', async (req, res, next) => {
  const nutrient = await Nutrient.findById(req.params._id);

  if (nutrient === null) {
    const notFound = createNotFound();
    res.status(notFound.status).problemJson(notFound);
    return;
  }

  res.status(200).json(toJson(nutrient));
});

function toJson(nutrient) {
  return { _id: nutrient._id, name: nutrient.name };
}

module.exports = router;
