import Exception from './Exception';

export class InvalidMoveException extends Exception {
    /* 
    Invalid Move Exception
    A special type of exception for invalid movement.
    */
    constructor(e) {
        const message = "Invalid move, grid value has to be 1. Moving to " + e;
        super(message);
    }
}