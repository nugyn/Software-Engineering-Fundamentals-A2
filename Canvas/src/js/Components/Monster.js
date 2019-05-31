import Component from './Component';
export default class Monster extends Component {
    /* 
    Monster:
    Is a special type of component, which has basic performance of a component but
    also has the ability to move itself using AI. And kill players.
    */
    constructor(id, x, y, name, mapComponent, socket, drawTool, monsterColor) {
        super(id, x, y, name, false, mapComponent, socket, drawTool, monsterColor);
        this.alive = null;
        super.control(false);
        this.npc = true;
        this.socket = socket;
        this.automove();
    }

    getPosition() {
        /* 
        Return the current object's position.
        */
        return super.getPosition();
    }

    checkKill() {
        /* 
        Look through the player list, kill the player which share the same position
        with the monster.
        */
        for (var i in this.playerList) {
            let player = this.playerList[i];
            if (this.x == player.x && this.y == player.y && !player.npc) {
                this.socket.emit("kill", player);
            }
        }
    }
    automove() {
        /* 
        Random pattern move algorithm.
        */
        var patternA = [1,1,1,1,0,0,0,0,2,2,2,2,2,2,2,2,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,3,3,3,3,1,3,3,3,3,1,1,1,1,0,0,0,0];
        var patternB = [2,2,2,2,0,0,0,0,1,1,1,1,1,1,1,1,3,3,3,3,3,3,3,3,2,2,2,2,2,2,2,2,0,0,0,0,2,0,0,0,0,2,2,2,2,3,3,3,3];
        var self = this;
        var choices = Math.floor(Math.random() * Math.floor(2));
        var stepMove = (choices == 1) ? stepMove = [...patternA] : [...patternB];
        this.auto = setInterval(function () {
            var choice = stepMove.pop();
            if (choice == undefined) {
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
        }, 1000/4);
    }
    init() {
        /* 
        Create a socket listener, listen for movement of every player on the map, 
        and perform check kill
        */
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