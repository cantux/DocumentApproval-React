class ExtendableError extends Error {
    constructor(message: string) {
      super(message);
      Object.setPrototypeOf(this, ExtendableError.prototype);
      this.name = this.constructor.name;
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

    public dump = () => {
      return {
        name: this.name,
        message: this.message,
        stack: this.stack,
        referralId: this.referralId,
        userAgent: this.userAgent,
        url: this.url,
        errorDetailString: this.errorDetailString
      }
    }
}
