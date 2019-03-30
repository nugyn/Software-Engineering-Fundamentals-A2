export class GameEngine { 
    constructor(canvas, width, height) {
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
        this.width = width;
        this.height = height;
        this.setResolution(canvas, width,height);
        this.object = canvas.getContext('2d');
    }

    static getColorPath() {
        return {
            path: "#77B6EA",
            block: "#37393A"
        }
    }

    setResolution(canvas,width,height) {
        canvas.width = width;
        canvas.height = height;
    }

    drawMap() {
        for (let row=0; row<this.grid.length; row++) {
            console.log(this.grid[row]);
            for(let i=0; i<this.grid[row].length; i++) {
                /* Define block width and height*/
                let bWidth = this.width/9;
                let bHeight = this.height/9;
                /* */
                this.object.fillStyle = (this.grid[row][i] == "1") ? 
                                        GameEngine.getColorPath().path : 
                                        GameEngine.getColorPath().block;

                this.object.fillRect(bWidth*i,bHeight*row,bWidth,bHeight);
                this.object.strokeRect(bWidth*i,bHeight*row,bWidth,bHeight);
            }
        }
    }

    render() {
        this.drawMap();
    }
}