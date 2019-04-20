import Map from './Components/Map';
import { Driver } from './Components/Driver';
import io from 'socket.io-client';
import Player from './Components/Player';
import Component from './Components/Component';
const socket = io('http://localhost:8080');

export default class GameEngine { 
    constructor(canvas, width, height) {
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

    setup() {
        this.map.drawMap();
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

    render() {
        console.log(this.canvas);
        this.setup();

        socket.on("initPlayer", (player) => {
            var thisPlayer = new Player(player.id,player.x,player.y,player.name, 50);
            let controller = new Driver(thisPlayer, socket);
            console.warn(socket);
            controller.init();
            // socket.emit("move", controller.init());
        })

        // let components = gameplay.init();
        
        // socket.on("getPlayers", components => {
        //     socket.on("myPlayer", data => {
        //         console.log("hi");
        //         let gameplay = new Driver(this.map.renderObject(),data,components,socket);
        //         thisPlayer = gameplay.init();
        //         socket.emit("addPlayer", thisPlayer);
        //     })
        // })
        // this.setup();

        socket.on("update", playerList => {
            const drawTool =  this.canvas.getContext("2d");
            drawTool.clearRect(0,0,this.width, this.height);
            this.setup();
            // console.log(playerList);
            var players = [];
            for(var i in playerList) {
                let player = playerList[i];
                let component = new Component(player.id, player.x, player.y, player.name, player.npc,
                    50, drawTool);
                players.push(component);
                component.render();
            }
            console.log(players);
            // for(var i = 0; i < players.length; i++) {
            //     let player = players[i];
            //     drawTool.fillRect(player.x,player.y,50,50);
            //     drawTool.fillStyle = GameEngine.getColor().border;
            //     drawTool.font="13px Arial";
            //     drawTool.textAlign = "center";
            //     drawTool.textBaseline="middle";
            //     // drawTool.fillText(this.name,this.x + this.size/2,this.y + this.size/2);
            // }
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