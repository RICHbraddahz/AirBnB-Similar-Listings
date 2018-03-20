const generateOneSimilarListing = require('./haiDataGenerator').generateOneSimilarListing;
const MongoClient = require('mongodb').MongoClient;
const _ = require('ramda');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length; // 8

const time = new Date().getTime();

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} finished`);
  });
} else {
  seedDB();
  console.log(`Worker ${process.pid} started`);
}


function seedDB() {
  MongoClient.connect('mongodb://localhost/').then((client) => {
    const db = client.db('recs');
    const collection = db.collection('testing');

    let count = parseInt(10000000 / numCPUs);
    const size = 20000;

    async function insertBulk() {
      const ops = _.range(0, size).map(id => ({ insertOne: { document: { ...generateOneSimilarListing(id), rid: id * Math.random() } } }));

      await collection.bulkWrite(ops, { ordered: false });
      count -= size;
      if (count > 0) {
        insertBulk();
      } else {
        console.log('done in ', (new Date().getTime() - time) / 1000, 's :3 ^_^ <3 <(^_^<)');
        client.close();
        process.exit();
      }
    }

    insertBulk();
  });
}
