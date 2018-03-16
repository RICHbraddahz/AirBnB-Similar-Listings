const { generateTenMilSimilarListings } = require('./haiDataGenerator');
const { MongoClient } = require('mongodb');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'seabnb';

// Use connect method to connect to the server
console.log(`${url}/${dbName}`);
MongoClient.connect(`${url}/${dbName}`)
  .then((client) => {
    const db = client.db('similar-listings');
    const collection = db.collection('similar-listings');

    const startTime = new Date();
    console.log('| Starting seed.');
    console.log(`| Start time: ${startTime}`);

    generateTenMilSimilarListings(collection, startTime)
      .then(() => {
        console.log('done?');
        client.close();
      });
  })
  .catch((e) => {
    console.error(e);
  });

