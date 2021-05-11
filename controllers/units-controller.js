const Unit = require('../models/unit');
const {
  createNotFound
} = require('../problem-details/problem-details-convenience-methods');

exports.getUnits = async (req, res, next) => {
  const units = await Unit.find();
  res.status(200).json(units.map((u) => toJson(u)));
};

exports.getUnit = async (req, res, next) => {
  const unit = await Unit.findById(req.params._id);

  if (unit === null) {
    const notFound = createNotFound();
    res.status(notFound.status).problemJson(notFound);
    return;
  }

  res.status(200).json(toJson(unit));
};

function toJson(unit) {
  return { _id: unit._id, abbreviation: unit.abbreviation };
}
