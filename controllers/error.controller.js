const AppError = require('../helpers/appError');

const handleCastError22P02 = () =>
  new AppError(
    'The data type sent does not match the expected one❤️',
    400
  );

const handleEmailError = () =>
  new AppError(
    'The email is already in use. Please change it.🌐',
    400
  );

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.error('ERROR 🎭', err);
    res.status(500).json({
      status: 'fail',
      message: 'Something went terribly wrong!',
    });
  }
};

const globalErrorHandler = (
  err,
  req,
  res,
  next
) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'fail';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  }

  if (process.env.NODE_ENV === 'production') {
    let error = err;
    console.log(error);
    if (error.parent?.code === '22P02')
      error = handleCastError22P02();

    if (error.parent?.code === '23505') {
      error = handleEmailError();
    }

    sendErrorProd(error, res);
  }

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
    error: err,
  });
};

module.exports = globalErrorHandler;
