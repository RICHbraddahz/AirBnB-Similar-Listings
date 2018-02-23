const faker = require('faker');
const fs = require('fs');

// get a random number between min(inclusive) and max(non-inclusive).
// [decimalPlaces]: optional. default to 0(integer) if not provided
const getRandomNum = (min, max, decimalPlaces) => {
  decimalPlaces = decimalPlaces || 0;
  let multiplier = Math.pow(10, decimalPlaces);
  let minAdj = min * multiplier;
  let maxAdj = ((max - 1) * multiplier) + 1;

  let randomNumAdj = Math.floor(Math.random() * (maxAdj - minAdj)) + minAdj
  return randomNumAdj / multiplier;
};

// pick a random item from an array
const pickRandomItem = array => {
  return array[getRandomNum(0, array.length)];
};

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

const generateSimilarListings = (settings) => {
  let similarListings = [];

  for (let i = 0; i < settings.similarListingsPerId; i++) {
    let id = getRandomNum(settings.id.min, settings.id.max);

    let similarListing = {
      id: id,

      url: `/listings/${id}`,

      title: faker.lorem.words(getRandomNum(
        settings.title.minWords,
        settings.title.maxWords
      )),

      type: pickRandomItem(
        settings.type.options
      ),

      numBeds: getRandomNum(
        settings.numBeds.min,
        settings.numBeds.max
      ),

      price: getRandomNum(
        settings.price.min,
        settings.price.max
      ),

      numRatings: getRandomNum(
        settings.numRatings.min,
        settings.numRatings.max
      ),

      avgStars: getRandomNum(
        settings.avgStars.min,
        settings.avgStars.max,
        settings.avgStars.decimalPlaces
      ),

      thumbnailImage: `https://picsum.photos/` +
                      `${settings.thumbnailImage.width}/` +
                      `${settings.thumbnailImage.height}` +
                      `?image=${id}`,
    };
    similarListings.push(similarListing);
  }
  return similarListings;
};

const generateListings = (settings) => {
  let documents = [];
  for (let id = settings.id.min; id < settings.id.max; id++) {
    let document = {
      id: id,
      similarListings: generateSimilarListings(settings),
    };
    array.push(document);
  }
  return documents;
};

const createAndWriteToFile = (settings) => {
  let data = generateListings(settings);
  let filename = 'mock-data.js';

  fs.writeFile(filename, JSON.stringify(data), (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log('file saved!');
  })
}

createAndWriteToFile(settings);