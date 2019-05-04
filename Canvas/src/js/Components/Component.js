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
    }

    mod(n,m) {
        return ((n%m) + m)%m;
    }

    getPosition() {
        return {
            id: this.id,
            x: this.x,
            y: this.y
        }
    }

    control(value) {
        this.controllable = value;
    }

    getPotentialMove(direction) {
        let futurePosition = {
            x: null,
            y: null
        };
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
        console.log(indX + ":" + indY);
        if(this.grid[this.x/Global.getBSize()][this.y/Global.getBSize()] == 2) {
            indX = this.mod(indX,Global.getGrid()[0].length);
            indY = this.mod(indY,Global.getGrid().length);
        }
        console.log(indX + ":" + indY);
        return this.grid[indY][indX];
    }

    logError(e) {
        if(e instanceof TypeError) {
            console.warn(e);
            console.warn("Can't move beyond the grid");
        } else {
            console.log(e);
            console.warn(e.getMessage());
        }
    }
    moveRight() {
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