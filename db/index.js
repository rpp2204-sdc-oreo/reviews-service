const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/sdc-reviews')
  .then(() => {
    console.log('Connection with reviews database succesful');
  });

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

const characteristicSchema = new mongoose.Schema({
  id: Number,
  product_id: Number,
  name: String,
});
const Characteristic = mongoose.model('Characteristic', characteristicSchema, 'characteristics');

const characteristicReviewSchema = new mongoose.Schema({
  id: Number,
  characteristic_id: Number,
  review_id: Number,
  value: Number,
});
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
