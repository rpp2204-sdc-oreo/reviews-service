const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost/sdc-reviews')
//   .then(() => {
//     console.log('Connection with reviews database succesful');
//   });

mongoose.connect('mongodb://3.137.144.145:27017/sdc-reviews')
  .then(() => {
    console.log('Connection with reviews database succesful');
  }).catch((error) => console.log(error));
// db.reviews_photos.createIndex({ product_id: 1 });
// ?authSource=admin
const reviewSchema = new mongoose.Schema({
  id: Number,
  product_id: Number,
  rating: Number,
  date: Number,
  summary: String,
  body: String,
  recommend: String,
  reported: String,
  reviewer_name: String,
  reviewer_email: String,
  response: String,
  helpfulness: Number,
});
const Review = mongoose.model('Review', reviewSchema, 'reviews');

const characteristicSchema = new mongoose.Schema({});
const Characteristic = mongoose.model('Characteristic', characteristicSchema, 'characteristics');

const characteristicReviewSchema = new mongoose.Schema({});
const CharacteristicReview = mongoose.model('CharacteristicReview', characteristicReviewSchema, 'characteristic_reviews');

const reviewPhotosSchema = new mongoose.Schema({
  id: Number,
  review_id: Number,
  url: String,
});
const ReviewPhoto = mongoose.model('ReviewPhoto', reviewPhotosSchema, 'reviews_photos');

module.exports = {
  Review,
  Characteristic,
  CharacteristicReview,
  ReviewPhoto,
};
