const { Characteristic } = require('../../db/index');

const getCharacteristicsForProductId = (id) => Characteristic.find({ product_id: id })
  .then((data) => data);

module.exports = getCharacteristicsForProductId;
