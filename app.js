const express = require('express');
const morgan = require('morgan');

const app = express();

// 1) Global Middlewares

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

module.exports = app;
