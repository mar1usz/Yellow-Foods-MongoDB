const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UnitSchema = new Schema({
  abbreviation: { type: String, required: true }
});

module.exports = mongoose.model('Unit', UnitSchema);
