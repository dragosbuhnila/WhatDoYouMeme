class WrongCredentialsError extends Error {
    constructor() {
        super();
        this.message = 'Wrong username or password';
        this.name = 'WrongCredentialsError';
        this.code = 401;
    }
}

class UnauthenticatedError extends Error {
    constructor() {
        super();
        this.message = 'Unauthenticated';
        this.name = 'UnauthenticatedError';
        this.code = 401;
    }
}

export { WrongCredentialsError, UnauthenticatedError };