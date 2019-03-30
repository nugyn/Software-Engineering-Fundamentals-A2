import GameEngine from '../GameEngine';
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
    renderObject() {
        return {
            object: this.object,
            bSize: this.bSize
        }
    }
    async drawMap() {
        for (let row=0; row < this.grid.length; row++) {
            for(let i=0; i<this.grid[row].length; i++) {
                /* */
                this.object.fillStyle = (this.grid[row][i] == "1") ? 
                                        GameEngine.getColor().path : 
                                        GameEngine.getColor().block;

                this.object.fillRect(this.bSize*i,this.bSize*row,this.bSize,this.bSize);
                this.object.strokeStyle= GameEngine.getColor().border;
                this.object.strokeRect(this.bSize*i,this.bSize*row,this.bSize,this.bSize);
            }
        }
    }

    get details() {
        return {
            grid: this.grid,
            bSize: this.bSize
        }
    }

}