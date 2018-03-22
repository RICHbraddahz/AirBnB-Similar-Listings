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
// );

const similarlistings = mongoose.model('similarlistings', similarListingSchema);

const query = async (id) => {
  const data = await similarlistings.find({ id: id });
  // console.log(data);
  return data;
};
// const ListingModel = mongoose.model('similarlistings', listingSchema);

// module.exports = ListingModel;
module.exports.query = query;
