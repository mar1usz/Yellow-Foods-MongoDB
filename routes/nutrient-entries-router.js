const express = require('express');
const {
  getNutrientEntry,
  getNutrientEntries,
  postNutrientEntry,
  putNutrientEntry,
  deleteNutrientEntry
} = require('../controllers/nutrient-entries-controller');

const router = express.Router();

const nutrientEntries_route = '/foods/:food_id/nutriententries';
router.get(nutrientEntries_route, getNutrientEntries);
router.get(nutrientEntries_route + '/:nutrientEntry_id', getNutrientEntry);
router.post(nutrientEntries_route, postNutrientEntry);
router.put(nutrientEntries_route + '/:nutrientEntry_id', putNutrientEntry);
router.delete(
  nutrientEntries_route + '/:nutrientEntry_id',
  deleteNutrientEntry
);

module.exports = router;
