export default class Exception {
    /* 
    Exception:
    Manage all of the exception throw since Javascript doesn't provide one.
    */
    constructor(message) {
        this.message = message;
    }

    getMessage() {
        return this.message;
    }
}