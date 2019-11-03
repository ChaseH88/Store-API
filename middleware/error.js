const errorHandler = (err, req, res, next) => {
  // Log error to console
  console.log(err.stack);
  res.status(err.statusCode || 500).json({
    success: false,
    error: err.message || 'Sorry, something went wrong.'
  });
}

module.exports = errorHandler;