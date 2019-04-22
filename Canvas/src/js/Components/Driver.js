export class Driver{
    constructor(thisPlayer, socket, touchInput) {
        // this.renderObject = renderObject;
        this.player = thisPlayer;
        this.socket = socket;
        this.touchInput = touchInput;
    }

    keyListener(component) {
        var self = this;
        window.onkeyup = function(e) {
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
            var player = component.setScore();
            if(player != null){
            self.socket.emit("score", player);
            }
            else{
                self.socket.emit("score", "No dice");
            }

        }
    }

    controller(component) {
        let keyList = this.touchInput;
        let self = this;
        /* Same order as key Listener */
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
        this.keyListener(this.player);
        this.controller(this.player);
        console.log(this.player.getPosition());
        return this.player.getPosition();
    }
}