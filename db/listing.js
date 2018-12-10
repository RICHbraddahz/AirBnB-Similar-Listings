const mongoose = require('mongoose');
const Promise = require('bluebird');

mongoose.Promise = Promise;

const similarListingSchema = mongoose.Schema({
  id: Number,
  url: String,
  title: String,
  type: String,
  numBeds: Number,
  price: Number,
  numRatings: Number,
  avgStars: Number,
  thumbnailImage: String,
});

const getRandomNum = (min, max, decimalPlaces) => {
  decimalPlaces = decimalPlaces || 0;
  let multiplier = Math.pow(10, decimalPlaces);
  let minAdj = min * multiplier;
  let maxAdj = ((max - 1) * multiplier) + 1;

  let randomNumAdj = Math.floor(Math.random() * (maxAdj - minAdj)) + minAdj;
  return randomNumAdj / multiplier;
};

const similarlistings = mongoose.model('similarlistings', similarListingSchema);

const query = async (id) => {
  const data = await similarlistings.find({
    id: {
      $in: [
        id,
        id + 1,
        id + 2,
      ],
    },
  });
  return data;
};
// const ListingModel = mongoose.model('similarlistings', listingSchema);

// module.exports = ListingModel;
module.exports.query = query;



// const listingSchema = mongoose.Schema({
//   id: {
//     type: Number,
//     unique: true,
//   },
//   similarListings: [similarListingSchema],
// });

// listingSchema.statics.getSimilarListingsAsync = Promise.promisify(
//   async function getSimilarListings(listingId, callback) {
//     try {
//       const [{ similarListings }] = await this.find({ id: listingId });
//       callback(null, similarListings);
//     } catch (error) {
//       callback(error);
//     }
//   },