import GameEngine from '../GameEngine';

export class Component {
    constructor(x,y, object, name, npc) {
        this.x = x;
        this.y = y;
        this.name = name;
        this.npc = npc;
        this.size = object.bSize;
        this.object = object.object;
        this.controllable = false;
    }

    getPosition() {
        return {
            x: this.x,
            y: this.y
        }
    }

    control(boolean) {
        this.controllable = boolean;
    }

    moveRight() {
        this.x += this.size;
    }

    moveLeft() {
        this.x -= this.size;
    }

    moveUp() {
        this.y -= this.size;

    }

    moveDown() {
        this.y += this.size;
    }

    render(){
        this.object.fillRect(this.x,this.y,this.size,this.size);
    }
}