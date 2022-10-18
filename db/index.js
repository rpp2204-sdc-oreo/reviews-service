const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/sdc-reviews')
  .then(() => {
    console.log('Connection with reviews database succesful');
  });

// const reviewSchema = new mongoose.Schema({
//   product_id: Number,
//   rating: Number,
//   date: Date,
//   summary: String,
//   body: String,
//   recommend: Boolean,
//   reported: Boolean,
//   reviewer_name: String,
//   reviewer_email: String,
//   response: String,
//   helpfulness: Number,
//   photos: [String],
//   characteristics: [{
//     name: String,
//     value: Number,
//   }],
// });

// const Review = mongoose.model('Review', reviewSchema);

const reviewSchema = new mongoose.Schema({});
const Review = mongoose.model('Review', reviewSchema, 'reviews');

const characteristicSchema = new mongoose.Schema({});
const Characteristic = mongoose.model('Characteristic', characteristicSchema, 'characteristics');

const characteristicReviewSchema = new mongoose.Schema({});
const CharacteristicReview = mongoose.model('CharacteristicReview', characteristicReviewSchema, 'characteristic_reviews');

const reviewPhotosSchema = new mongoose.Schema({});
const ReviewPhoto = mongoose.model('ReviewPhoto', reviewPhotosSchema, 'reviews_photos');

module.exports = {
  Review,
  Characteristic,
  CharacteristicReview,
  ReviewPhoto,
};
