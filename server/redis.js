module.exports.findObjectByIdCached = function (db, redis, id, callback) {
  redis.get(title, (err, reply) => {
    if (err) callback(null);
    else if (reply) // Book exists in cache
    { callback(JSON.parse(reply)); } else {
      // Book doesn't exist in cache - we need to query the main database
      db.collection('similarlistings').findOne({
        id,
      }, (err, doc) => {
        if (err || !doc) callback(null);
        else {
          // Book found in database, save to cache and return to client
          redis.set(title, JSON.stringify(doc), () => {
            callback(doc);
          });
        }
      });
    }
  });
};
