import Global from '../Global';
import { InvalidMoveException } from '../Exceptions/InvalidMoveException';

export default class Component {
    /* 
    Component:
    Is a generalise of Player and Monster, This class acts as the main class
    for rendering and checking movement validation.
    */
    constructor(id, x, y, name, npc, mapComponent, socket, drawTool, color, alive) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.name = name;
        this.npc = npc;
        this.controllable = false;
        this.grid = mapComponent.grid;
        this.size = mapComponent.bSize;
        this.drawTool = drawTool;
        this.color = color;
        this.socket = socket;
        this.alive = alive;
    }

    mod(n,m) {
        /*
        Over-write the default mod calculation, which is a bug in javascript.
        */
        return ((n%m) + m)%m;
    }

    checkCrash(futurePosition) {
        /* 
        If the player is an npc, this function will not be performed, because NPC
        can move through the players.
        
        Else, it will calculate the future movement of the player and check if it crashes 
        with another player position.
        */
        if(this.npc) return false;
        var self = this;
        var crash = false;
        this.socket.on("update", playerList => {
            self.playerList = playerList
        })
        for(var i in self.playerList) {
            let player = self.playerList[i];
            if(player.id != self.id) {
                if(futurePosition.x == player.x && futurePosition.y == player.y && 
                    player.alive == true && player.npc == false) {
                    crash = true;
                    break;
                }
            }
        }
        return crash;
    }

    getPosition() {
        /* 
        Return the position, player id, x and y and its status.
        */
        return {
            id: this.id,
            x: this.x,
            y: this.y,
            alive: this.alive
        }
    }

    control(value) {
        /* 
        This will allows the component to be controllable.
        */
        this.controllable = value;
    }

    getPotentialMove(direction) {
        /* 
        This function perform a future prediction for player movement. If the 
        future position of a player is invalid (comparing to the Map Matrix)

        It will be fale.

        This function also check if 2 players crashing by calling checkCrash();
        */
        let futurePosition = {
            x: null,
            y: null
        };
        let currentPosition = {
            x: this.x/Global.getBSize(),
            y: this.y/Global.getBSize()
        }
        switch(direction) {
            case 'up':
                futurePosition.x = this.x;
                futurePosition.y = this.y - this.size;;
                break;
            case 'down':
                futurePosition.x = this.x;
                futurePosition.y = this.y + this.size;
                break;
            case 'left':
                futurePosition.x = this.x - this.size;
                futurePosition.y = this.y;
                break;
            case 'right':
                futurePosition.x = this.x + this.size;
                futurePosition.y = this.y;
                break;
        }
        let indX = futurePosition.x/this.size;
        let indY = futurePosition.y/this.size;
       
        if(this.grid[currentPosition.x][currentPosition.y] == 2) {
            indX = this.mod(indX,Global.getGrid()[0].length);
            indY = this.mod(indY,Global.getGrid().length);
        }
        let newPos = { 
            x: indX*this.size,
            y: indY*this.size
        }
        
        if(this.checkCrash(newPos) == true) {
            console.warn("cant move");
            return 0;
        }

        return this.grid[indY][indX];
    }

    logError(e) {
        /* 
        Log the error message for debug
        */
        if(e instanceof TypeError) {
            console.warn("Can't move beyond the grid");
        } else {
            console.warn(e.getMessage());
        }
    }
    moveRight() {
        /*
        Make the component move right, this will call check getPotentialMove().
        If It's an invalid move, it will throw an exception.
        */
        try{
            if(this.getPotentialMove('right') == 1) {
                this.x += this.size;
                console.warn(this.x);
                return true;
            } else if(this.getPotentialMove('right') == 2) {
                this.x += this.size;
                this.x = this.mod(this.x, Global.resolution());
            }
            else {
                throw new InvalidMoveException(this.getPotentialMove('right'));
            }
        } catch (e){
            this.logError(e);
        }
    }

    moveLeft() {
         /*
        Make the component move left, this will call check getPotentialMove().
        If It's an invalid move, it will throw an exception.
        */
        try{
            if(this.getPotentialMove('left') == 1) {
                this.x -= this.size;
                return true;
            } else if(this.getPotentialMove('left') == 2) {
                this.x -= this.size;
                this.x = this.mod(this.x, Global.resolution());
            } else {
                throw new InvalidMoveException(this.getPotentialMove('left'));
            }
        } catch (e){
            this.logError(e);
        }
    }

    moveUp() {
         /*
        Make the component move up, this will call check getPotentialMove().
        If It's an invalid move, it will throw an exception.
        */
        try{
            if(this.getPotentialMove('up') == 1) {
                this.y -= this.size;
                return true;
            } else if(this.getPotentialMove('up') == 2) {
                this.y -= this.size;
                this.y = this.mod(this.y, Global.resolution());
            } else {
                throw new InvalidMoveException(this.getPotentialMove('up'));
            }
        } catch (e){
            this.logError(e);
        }
    }

    moveDown() {
        /*
        Make the component move down, this will call check getPotentialMove().
        If It's an invalid move, it will throw an exception.
        */
        try{
            if(this.getPotentialMove('down') == 1) {
                this.y += this.size;
                return true;
            } else if(this.getPotentialMove('down') == 2) {
                this.y += this.size;
                this.y = this.mod(this.y, Global.resolution());
            } else {
                throw new InvalidMoveException(this.getPotentialMove('down'));
            }
        } catch (e){
            this.logError(e);
        }
    }

    render(){
        /* 
        Render player and align it to the matrix map.
        */
        if(this.alive || this.npc) {
            this.drawTool.fillStyle = this.color;
            this.drawTool.fillRect(this.x,this.y,this.size,this.size);
            this.drawTool.fillStyle = Global.getColor().name;
            this.drawTool.font="13px Arial";
            this.drawTool.textAlign = "center";
            this.drawTool.textBaseline="middle";
            this.drawTool.fillText(this.name,this.x + this.size/2,this.y + this.size/2);
        }
    }
}