// const csvParser = require('./csvParser');

// const reviews = csvParser('/Users/javiercampos/Desktop/Hack Reactor/SDC/rr-service/etl/data/reviews.csv');

const fs = require('fs');
const csv = require('csv-parser');

const reviews = [];

fs.createReadStream('/Users/javiercampos/Desktop/Hack Reactor/SDC/rr-service/etl/data/reviews.csv')
  .pipe(csv())
  .on('data', (data) => {
    console.log(data);
    reviews.push(data);
  })
  .on('end', () => {
    console.log('Done parsing the csv file!');
    module.exports = reviews;
  });
