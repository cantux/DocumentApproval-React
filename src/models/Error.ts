class ExtendableError extends Error {
    constructor(message: string) {
        super(message);
        this.name = this.constructor.name;
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, this.constructor);
        } else {
            this.stack = (new Error(message)).stack;
        }
    }
}

export default class GenericError extends ExtendableError {
    referralId: string;
    userAgent: string;
    url: string;
    errorDetailString: string;

    constructor(message: string, referralId: string, errorDetailString: string) {
        super(message);
        this.referralId = referralId;
        this.userAgent = JSON.stringify(window.navigator);
        this.url = JSON.stringify(window.location);
        this.errorDetailString = errorDetailString;
    }
}