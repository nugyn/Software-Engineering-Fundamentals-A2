export default class Player {
    constructor(name,x,y) {
        this.name = name;
        this.x = x;
        this.y = y;
        this.alive = true;
    }

    die() {
        this.alive = false;
    }

    render() {
        
    }

}