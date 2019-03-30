import {Component} from './Component';
import GameEngine from '../GameEngine';
export class Player extends Component{
    constructor(x,y,object, name) {
        super(x,y,object,name, false);
        this.alive = true;
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

    get getPosition() {
        return super.getPosition();
    }

    render() {
        this.object.globalCompositeOperation='destination-over';
        this.object.fillStyle=GameEngine.getColor().player;
        this.object.fillRect(this.x,this.y,this.size,this.size);
        // var ctx = document.querySelector("canvas").getContext("2d");
        // ctx.fillRect(0,0,150,150);
    }



}