import GameEngine from '../GameEngine';
import Global from '../Global';
export default class Map{
    constructor(canvas, socket) {
        this.grid = Global.getGrid();
        this.bSize = Global.getBSize();
        this.object = canvas.getContext('2d');
        this.socket = socket;
    }
    getInfo() {
        return {
            bSize: this.bSize,
            grid: this.grid
        }
    }
    drawMap() {
        /* Send map info to controller */
        this.socket.emit("mapInfo", this.getInfo());
        /* Draw the map */
        for (let row=0; row < this.grid.length; row++) {
            for(let i=0; i<this.grid[row].length; i++) {
                /* */
                this.object.fillStyle = (this.grid[row][i] == "1" || this.grid[row][i] == "2") ? 
                Global.getColor().path : 
                Global.getColor().block;

                this.object.fillRect(this.bSize*i,this.bSize*row,this.bSize,this.bSize);
                this.object.strokeStyle= Global.getColor().border;
                this.object.strokeRect(this.bSize*i,this.bSize*row,this.bSize,this.bSize);
            }
        }
    }

}