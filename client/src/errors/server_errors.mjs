class InternalServerError extends Error {
    constructor() {
        super();
        this.message = 'Server Failed to Process Request';
        this.name = 'InternalServerError';
        this.code = 500;
    }
}

class UnexpectedError extends Error {
    constructor() {
        super();
        this.message = 'Unexpected Error of undefined type and behaviour';
        this.name = 'UnexpectedError';
        this.code = 520;
    }
}

class BodyFormatError extends Error {
    constructor() {
        super();
        this.message = 'The body parameters are not in the correct format';
        this.name = 'BodyFormatError';
        this.code = 422;
    }
}

export { InternalServerError, UnexpectedError, BodyFormatError };