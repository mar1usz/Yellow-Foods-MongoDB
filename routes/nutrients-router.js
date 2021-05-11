const express = require('express');
const {
  getNutrients,
  getNutrient
} = require('../controllers/nutrients-controller');

const router = express.Router();

const nutriets_route = '/nutrients';
router.get(nutriets_route, getNutrients);
router.get(nutriets_route + '/:_id', getNutrient);

module.exports = router;
