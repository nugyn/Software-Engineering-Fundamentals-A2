import Component from './Component';
export default class Player extends Component{
    constructor(id, x, y, name, mapComponent, socket, drawTool, monsterColor, playerList){
        super(id,x,y,name, false, mapComponent, socket, drawTool, monsterColor);
        this.alive = null;
        super.control(false);
        this.npc = true;
        this.playerList = playerList;
        this.socket = socket;
        this.automove();        
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
    automove() {
        var stepMove = [
            0,0,0,0,0,1,1,1,1,1,0,0,0,0,
            2,2,2,2,3,3,3,3,0,1,1,1,2,2,
            3,3,3,3
        ]
        var self = this;
        console.warn(stepMove);
        setInterval(function () {
            // var choices = Math.floor(Math.random() * Math.floor(4));
            for(var i in stepMove) {
                switch(i) {
                    case 0:
                        self.moveLeft();
                        break;
                    case 1:
                        self.moveUp();
                        break;
                    case 2:
                        self.moveDown();
                        break;
                    case 3:
                        self.moveRight();
                        break;
                }
                self.socket.emit("move", self.getPosition());
            }
        }, 2000);
    }
    init() {
        var self = this;
        this.socket.on("update", playerList => {
            self.playerList = playerList;
            self.checkKill();
        })
    }
}