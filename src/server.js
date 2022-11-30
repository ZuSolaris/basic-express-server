'use strict';
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const PORT = process.env.PORT || 3002;
const logger = require('./middleware/logger');
const notFound = require('./handlers/404');
const errorHandler = require('./handlers/500');


const app = express();


app.use(cors());

app.use(logger);

app.get('/', logger, (req, res, next) => {
res.status(200).send('Hello World');
});

app.get('/person', (req,res,next) => {
  res.status(200).json({'name': req.query.name});
});

// app.get('/personPath/:individual', (req,res,next) => {
//   res.status(200).send(`Hello ${req.params.individual}`);
// });

app.get('/bad', (req, res, next) => {
  throw new Error('We ran into an issue!');
});

app.use('*', notFound);
app.use(errorHandler);

function start() {
app.listen(PORT, () => console.log('Up on PORT', PORT));
}

module.exports = { start, app };
