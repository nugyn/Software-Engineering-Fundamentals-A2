import { Player } from './Player';

export class Driver{
    constructor(renderObject, thisPlayer, component,socket) {
        this.renderObject = renderObject;
        this.component = component;
        this.data = thisPlayer;
        this.socket = socket;

    }

    keyListener(component) {
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
            this.socket.emit("playerMove", component.getPosition());
        }
    }

    init() {
        let thisPlayer = new Player(this.data.id,0,0,this.renderObject,this.data.name);
        thisPlayer.render();
        // this.component.push(thisPlayer);
        this.keyListener(thisPlayer);
        return thisPlayer;
            // return this.component;
    }
}