import Global from '../Global';
import { InvalidMoveException } from '../Exceptions/InvalidMoveException';
export default class Component {

    constructor(id, x, y, name, npc, mapComponent,drawTool, color) {
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
        this.score = 0;
    }

    getPosition() {
        return {
            id: this.id,
            x: this.x,
            y: this.y
        }
    }

    control(boolean) {
        this.controllable = boolean;
    }

    getPotentialMove(direction) {
        let potentialMove;
        switch(direction) {
            case 'up':
                potentialMove = this.y - this.size;
                break;
            case 'down':
                potentialMove = this.y + this.size;
                break;
            case 'left':
                potentialMove = this.x - this.size;
                break;
            case 'right':
                potentialMove = this.x + this.size;
                break;
        }
        let indX = (direction == 'left' || direction =='right') ? potentialMove/this.size : this.x/this.size;
        let indY = (direction == 'up' || direction =='down') ? potentialMove/this.size : this.y/this.size
        return this.grid[indY][indX];
    }

    logError(e) {
        if(e instanceof TypeError) {
            console.warn(e);
            console.warn("Can't move beyond the grid");
        } else {
            console.warn(e.getMessage());
        }
    }
    moveRight() {
        try{
            if(this.getPotentialMove('right') == 1) {
                this.x += this.size;
                console.warn(this.x);
                return true;
            } else {
                throw new InvalidMoveException(this.getPotentialMove('right'));
            }
        } catch (e){
            this.logError(e);
        }
    }

    moveLeft() {
        try{
            if(this.getPotentialMove('left') == 1) {
                this.x -= this.size;
                return true;
            } else {
                throw new InvalidMoveException(this.getPotentialMove('left'));
            }
        } catch (e){
            this.logError(e);
        }
    }

    moveUp() {
        try{
            if(this.getPotentialMove('up') == 1) {
                this.y -= this.size;
                return true;
            } else {
                throw new InvalidMoveException(this.getPotentialMove('up'));
            }
        } catch (e){
            this.logError(e);
        }
    }

    moveDown() {
        try{
            if(this.getPotentialMove('down') == 1) {
                this.y += this.size;
                return true;
            } else {
                throw new InvalidMoveException(this.getPotentialMove('down'));
            }
        } catch (e){
            this.logError(e);
        }
    }
    
   setScore(){
       this.score += 1;
       return this.score;
    }

    render(){
        // document.querySelector(".debug").innerHTML = "Player: x{" + this.x + "} y{" + this.y + "}";
        this.drawTool.fillStyle = this.color;
        this.drawTool.fillRect(this.x,this.y,this.size,this.size);
        this.drawTool.fillStyle = Global.getColor().name;
        this.drawTool.font="13px Arial";
        this.drawTool.textAlign = "center";
        this.drawTool.textBaseline="middle";
        this.drawTool.fillText(this.name,this.x + this.size/2,this.y + this.size/2);
    }
}