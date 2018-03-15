const mongo = require('mongodb');
let getSimilarListings = require('./haiDataGenerator').getSimilarListings

var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("seabnb");
  dbo.createCollection("similar-listings-v1", function(err, res) {
    if (err) throw err;
    console.log("Collection created!");
    db.close();
  });
});