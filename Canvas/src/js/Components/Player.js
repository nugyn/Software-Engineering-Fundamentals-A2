import {Component} from './Component';
import GameEngine from '../GameEngine';
export class Player extends Component{
    constructor(id,x,y,object, name) {
        super(id,x,y,object,name, false);
        this.alive = true;
        super.control(true);
    }

    die() {
        this.alive = false;
    }

    get status() {
        return {
            name: this.name,
            renderObject: this.object,
            x: this.x,
            y: this.y,
            size: this.size,
            alive: this.alive
        }
    }

    getPosition() {
        return super.getPosition();
    }

    render() {
        this.object.fillStyle=GameEngine.getColor().player;
        super.render();
    }



}