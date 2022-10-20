/* eslint-disable camelcase */
const express = require('express');
const getReviewsForProductId = require('./helpers/getReviewsForProductId');
const getPhotosForReviewId = require('./helpers/getPhotosForReviewId');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// app.get('/reviews', async (req, res) => {
//   const result = {};
//   console.log(req.query.product_id);
//   const revs = await getReviewsForProductId(req.query.product_id);
//   result.product = JSON.stringify(req.params.product_id) || 1;
//   result.page = req.params.page || 1;
//   result.count = req.params.count || 5;
//   result.results = revs;
//   console.log(result);
//   res.send(result);
// });

// app.get('/reviews', async (req, res) => {
//   const result = {};
//   result.product = JSON.stringify(req.params.product_id) || 1;
//   result.page = req.params.page || 1;
//   result.count = req.params.count || 5;
//   getReviewsForProductId(req.query.product_id).then(async (data) => {
//     result.results = data;
//     const withPhotos = await result.results.map(async (review) => {
//       const review_id = review.id;
//       const mutable = review.toObject();
//       // mutable.photos = 'Hello!!!';
//       const photosArray = await getPhotosForReviewId(review_id);
//       // console.dir(photosArray, { depth: true });
//       mutable.photos = photosArray;
//       return mutable;
//       // review.photos = await getPhotosForReviewId(review_id);
//     });
//     console.dir(withPhotos, { depth: true });
//   }).then((withPhotos) => {
//     res.send(withPhotos);
//   });
// });

// app.get('/reviews', async (req, res) => {
//   const result = {};
//   result.product = JSON.stringify(req.params.product_id) || 1;
//   result.page = req.params.page || 1;
//   result.count = req.params.count || 5;
//   getReviewsForProductId(req.query.product_id).then((data) => {
//     result.results = data;
//     const withPhotos = result.results.map((review) => {
//       const review_id = review.id;
//       const mutable = review.toObject();
//       getPhotosForReviewId(review_id).then((photos) => {
//         mutable.photos = photos;
//         // console.log(mutable);
//         return mutable;
//       }).then((mutable) => {
//         console.log('This is the mutable: ', mutable);
//         res.send(mutable);
//       });
//       return mutable;
//     });
//     return withPhotos;
//   }).then((withPhotos) => {

//   });
// });

app.get('/reviews', async (req, res) => {
  const result = {};
  result.product = JSON.stringify(req.params.product_id) || 1;
  result.page = req.params.page || 1;
  result.count = req.params.count || 5;
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
    console.log(withPhotos);
    res.send(withPhotos);
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
