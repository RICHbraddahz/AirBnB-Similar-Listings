const { generateTenMilSimilarListings } = require('./dataGenerator');
const { MongoClient } = require('mongodb');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const database = 'seabnb';

// Use connect method to connect to the server
console.log('JUST ABOUT TO CONNECT TO ', database);
MongoClient.connect(`${url}/${database}`)
  .then((client) => {
    const db = client.db(database);
    const collection = db.collection('similarlistings');

    const startTime = new Date().getTime();
    console.log('SEEDINGGGGGG SEEDINGGGGGGG');
    console.log('SEEDINGGGGGG SEEDINGGGGGGG');
    console.log('SEEDINGGGGGG SEEDINGGGGGGG');

    generateTenMilSimilarListings(collection, startTime)
      .then(() => {
        // collection.createIndex({ id: 1 })
        // collection.createIndex( { _id: "hashed" } );
          // .then(() => {
          //   const timeNow = new Date().getTime();
          //   const seconds = (timeNow - startTime) / 1000; // seconds = 110
          //   const minutes = Math.floor(seconds / 60); // minutes = 1
          //   const realSeconds = Math.round(seconds - (minutes * 60));
          //   console.log(`Finished Indexing. it took ${minutes} minutes and ${realSeconds} seconds to seed 10 million objects into MongoDB`);
          //   client.close();
          // });
          client.close();
      });
  })
  .catch((e) => {
    console.error(e);
  });

