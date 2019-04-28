import Component from './Component';
export default class Player extends Component{
 constructor(id, x, y, name, mapComponent){
    super(id,x,y,name, false, mapComponent);
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