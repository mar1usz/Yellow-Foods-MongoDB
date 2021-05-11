const express = require('express');
const {
  getFoods,
  getFood,
  postFood,
  putFood,
  deleteFood
} = require('../controllers/foods-controller');

const router = express.Router();

const foods_route = '/foods';
router.get(foods_route, getFoods);
router.get(foods_route + '/:_id', getFood);
router.post(foods_route, postFood);
router.put(foods_route + '/:_id', putFood);
router.delete(foods_route + '/:_id', deleteFood);

module.exports = router;
