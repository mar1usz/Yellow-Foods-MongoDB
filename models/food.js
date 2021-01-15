const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const FoodSchema = new Schema(
    {
        name: { type: String, required: true }
    },
    {
        versionKey: false
    });

module.exports = mongoose.model('Food', FoodSchema);
