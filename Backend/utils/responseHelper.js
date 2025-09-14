/**
 * Standard API response helper
 * Ensures consistent response format across all endpoints
 */

/**
 * Send standardized success response
 * @param {Object} res - Express response object
 * @param {number} statusCode - HTTP status code
 * @param {Object} data - Response data
 */
const sendResponse = (res, statusCode, data) => {
  const response = {
    success: statusCode < 400,
    timestamp: new Date().toISOString(),
    ...data
  };

  return res.status(statusCode).json(response);
};

/**
 * Send paginated response
 * @param {Object} res - Express response object
 * @param {number} statusCode - HTTP status code
 * @param {Array} data - Array of data
 * @param {Object} pagination - Pagination info
 * @param {string} message - Response message
 */
const sendPaginatedResponse = (res, statusCode, data, pagination, message = 'Success') => {
  return sendResponse(res, statusCode, {
    message,
    data,
    pagination: {
      currentPage: pagination.current,
      totalPages: pagination.pages,
      totalItems: pagination.total,
      itemsPerPage: data.length,
      hasNext: pagination.current < pagination.pages,
      hasPrev: pagination.current > 1
    }
  });
};

/**
 * Send error response
 * @param {Object} res - Express response object
 * @param {number} statusCode - HTTP status code
 * @param {string} message - Error message
 * @param {Object} errors - Additional error details
 */
const sendErrorResponse = (res, statusCode, message, errors = null) => {
  const response = {
    success: false,
    message,
    timestamp: new Date().toISOString()
  };

  if (errors) {
    response.errors = errors;
  }

  return res.status(statusCode).json(response);
};

/**
 * Send validation error response
 * @param {Object} res - Express response object
 * @param {Array} errors - Validation errors
 */
const sendValidationError = (res, errors) => {
  const formattedErrors = errors.map(error => ({
    field: error.path || error.param,
    message: error.msg,
    value: error.value
  }));

  return sendErrorResponse(res, 422, 'Validation failed', formattedErrors);
};

export { 
  sendResponse, 
  sendPaginatedResponse, 
  sendErrorResponse, 
  sendValidationError 
};