import Component from './Component';
export default class Player extends Component{
    constructor(id, x, y, name, mapComponent, socket, drawTool, monsterColor, playerList){
        super(id,x,y,name, false, mapComponent, socket, drawTool, monsterColor);
        this.alive = null;
        super.control(false);
        this.npc = true;
        this.playerList = playerList;
        this.checkKill();
        this.socket = socket;
    }

    getPosition() {
        return super.getPosition();
    }

    checkKill() {
        for (var i in this.playerList) {
            let player = this.playerList[i];
            if(this.x == player.x && this.y == player.y && !player.npc) {
                this.socket.emit("kill", player);
            }
        }
    }
}