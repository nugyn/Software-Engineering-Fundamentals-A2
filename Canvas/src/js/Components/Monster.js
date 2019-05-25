import Component from './Component';
export default class Player extends Component{
    constructor(id, x, y, name, mapComponent, socket, drawTool, monsterColor){
        super(id,x,y,name, false, mapComponent, socket, drawTool, monsterColor);
        this.alive = null;
        super.control(false);
        this.npc = true;
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
        var patternA = [
           1,1,1,1,
           0,0,0,0,
           2,2,2,2,2,2,2,2,
           0,0,0,0,0,0,0,0,
           1,1,1,1,1,1,1,1,
           3,3,3,3,
           1,
           3,3,3,3,
           1,1,1,1,
           0,0,0,0
        ]
        var patternB = [
            2,2,2,2,
            0,0,0,0,
            1,1,1,1,1,1,1,1,
            3,3,3,3,3,3,3,3,
            2,2,2,2,2,2,2,2,
            0,0,0,0,
            2,
            0,0,0,0,
            2,2,2,2,
            3,3,3,3
         ]

        var self = this;
        console.warn(stepMove);
        var choices = Math.floor(Math.random() * Math.floor(2));
        var stepMove = (choices == 1) ? stepMove = [...patternA] : [...patternB];
        // var time = 0;
        this.auto = setInterval(function () {
            // var choice = (time % 2 == 0) ? stepMove.pop() : stepMove.shift();
            var choice = stepMove.pop();
            if (choice == undefined) {
                // time += 1;
                choices = Math.floor(Math.random() * Math.floor(2));
                stepMove = (choices == 1) ? stepMove = [...patternA] : [...patternB];
            }
            switch(choice) {
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
            
        }, 1000/5);
    }
    init() {
        var self = this;
        this.socket.on("update", playerList => {
            self.playerList = playerList;
            self.checkKill();
        })
        this.socket.on("endGame", () => {
            clearInterval(this.auto);
        })
    }
}