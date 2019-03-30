import Map from './Components/Map';
import { Driver } from './Components/Driver';

export default class GameEngine { 
    constructor(canvas, width, height) {
        this.player = [];
        this.width = width; 
        this.height = height;
        this.canvas = canvas;
        this.map = new Map(canvas,width,height);
        this.setResolution(canvas, width,height);
    }

    static getColor() {
        return {
            path: "#77B6EA",
            block: "#37393A",
            player: "#A6B1E1",
            monster: "#A5243D",
            border: "#000"
        }
    }

    async setup() {
        await this.map.drawMap();
    }

    setResolution(canvas,width,height) {
        canvas.width = width;
        canvas.height = height;
    }
    
    get details() {
        return {
            mWdith: this.width,
            mHeight: this.height,
            bSize: this.map.details().bSize,
        }
    }

    async render() {
        let gameplay = new Driver(this.map.renderObject());
        let players = gameplay.init();
        this.animate(players);
    }

    async animate(players) {
        requestAnimationFrame(this.animate.bind(this, players));
        this.canvas.getContext("2d").clearRect(0,0,this.width, this.height);
        this.setup();
        for(let i = 0; i < players.length; i++) { 
            players[i].render();
        }
    }
}