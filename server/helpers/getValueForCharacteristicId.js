const { CharacteristicReview } = require('../../db/index');

const getValueForCharacteristicId = (revId, charId) => CharacteristicReview.find({ characteristic_id: charId, review_id: revId })
  .then((data) => data);

module.exports = getValueForCharacteristicId;
