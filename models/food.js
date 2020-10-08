let mongoose = require('mongoose');

let foodSchema = mongoose.Schema(
    { name: { type: String, required: true } },
    { versionKey: false }
);

module.exports = mongoose.model('foods', foodSchema);
