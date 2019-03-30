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

    setResolution(canvas,width,height) {
        canvas.width = width;
        canvas.height = height;
    }

    render() {
        this.object.fillRect(30,30,100,100);
        this.object.fillStyle="green";
    }

    drawMap() {

    }
}