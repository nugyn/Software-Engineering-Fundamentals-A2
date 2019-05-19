import Map from './Components/Map';
import { Driver } from './Components/Driver';
import io from 'socket.io-client';
import Player from './Components/Player';
import Monster from './Components/Monster';
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
        let sessionView = document.querySelector(".session");
        let session = document.querySelector(".sessionInput");
        let joinlink = document.querySelector(".joinlink");
        let qr = document.querySelector(".qr");
        let status = document.querySelector(".status");
        let winnerPanel = document.querySelector(".winner");
        this.setup();
        var self = this;
        socket.emit("isSession"); /* let server know that this is a view*/
        socket.on("getSession", sessionID => {
            session.value = sessionID;
        })
        joinlink.href = Global.getHost() + "/join";
        qr.src = qr.src + Global.getHost() + "/join";
        socket.on("startAble", () => {
            status.innerHTML = "Waiting for <strong>the first player</strong> to start the game"
        })
        socket.on("wait", () => {
            status.innerHTML = "Wating for other players to join..."
        })
        socket.on("gameStart", () =>{
            sessionView.style.display = 'none';
        });
        socket.on("update", playerList => {
            let playerHTML = document.querySelector(".players");
            const drawTool =  this.canvas.getContext("2d");
            drawTool.clearRect(0,0,this.width, this.height);
            this.setup();
            playerHTML.innerHTML = '';
            var players = [];
            for(var i in playerList) {
                let player = playerList[i];
                /* Create players in waiting area */
                var newPlayer = document.createElement('div');
                newPlayer.className = "playerInfo";
                newPlayer.style.background = player.color;
                playerHTML.appendChild(newPlayer);
                /* Render player */
                let component = new Component(player.id, player.x, player.y, player.name, player.npc,
                    self.map.getInfo(), socket, drawTool, player.color, player.alive);
                console.log(component);
                players.push(component);
                component.render();
            }
            console.log(players);
        });
        socket.on("endGame", (winner) => {
            let winnerPlayer = document.querySelector(".playerName");
            let winnerColor = document.querySelector(".winnerInfo");

            winnerPanel.style.display = "block";
            winnerPlayer.innerHTML = winner.name;
            winnerColor.style.background = winner.color;
        })

    }

}