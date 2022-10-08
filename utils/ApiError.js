class ApiError extends Error {
    constructor(status, message) {
        super(message);

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ApiError);
        }

        this.status = status;
    }

    static badRequest(message) {
        return new ApiError(400, message);
    }
}

module.exports = ApiError;