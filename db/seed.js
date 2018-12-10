const mongoose = require('mongoose');
const listings = require('./listing');
const mockData = require('./mock-data');
require('dotenv').config();

const DB_NAME = process.env.DB_NAME;

mongoose.connect(`mongodb://localhost/${DB_NAME}`);
const db = mongoose.connection;

async function seedDb(data) {
  try {
    const results = await listings.insertMany(data);
    console.log(
      'done seeding database:\n',
      `inserted ${results.length} records`,
    );
    db.close();
  } catch (error) {
    console.log(
      'error seeding database\n',
      error,
    );
    db.close();
  }
}

seedDb(mockData);