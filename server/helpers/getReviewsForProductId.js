const { Review } = require('../../db/index');

const getReviewsForProductId = (id) => Review.find({ product_id: id }).then((data) => data);

// const getReviewsForProductId = (id) => {
//   console.log('This is the product id: ', id);
//   Review.findOne({ product_id: id }, (err, data) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log(data);
//     }
//   });
// };

module.exports = getReviewsForProductId;
