const { ReviewPhoto } = require('../../db/index');

const getPhotosForReviewId = (reviewId) => ReviewPhoto.find({ review_id: reviewId })
  .then((photos) => {
    // console.log(photos);
    const results = [];
    photos.forEach((photo) => {
      const photoReduced = {};
      photoReduced.id = photo.id;
      photoReduced.url = photo.url;
      results.push(photoReduced);
    });
    console.log(`for the review ID ${reviewId} we get the following results: ${results}`);
    return results;
  });

module.exports = getPhotosForReviewId;
