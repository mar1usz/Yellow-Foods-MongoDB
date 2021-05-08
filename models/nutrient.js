const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NutrientSchema = new Schema({
  name: { type: String, required: true }
});

module.exports = mongoose.model('Nutrient', NutrientSchema);
