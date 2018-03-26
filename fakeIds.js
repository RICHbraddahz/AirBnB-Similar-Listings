'use strict';
// Make sure to "npm install faker" first.
const Faker = require('faker');

const generateRandomId = (userContext, events, done) => {
  const id = Math.floor(Math.random() * 9999997);
  userContext.vars.id = id;
  done();
};

module.exports = {
  generateRandomId,
};
