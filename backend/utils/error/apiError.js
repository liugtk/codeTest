function APIError(message, errorCode = 500) {
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.message = message;
    this.errorCode = errorCode;
};

require('util').inherits(APIError, Error);

module.exports = APIError;