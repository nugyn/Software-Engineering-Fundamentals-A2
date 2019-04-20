export class Driver{
    constructor(thisPlayer, socket) {
        // this.renderObject = renderObject;
        this.player = thisPlayer;
        this.socket = socket;
    }

    keyListener(component) {
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

    init() {
        // let thisPlayer = new Player(this.data.id,0,0,this.renderObject,this.data.name);
        // thisPlayer.render();
        // this.component.push(thisPlayer);
        this.keyListener(this.player);
        console.log(this.player.getPosition());
        return this.player.getPosition();
            // return this.component;
    }
}