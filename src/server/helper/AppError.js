import httpStatus from 'http-status';

/**
 * @extends Error
 */
class ExtendableError extends Error {
  constructor(message, status) {
    super(message);
    this.message = message;
    this.name = this.constructor.name;
    this.status = status;
    Error.captureStackTrace(this, this.constructor.name);
  }
}

/**
 * Class representing an API error.
 * @extends ExtendableError
 */
class APIError extends ExtendableError {
  /**
   * Creates an API error.
   * @param {string} message - Error message.
   * @param {number} status - HTTP status code of error.
   */
  constructor(message, status = httpStatus.INTERNAL_SERVER_ERROR) {
    super(message, status);
    this.name = 'APIError';
  }
}

/**
 * Class representing an MySQL error.
 * @extends ExtendableError
 */
class MySQLError extends ExtendableError {
  /**
   * Creates an API error.
   * @param {string} message - Error message.
   * @param {number} status - HTTP status code of error.
   */
  constructor(message = 'Backend Error', status = httpStatus.INTERNAL_SERVER_ERROR) {
    super(message, status);
    this.name = 'MySQLError';
  }
}

/**
 * Class representing an Token error
 * @extends ExtendableError
 */
 class GetTokenError extends ExtendableError {
  /**
   * Creates an API error.
   * @param {string} message - Error message.
   * @param {number} status - HTTP status code of error.
   */
  constructor(message = 'Cannot get Token. Please try again!', status = httpStatus.INTERNAL_SERVER_ERROR) {
    super(message, status);
    this.name = 'GetTokenError';
  }
}


export default {
  APIError,
  MySQLError,
  GetTokenError
};
