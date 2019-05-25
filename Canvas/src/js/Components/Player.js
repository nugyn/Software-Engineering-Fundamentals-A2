import Component from './Component';
export default class Player extends Component{
    /* 
    Player:
    Has all of the basic functions of a component, but can die and be controllable
    by driver.
    */
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