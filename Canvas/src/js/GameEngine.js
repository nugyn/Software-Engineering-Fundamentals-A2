import Map from './Components/Map';
export default class GameEngine { 
    constructor(canvas, width, height) {
        this.player = [];
        this.width = width; 
        this.height = height;
        this.map = new Map(canvas,width,height);
        this.setResolution(canvas, width,height);
    }

    static getColor() {
        return {
            path: "#77B6EA",
            block: "#37393A"
        }
    }

    setResolution(canvas,width,height) {
        canvas.width = width;
        canvas.height = height;
    }
    
    get details() {
        return {
            mWdith: this.width,
            mHeight: this.height,
            bSize: this.bSize,
            // grid: Map.gridDetails()
        }
    }

    render() {
        this.map.drawMap();
    }
}