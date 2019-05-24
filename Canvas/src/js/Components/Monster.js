import Component from './Component';
export default class Player extends Component{
    constructor(id, x, y, name, mapComponent){
        super(id,x,y,name, false, mapComponent);
        this.alive = true;
        super.control(false);
        this.npc = true;
    }

    getPosition() {
        return super.getPosition();
    }
}