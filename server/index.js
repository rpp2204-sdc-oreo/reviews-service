/* eslint-disable camelcase */
const express = require('express');
const getReviewsForProductId = require('./helpers/getReviewsForProductId');
const getPhotosForReviewId = require('./helpers/getPhotosForReviewId');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/reviews', async (req, res) => {
  const result = {};
  console.log('this is the params: ', req.query.product_id);
  result.product = Number(req.query.product_id) || 1;
  result.page = Number(req.query.page) || 1;
  result.count = Number(req.query.count) || 5;
  getReviewsForProductId(req.query.product_id).then((data) => {
    result.results = data;
    return Promise.all(result.results.map((review) => {
      const review_id = review.id;
      const mutable = review.toObject();
      return getPhotosForReviewId(review_id).then((photos) => {
        mutable.photos = photos;
        return mutable;
      });
    }));
  }).then((withPhotos) => {
    result.results = withPhotos;
    res.send(result);
  });
});

app.get('/reviews/meta', (req, res) => {
  const result = {};
  result.product_id = Number(req.query.product_id);
  result.ratings = {};
  result.recommended = { 0: 0, 1: 0 };
  result.characteristics = {};
  getReviewsForProductId(req.query.product_id).then((data) => {
    data.forEach((review) => {
      // set the ratings
      if (result.ratings[review.rating] === undefined) {
        result.ratings[review.rating] = 1;
      } else {
        result.ratings[review.rating] += 1;
      }
      console.log(review.recommended);
      // set the recommended
      if (review.recommend === 'true') {
        result.recommended['1'] += 1;
      } else {
        result.recommended['0'] += 1;
      }
    });
  }).then(() => {
    res.send(result);
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
