/**
 * Custom Application Error Class
 * Extends the built-in Error class with additional properties
 */
class AppError extends Error {
  /**
   * @param {string} message - Error message
   * @param {number} statusCode - HTTP status code
   * @param {boolean} isOperational - Whether the error is operational
   */
  constructor(message, statusCode = 500, isOperational = true) {
    super(message);
    
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = isOperational;
    
    // Capture stack trace
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Common error factory methods
 */
class ErrorFactory {
  static badRequest(message = 'Bad Request') {
    return new AppError(message, 400);
  }

  static unauthorized(message = 'Unauthorized') {
    return new AppError(message, 401);
  }

  static forbidden(message = 'Forbidden') {
    return new AppError(message, 403);
  }

  static notFound(message = 'Not Found') {
    return new AppError(message, 404);
  }

  static conflict(message = 'Conflict') {
    return new AppError(message, 409);
  }

  static validationError(message = 'Validation Error') {
    return new AppError(message, 422);
  }

  static internalServer(message = 'Internal Server Error') {
    return new AppError(message, 500);
  }

  static serviceUnavailable(message = 'Service Unavailable') {
    return new AppError(message, 503);
  }
}

export { AppError, ErrorFactory };