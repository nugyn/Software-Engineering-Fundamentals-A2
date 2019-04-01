import { Player } from './Player';

export class Driver{
    constructor(renderObject) {
        this.renderObject = renderObject;
        this.component = [];
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
        }
    }

    init() {
        let player1 = new Player(0,0,this.renderObject,"Thang");
        player1.render();
        this.component.push(player1);
        this.keyListener(player1);
        return this.component;
    }
}