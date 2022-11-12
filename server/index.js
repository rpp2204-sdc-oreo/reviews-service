/* eslint-disable camelcase */
const express = require('express');
const redis = require('redis');
const getReviewsForProductId = require('./helpers/getReviewsForProductId');
const getPhotosForReviewId = require('./helpers/getPhotosForReviewId');

const app = express();
const port = 3000;
const redisPort = 6379;

const client = redis.createClient(redisPort);
client.connect();

const cache = async (req, res, next) => {
  console.log(`This is the product id from the middleware: ${req.query.product_id}`);
  const data = await client.get(req.query.product_id);
  if (data !== null) {
    console.log(`This is the data from the cache!!: ${data}`);
    res.send(JSON.parse(data));
  } else {
    next();
  }
};

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/reviews', cache, async (req, res) => {
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
    client.SETEX(req.query.product_id, 300, JSON.stringify(result));
    res.send(result);
  });
});

app.get('/reviews/meta', (req, res) => {
  const result = {};
  result.product_id = req.params.product_id;
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
