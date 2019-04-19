import Map from './Components/Map';
import { Driver } from './Components/Driver';
import io from 'socket.io-client';
const socket = io('http://localhost:8080');

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
        // let components = gameplay.init();
        
        socket.on("getPlayers", components => {
            socket.on("myPlayer", data => {
                console.log("hi");
                let gameplay = new Driver(this.map.renderObject(),data,components,socket);
                thisPlayer = gameplay.init();
                socket.emit("addPlayer", thisPlayer);
            })
        })
        this.setup();

        socket.on("updateAll", components => {
            this.canvas.getContext("2d").clearRect(0,0,this.width, this.height);
            this.setup();
            console.log(components);
            for(var i = 0; i < components.length; i++) {
                components[i].render();
            }
        })
        // this.animate();
    }

    // async animate() {
    //     requestAnimationFrame(this.animate.bind(this));
    //     this.canvas.getContext("2d").clearRect(0,0,this.width, this.height);
    //     this.setup();
    //     // for(let i = 0; i < components.length; i++) { 
    //     //     components[i].render();
    //     // }
    // }
}