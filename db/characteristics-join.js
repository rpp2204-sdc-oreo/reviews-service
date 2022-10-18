const {
  Review, Characteristic, CharacteristicReview, ReviewPhoto,
} = require('./index');

// CharacteristicReview.find().then((data) => {
//   // eslint-disable-next-line array-callback-return
//   data.map((review) => {
//     Characteristic.find(
//       { id: review.characteristic_id },
//     ).then((char) => {
//       const { name } = char;
//       review.characteristic_id = undefined;
//       review.name = name;
//     });
//   });
// });

// CharacteristicReview.findOne().then((data) => {
//   // eslint-disable-next-line array-callback-return
//   Characteristic.find(
//     { id: data.characteristic_id },
//   ).then((char) => {
//     const { name } = char;
//     data.characteristic_id = undefined;
//     data.name = name;
//     console.log(data);
//   });
// });

Review.findOne().then((data) => {
  console.log(data);
});
