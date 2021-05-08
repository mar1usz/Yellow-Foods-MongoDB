const express = require('express');
const Nutrient = require('../models/nutrient');
const {
  createNotFound
} = require('../problem-details/problem-details-convenience-methods');

const router = express.Router();

router.get('/nutrients', async (req, res, next) => {
  const nutrients = await Nutrient.find().select('_id name');
  res.status(200).json(nutrients);
});

router.get('/nutrients/:_id', async (req, res, next) => {
  const nutrient = await Nutrient.findById(req.params._id).select('_id name');

  if (nutrient === null) {
    const notFound = createNotFound();
    res.status(notFound.status).problemJson(notFound);
    return;
  }

  res.status(200).json(nutrient);
});

module.exports = router;
