const faker = require('faker');

// get a random number between min(inclusive) and max(non-inclusive).
// [decimalPlaces]: optional. default to 0(integer) if not provided
const getRandomNum = (min, max, decimalPlaces) => {
  decimalPlaces = decimalPlaces || 0;
  const multiplier = Math.pow(10, decimalPlaces);
  const minAdj = min * multiplier;
  const maxAdj = ((max - 1) * multiplier) + 1;

  const randomNumAdj = Math.floor(Math.random() * (maxAdj - minAdj)) + minAdj;
  return randomNumAdj / multiplier;
};

// pick a random item from an array
const pickRandomItem = array => array[getRandomNum(0, array.length)];

const settings = {
  similarListingsPerId: 10,

  id: {
    min: 0,
    max: 200, // non-inclusive
  },

  title: {
    minWords: 2,
    maxWords: 8, // non-inclusive
  },

  type: {
    options: ['Entire Place', 'Shared Room', 'Private Room'],
  },

  numBeds: {
    min: 1,
    max: 20, // non-inclusive
  },

  price: {
    min: 10,
    max: 2000, // non-inclusive
  },

  numRatings: {
    min: 0,
    max: 2000, // non-inclusive
  },

  avgStars: {
    min: 0,
    max: 6, // non-inclusive
    decimalPlaces: 1,
  },

  thumbnailImage: {
    width: 316,
    height: 210,
  },
};

const generateOneSimilarListing = id => ({
  id,

  title: faker.lorem.words(getRandomNum(
    settings.title.minWords,
    settings.title.maxWords,
  )),

  type: pickRandomItem(settings.type.options,),

  numBeds: getRandomNum(
    settings.numBeds.min,
    settings.numBeds.max,
  ),

  price: getRandomNum(
    settings.price.min,
    settings.price.max,
  ),

  numRatings: getRandomNum(
    settings.numRatings.min,
    settings.numRatings.max,
  ),

  avgStars: getRandomNum(
    settings.avgStars.min,
    settings.avgStars.max,
    settings.avgStars.decimalPlaces,
  ),

  thumbnailImage: 'https://picsum.photos/' +
                    `${settings.thumbnailImage.width}/` +
                    `${settings.thumbnailImage.height}` +
                    `?image=${id}`,
});

const batchInsertSimilarListings = (batchNumber, collection) => {
  let similarListings = [];

  for (let i = 0; i < 1000; i += 1) {
    similarListings.push(generateOneSimilarListing(batchNumber * i + i));
  }

  return insertIntoDatabase(collection, similarListings)
    .catch((e) => {
      console.error(e);
      client.close();
    });
}

const async generateTenMilSimilarListings = (collection, time) => {
  for (let i = 0; i < 1000; i += 1) {
    await batchInsertSimilarListing(i, collection);
    console.log(`just finished inserting batch ${i}`);
  }
  const timeNow = Date().getTime();
  console.log(`${(timeNow - time) / 1000} seconds have passed`);
};

module.exports = generateTenMilSimilarListings;
