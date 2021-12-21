const express = require('express');
const morgan = require('morgan');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/v1/errorController');
const userRouter = require('./routes/v1/userRoute');
const postRouter = require('./routes/v1/postRoute');

const app = express();

// 1) GLOBAL MIDDLEWARES

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Body Parser
app.use(express.json());

// Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 2) ROUTES
app.use('/api/v1/users', userRouter);
app.use('/api/v1/posts', postRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

// app.use(globalErrorHandler);

module.exports = app;
