export class Driver{
    /* 
    Driver:
    Acts as an input listener for every device including touch screen and keyboards.
    */
    constructor(thisPlayer, socket, touchInput) {
        this.player = thisPlayer;
        this.socket = socket;
        this.touchInput = touchInput;
        this.moves = [];
    }

    keyListener(component) {
        /*
        Listen to user's keyboard input.
        */
        var self = this;
        window.onkeyup = function(e) {
            console.log(self.socket);
            var key = e.keyCode ? e.keyCode : e.which;
            switch(key) {
                case 37:
                    /* left arrow */
                    component.moveLeft();
                    break;
                case 39:
                    /* right arrow */
                    component.moveRight();
                    break;
                case 38:
                    /* up arrow */
                    component.moveUp();
                    break;
                case 40:
                    /* down arrow */
                    component.moveDown();
                    break;
            }
            self.socket.emit("move", component.getPosition());

        }
    }

    controller(component) {
        /* 
        Listen to touch input from mobile.
        */
        let keyList = this.touchInput;
        let self = this;
        keyList[0].onclick = function() {
            component.moveLeft();
            self.socket.emit("move", component.getPosition());
        }
        keyList[1].onclick = function() {
            component.moveRight();
            self.socket.emit("move", component.getPosition());
        }
        keyList[2].onclick = function() {
            component.moveUp();
            self.socket.emit("move", component.getPosition());
        }
        keyList[3].onclick = function() {
            component.moveDown();
            self.socket.emit("move", component.getPosition());
        }
    }


    init() {
        /* 
        Init the object, and start listening to both inputs.
        */
        this.keyListener(this.player);
        this.controller(this.player);
        console.log(this.player.getPosition());
        return this.player.getPosition();
    }
}