const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Types = mongoose.Types;

const NutrientEntrySchema = new Schema({
  food: { type: Types.ObjectId, ref: 'Food', required: true },
  nutrient: { type: Types.ObjectId, ref: 'Nutrient', required: true },
  unit: { type: Types.ObjectId, ref: 'Unit', required: true },
  amount: { type: Types.Decimal128, required: true }
});

NutrientEntrySchema.index({ food: 1, nutrient: 1 }, { unique: true });

module.exports = mongoose.model('NutrientEntry', NutrientEntrySchema);
