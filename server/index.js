const express = require('express');
const getReviewsForProductId = require('./helpers/getReviewsForProductId');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/reviews', async (req, res) => {
  const result = {};
  console.log(req.query.product_id);
  const revs = await getReviewsForProductId(req.query.product_id);
  result.product = JSON.stringify(req.params.product_id) || 1;
  result.page = req.params.page || 1;
  result.count = req.params.count || 5;
  result.results = revs;
  console.log(result);
  res.send(result);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
