import Component from './Component';
export default class Player extends Component{
 constructor(id, x, y, name, mapComponent, socket){
    super(id,x,y,name, true, mapComponent, socket);
    this.alive = true;
    super.control(false);
}

die() {
    this.alive = false;
}

getPosition() {
    return super.getPosition();
}
}