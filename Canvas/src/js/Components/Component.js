import GameEngine from '../GameEngine';

export class Component {
    constructor(x,y, object, name, npc) {
        this.x = x;
        this.y = y;
        this.name = name;
        this.npc = npc;
        this.size = object.bSize;
        this.object = object.object;
    }

    get getPosition() {
        return {
            x: this.x,
            y: this.y
        }
    }

    moveLeft() {
        this.x += this.size;
    }

    moveRight() {
        this.x -= this.size;
    }
}