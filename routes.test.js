const axios = require('axios');

const getFullReviews = (productid) => axios.get('http://localhost:3000/reviews', { params: { product_id: productid } });

describe('/Reviews route working correctly', () => {
  it('Returns an object', async () => {
    getFullReviews(2).then((data) => {
      expect(typeof data.data).toBe('object');
    });
  });

  it('Retrieves only reviews for the same product ID passed as query parameter', () => {
    getFullReviews(2).then((data) => {
      let same = true;
      const { results } = data.data;
      results.forEach((result) => {
        if (result.product_id !== 2) {
          same = false;
        }
      });
      expect(same).toBe(true);
    });
  });

  it('Contains an array of photos as the photos property', () => {
    getFullReviews(2).then((data) => {
      expect(typeof data.data.results[0].photos).toBe('object');
    });
  });
});
