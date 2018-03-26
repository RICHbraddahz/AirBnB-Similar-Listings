const nr = require('newrelic');
const mongoose = require('mongoose');
const express = require('express');
// const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const listings = require('../db/listing').query;

const PORT = parseInt(process.env.PORT, 10);
const DB_NAME = process.env.DB_NAME;
const HOST = process.env.HOST;
const PROXY_PORT = parseInt(process.env.PROXY_PORT, 10);

const app = express();

const PUBLIC_DIR = path.join(__dirname, '../public');

// app.use(morgan('dev'));
app.use(cors(`http://${HOST}:${PROXY_PORT}`))
// app.use('/listings/:id', express.static(PUBLIC_DIR));
app.use(express.static(PUBLIC_DIR));
app.use(bodyParser.json());

// app.get('/listings/:id/similar_listings', async ({ params: { id } }, res) => {
//   try {
//     const similarListings = await listings.getSimilarListingsAsync(id);
//     res.send(similarListings);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send(error);
//   }
// });

app.get('/listings/:id/similar_listings', (req, res) => {
  const { id } = req.params;
  listings(id).then((data) => {
    res.send(data);
  });
});

mongoose.connect('mongodb://localhost/seabnb');
const server = app.listen(PORT, HOST, () => console.log(`listening on ${HOST}:${PORT}`));
