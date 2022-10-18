const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const csv = require('csv-parser');

const csvParser = async (filepath) => {
  const results = [];

  return fs.createReadStreamAsync('/Users/javiercampos/Desktop/Hack Reactor/SDC/rr-service/etl/data/reviews.csv')
    .pipe(csv())
    .on('data', (data) => {
      console.log(data);
      results.push(data);
    })
    .on('end', () => {
      console.log('Done parsing the csv file!');
      // return results;
    });
};

module.exports = csvParser;
