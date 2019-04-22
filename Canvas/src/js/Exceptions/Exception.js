export default class Exception {
    constructor(message) {
        this.message = message;
    }

    getMessage() {
        return this.message;
    }
}