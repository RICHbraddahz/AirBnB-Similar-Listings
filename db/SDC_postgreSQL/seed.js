const pgp = require('pg-promise')();

const cn = {
  host: 'localhost',
  port: 5432,
  database: 'seabnb',
  user: 'student',
  password: 'student',
};

const db = pgp(cn);

const cs = new pgp.helpers.ColumnSet(
  ['id', 'title', 'type', 'price', 'numRatings', 'avgStars', 'thumbnailImage'],
  { table: 'list' },
);

const insert = pgp.helpers.insert(data, cs);

db.tx('massive-insert', t => {
  return t.sequence(index => {
      return getNextData(t, index)
          .then(data => {
              if (data) {
                  const insert = pgp.helpers.insert(data, cs);
                  return t.none(insert);
              }
          });
  });
})
  .then(data => {
      // COMMIT has been executed
      console.log('Total batches:', data.total, ', Duration:', data.duration);
  })
  .catch(error => {
      // ROLLBACK has been executed
      console.log(error);
  });