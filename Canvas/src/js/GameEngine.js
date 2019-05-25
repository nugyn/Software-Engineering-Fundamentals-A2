import Map from './Components/Map';
import { Driver } from './Components/Driver';
import io from 'socket.io-client';
import Player from './Components/Player';
import Monster from './Components/Monster';
import Global from './Global';
import Component from './Components/Component';
const socket = io(Global.getHost());

export default class GameEngine { 
    /* 
    GameEngine:
    Its job is to render board, monster and all the players on the host side.
    It also switchs between different views on the host side.
    */
    constructor(canvas, width, height) {
        this.width = width; 
        this.height = height;
        this.canvas = canvas;
        this.map = new Map(this.canvas, socket);
        this.setResolution(canvas, width,height);
    }

    setup() {
        /* Draw the map */
        this.map.drawMap();
    }

    setResolution(canvas,width,height) {
        /* Set the resolution of the view, setting from Global.js*/
        canvas.width = width;
        canvas.height = height;
    }

    render() {
        /* Render the game on the host */
        let sessionView = document.querySelector(".session");
        let session = document.querySelector(".sessionInput");
        let joinlink = document.querySelector(".joinlink");
        let qr = document.querySelector(".qr");
        let status = document.querySelector(".status");
        let winnerPanel = document.querySelector(".winner");
        const drawTool =  this.canvas.getContext("2d");

        this.setup();
        var self = this;
        /* let server know that this is a view*/
        socket.emit("isSession");

        /* get Session from the server */
        socket.on("getSession", sessionID => {
            session.value = sessionID;
        })

        /* Setup join link and draw QR code */
        joinlink.href = Global.getHost() + "/join";
        qr.src = qr.src + Global.getHost() + "/join";
        
        /* When the game is startable */
        socket.on("startAble", () => {
            status.innerHTML = "Waiting for <strong>the first player</strong> to start the game"
        })

        /* Wait for all players to join */
        socket.on("wait", () => {
            status.innerHTML = "Wating for other players to join..."
        })

        /* When server broadcasts the gameStart */
        socket.on("gameStart", () =>{
            sessionView.style.display = 'none';
        });

        /* When server broadcasts make monster */
        socket.on("makeMonster", (monster) => {
            console.warn("success!!!");
            var monster = new Monster(monster.id, monster.x, monster.y, monster.name, 
                self.map.getInfo(), socket, drawTool, monster.color);
            monster.init();
        })

        /* When server broadcasts to update */
        socket.on("update", playerList => {
            let playerHTML = document.querySelector(".players");
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
                players.push(component);
                component.render();
            }
        });

        /* When the game ends */
        socket.on("endGame", (winner) => {
            let winnerPlayer = document.querySelector(".playerName");
            let winnerColor = document.querySelector(".winnerInfo");

            winnerPanel.style.display = "block";
            winnerPlayer.innerHTML = winner.name;
            winnerColor.style.background = winner.color;
        })

    }

}