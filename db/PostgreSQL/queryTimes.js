/* eslint-disable no-await-in-loop */
const pgp = require('pg-promise')({
  capSQL: true, // generate capitalized SQL
});
const dateMath = require('date-arithmetic');

const db = pgp('postgres://localhost:5432/seabnb');

const startId = process.env.startId || 0;
const endId = process.env.endId || 10000000;
const idCount = process.env.idCount || 20;

const average = array => (array.reduce((acc, val) => acc + val)) / array.length;

const runBenchmark = async () => {
  const startTime = new Date();
  console.log('/* -----------------------');
  console.log('| Starting benchmark.');
  console.log('| Testing: MongoDB with id as index ');
  console.log(`| Start time: ${startTime}`);
  console.log('+ ------------------------');

  const readTimes = [];

  for (let i = 0; i < 10000; i += 1) {
    const readStartTime = new Date();
    const randomNum = Math.floor(Math.random() * 10000000);
    try {
      const users = await db.any(`SELECT * FROM similarlistings WHERE id = ${randomNum}`, [true]);
      let readTime = dateMath.diff(readStartTime, new Date(), 'seconds', true);
      readTimes.push(readTime);
      console.log(`| Found id ${randomNum} in ${readTime} seconds`);
    }
    catch (e) {
      console.error(e);
    }
  }

  const endTime = new Date();
  console.log('+ -----------------------');
  console.log('| Completed benchmark.');
  console.log(`| Start time: ${startTime}`);
  console.log('| End time: ', endTime);
  console.log(`| Elapsed time: ${dateMath.diff(startTime, endTime, 'seconds', true)} seconds`);
  console.log(`| Average read time: ${average(readTimes)} seconds`);
  console.log('\\* ----------------\\rm/--');
};

runBenchmark();
