const express = require('express');
const {
  getNutrientEntry,
  getNutrientEntries,
  postNutrientEntry,
  putNutrientEntry,
  deleteNutrientEntry
} = require('../controllers/nutrient-entry-controller');

const router = express.Router();

const nutrient_entries_route = '/foods/:food_id/nutriententries';
router.get(nutrient_entries_route, getNutrientEntries);
router.get(nutrient_entries_route + '/:nutrientEntry_id', getNutrientEntry);
router.post(nutrient_entries_route, postNutrientEntry);
router.put(nutrient_entries_route + '/:nutrientEntry_id', putNutrientEntry);
router.delete(
  nutrient_entries_route + '/:nutrientEntry_id',
  deleteNutrientEntry
);

module.exports = router;
