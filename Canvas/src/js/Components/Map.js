import GameEngine from '../GameEngine';
import Global from '../Global';
export default class Map{
    constructor(canvas, width,height) {
        this.grid = [
            [1,1,1,1,1,1,1,1,1],
            [1,0,0,0,1,0,0,0,1],
            [1,0,0,0,1,0,0,0,1],
            [1,0,0,0,1,0,0,0,1],
            [1,1,1,1,1,1,1,1,1],
            [1,0,0,0,1,0,0,0,1],
            [1,0,0,0,1,0,0,0,1],
            [1,0,0,0,1,0,0,0,1],
            [1,1,1,1,1,1,1,1,1],
        ];
        this.bSize = width/this.grid[0].length;
        this.object = canvas.getContext('2d');
    }
    getInfo() {
        return {
            bSize: this.bSize,
            grid: this.grid
        }
    }
    drawMap() {
        for (let row=0; row < this.grid.length; row++) {
            for(let i=0; i<this.grid[row].length; i++) {
                /* */
                this.object.fillStyle = (this.grid[row][i] == "1") ? 
                Global.getColor().path : 
                Global.getColor().block;

                this.object.fillRect(this.bSize*i,this.bSize*row,this.bSize,this.bSize);
                this.object.strokeStyle= Global.getColor().border;
                this.object.strokeRect(this.bSize*i,this.bSize*row,this.bSize,this.bSize);
            }
        }
    }

}