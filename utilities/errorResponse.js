/**
 * @param message - A string of the error message
 * @param statusCode - The number of the status code.
 */
class ErrorResponse extends Error {
  constructor(message, statusCode){
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ErrorResponse;