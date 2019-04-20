import Component from './Component';
// import GameEngine from '../GameEngine'; // cause socket duplication
export default class Player extends Component{
    constructor(id, x, y, name, size) {
        super(id,x,y,name, false, size);
        this.alive = true;
        super.control(true);
    }

    die() {
        this.alive = false;
    }

    getPosition() {
        return super.getPosition();
    }

    // render() {
    //     this.object.fillStyle=GameEngine.getColor().player;
    //     super.render();
    // }
}