const express = require('express');
const morgan = require('morgan');

const AppError = require('./helpers/appError');
const globalErrorHandler = require('./controllers/error.controller');

const routerUser = require('./routes/usersRoutes.routes');
const controllerRepair = require('./routes/repairRoutes.routes');

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

app.use('/api/v1/users', routerUser);
app.use('/api/v1/repairs', controllerRepair);

app.all('*', (req, res, next) => {
  return next(
    new AppError(
      `cannot find ${req.originalUrl} on this server!`,
      404
    )
  );
});

app.use(globalErrorHandler);

module.exports = app;
