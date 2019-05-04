import Component from './Component';
// import GameEngine from '../GameEngine'; // cause socket duplication
export default class Player extends Component{
    constructor(id, x, y, name, mapComponent, socket) {
        super(id,x,y,name, false, mapComponent, socket);
        this.alive = true;
        super.control(true);
    }

    die() {
        this.alive = false;
    }

    getPosition() {
        return super.getPosition();
    }
}