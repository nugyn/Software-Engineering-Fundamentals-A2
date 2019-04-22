import Map from './Components/Map';
import { Driver } from './Components/Driver';
import io from 'socket.io-client';
import Player from './Components/Player';
import Global from './Global';
import Component from './Components/Component';
const socket = io(Global.getHost());

export default class GameEngine { 
    constructor(canvas, width, height) {
        this.width = width; 
        this.height = height;
        this.canvas = canvas;
        this.map = new Map(this.canvas, socket);
        this.setResolution(canvas, width,height);
    }

    setup() {
        this.map.drawMap();
    }

    setResolution(canvas,width,height) {
        canvas.width = width;
        canvas.height = height;
    }

    render() {
        this.setup();
        var self = this;
        
        // socket.on("initPlayer", (player) => {
        //     var thisPlayer = new Player(player.id,player.x,player.y,player.name,self.map.getInfo());
        //     let controller = new Driver(thisPlayer, socket);
        //     controller.init();
        // })
        // let pScore = document.querySelector(".pScore");
        // socket.on("playerScore", score => {
        //     console.log(pScore);
        //     console.log(score);
        //     pScore.innerHTML = score;
        // })
        socket.on("update", playerList => {
            const drawTool =  this.canvas.getContext("2d");
            drawTool.clearRect(0,0,this.width, this.height);
            this.setup();
            var players = [];
            for(var i in playerList) {
                let player = playerList[i];
                let component = new Component(player.id, player.x, player.y, player.name, player.npc,
                    self.map.getInfo(), drawTool, player.color);
                console.log(component);
                players.push(component);
                component.render();
            }
            console.log(players);
        })

    }


}