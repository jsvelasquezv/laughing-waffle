'use-strict'

import BodyParser from 'body-parser';
import mongoose from "mongoose";

global.fetch = require('node-fetch');
const express = require('express');
const config = require('./config');
const morgan = require('morgan');
const babelPolyfill = require("babel-polyfill");

mongoose.connect(config.mongo.uri, { useNewUrlParser: true }, async () => {
  console.log(`MongoDB its connected in ${config.mongo.host}:${config.mongo.port}/${config.mongo.db}`);
});

mongoose.connection.on('error', err => {
  console.error(`→ ${err.message}`)
})

const app = express();

app.use(morgan(':status | :method :url :response-time ms'))
app.use(BodyParser.urlencoded({ extended: false }));
app.use(BodyParser.json());

app.use('/api/v1', require('./api/v1/router').default);

module.exports = app;