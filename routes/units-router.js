const express = require('express');
const Unit = require('../models/unit');
const {
  createNotFound
} = require('../problem-details/problem-details-convenience-methods');

const router = express.Router();

router.get('/units', async (req, res, next) => {
  const units = await Unit.find().select('_id abbreviation');
  res.status(200).json(units);
});

router.get('/units/:_id', async (req, res, next) => {
  const unit = await Unit.findById(req.params._id).select('_id abbreviation');

  if (unit === null) {
    const notFound = createNotFound();
    res.status(notFound.status).problemJson(notFound);
    return;
  }

  res.status(200).json(unit);
});

module.exports = router;
