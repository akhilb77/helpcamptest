class ExpressError extends Error {
    constructor(message, statusCode) {
        super(); // Call the parent Error constructor
        this.message = message;
        this.statusCode = statusCode;
    }
}

module.exports = ExpressError;
