const pgp = require('pg-promise')({
  capSQL: true // generate capitalized SQL 
});
const { generateOneSimilarListing } = require('./dataGenerator');

const db = pgp('postgres://localhost:5432/seabnb');

const cs = new pgp.helpers.ColumnSet(
  ['id', 'title', 'type', 'numbeds', 'price', 'numratings', 'avgstars', 'thumbnailimage'],
  { table: 'similarlistings' },
);

function getNextData(t, pageIndex) {
  let data = null;
  if (pageIndex < 1000) {
    data = [];
    for (let i = 0; i < 10000; i += 1) {
      const idx = (pageIndex * 10000) + i; // to insert unique product names
      data.push(generateOneSimilarListing(idx));
    }
    console.log(`just finished inserting batch ${pageIndex}`);
  }
  return Promise.resolve(data);
}

console.log('starting to seed seed seedddddddd');
console.log('starting to seed seed seedddddddd');

db.tx('massive-insert', t => t.sequence(index => getNextData(t, index)
  .then((data) => {
    if (data) {
      const insert = pgp.helpers.insert(data, cs);
      return t.none(insert);
    }
  })))
  .then((data) => {
    const seconds = data.duration / 1000;
    const minutes = Math.floor(seconds / 60);
    const actualSeconds = Math.round(seconds - (minutes * 60));
    console.log('Total batches:', data.total, ', Duration:');
    console.log(`it took ${minutes} minutes and ${actualSeconds} seconds`);
  })
  .catch((error) => {
    console.log(error);
  });

