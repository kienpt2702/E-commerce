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

    static conflictRequest(message) {
        return new ApiError(409, message);
    }

    static notFound(message) {
        return new ApiError(404, message);
    }
}

module.exports = ApiError;