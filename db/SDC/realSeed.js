const mongoose = require('mongoose');
const listings = require('./listing');
const mockData = require('./mock-data');
const mongoose = require('mongoose');

mongoose.Promise = Promise;

mongoose.connect(`mongodb://localhost/similar-listings`);
const db = mongoose.connection;

const similarListingSchema = mongoose.Schema({
  id: {
    type: Number,
    unique: true
  },
  url: String,
  title: String,
  type: String,
  numBeds: Number,
  price: Number,
  numRatings: Number,
  avgStars: Number,
  thumbnailImage: String,
  sharedListings: Array,
});

const similarListing = mongoose.model('similarListing', similarListingSchema);

// async function seedDb(data) {
//   try {
//     const results = await listings.insertMany(data);
//     console.log(
//       'done seeding database:\n',
//       `inserted ${results.length} records`,
//     );
//     db.close();
//   } catch (error) {
//     console.log(
//       'error seeding database\n',
//       error,
//     );
//     db.close();
//   }
// }

// seedDb(mockData);
