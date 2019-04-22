import Exception from './Exception';

export class InvalidMoveException extends Exception {
    constructor(e) {
        const message = "Invalid move, grid value has to be 1. Moving to " + e;
        super(message);
    }
}