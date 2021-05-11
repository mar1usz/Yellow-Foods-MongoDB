const express = require('express');
const { getUnits, getUnit } = require('../controllers/units-controller');

const router = express.Router();

const units_route = '/units';
router.get(units_route, getUnits);
router.get(units_route + '/:_id', getUnit);

module.exports = router;
