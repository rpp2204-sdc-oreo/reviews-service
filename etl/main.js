const reviews = require('./etls/reviews_etl');
const csvParser = require('./etls/csvParser');

const revs = {}

const reviews = csvParser('/Users/javiercampos/Desktop/Hack Reactor/SDC/rr-service/etl/data/reviews.csv');




db.characteristic_reviews.aggregate([{
  $lookup: {
    from: "characteristics",
    localField: "characteristic_id",
    foreignField: "id",
    as: "name"
  }
}])

db.characteristic_reviews.aggregate([{
  $lookup: {
    from: "characteristics",
    localField: "characteristic_id",
    foreignField: "id",
    as: "name"
  },

  { $unwind: { path: "$name", preserveNullAndEmptyArrays: true }},
}])