import express from 'express';
import http from 'http';
import SocketIO from 'socket.io';
import cors from 'cors';
import Global from './src/js/Global';
/* TODO: When end game turn off controller */

/* Global */
const app = express();
const serv = http.Server(app);
const PORT = process.env.PORT || Global.getPort();
let playerList = {};
let SOCKET_LIST = {};
let mapInfo = {};
let maxPlayer = 2;
let playerIndex = 0;
let numberOfPlayer = 0;
let positionTaken = {
    "top-left": false, 
    "top-right": false, 
    "bottom-left": false, 
    "bottom-right": false,
};

var showController = false;

/* Hosting */

app.get('/',(req,res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/join',(req,res) => {
    res.sendFile(__dirname + '/public/controller.html');
});

app.use('/dist', express.static(__dirname + '/public/dist'));

/* Cors setting */

app.use(cors())
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

/* SocketIO */
var io = new SocketIO(serv, {
    log: false, origins: '*:*'
})

io.on('connection', socket => {
    console.log(`${socket.client.id} joined`);
    socket.on("mapInfo", data => {
        Object.assign(mapInfo, data);
    });
    SOCKET_LIST[socket.client.id] = socket;
    /* Init player to activate driver.js*/
    socket.on("isPlayer", playerName => {
        playerIndex += 1;
        socket.emit("matchInfo", {maxPlayer: maxPlayer, playerIndex: playerIndex});
        socket.emit("getPosition", positionTaken);
        socket.on("setMaxPlayer", maxP => {
            maxPlayer = maxP;
            console.log(`[+] Changed default maxPlayer to ${maxPlayer}`);
        })
        var thisPlayer = {
            id: socket.client.id,
            x: 0,
            y: 0,
            name: playerName,
            npc: false,
            color: Global.getColor().player
        }
        var pos = null; 
        socket.on("setPosition", position => {
            numberOfPlayer += 1;
            positionTaken[position] = true;
            pos = position;
            switch(pos) {
                case "top-left":
                    thisPlayer.x = 0;
                    thisPlayer.y = 0;
                    thisPlayer.color = Global.getColor().playerColor[0];
                    break;
                case "top-right": 
                    thisPlayer.x = Global.getBSize() * (Global.getGrid()[0].length - 1);
                    thisPlayer.y = 0;
                    thisPlayer.color = Global.getColor().playerColor[1];
                    break;
                case "bottom-left":
                    thisPlayer.x = 0;
                    thisPlayer.y = Global.getBSize() * (Global.getGrid()[0].length - 1);
                    thisPlayer.color = Global.getColor().playerColor[2];
                    break;
                case "bottom-right":
                    thisPlayer.x = Global.getBSize() * (Global.getGrid()[0].length - 1);
                    thisPlayer.y = Global.getBSize() * (Global.getGrid()[0].length - 1);
                    thisPlayer.color = Global.getColor().playerColor[3];
                    break;
            }
            SOCKET_LIST[thisPlayer.id] = socket;
            playerList[thisPlayer.id] = thisPlayer;
            socket.emit('initPlayer', thisPlayer)
            console.log(`Player: ${thisPlayer.id} joined the game as ${playerName}`);
        })
         /* Player moves */
        socket.on("move", usr => {
            /* socketID must match, just send back socketID for dataID*/
            console.log(usr);
            playerList[usr.id].x = usr.x;
            playerList[usr.id].y = usr.y;
        })
        socket.on("start", () => {
            showController = true;
        }) 
         /* Player leaves the game*/
        socket.on("disconnect", () => {
            playerIndex -= 1;
            numberOfPlayer -= 1;
            positionTaken[pos] = false;
            delete SOCKET_LIST[thisPlayer.id];
            delete playerList[thisPlayer.id];
        })
        if(numberOfPlayer < maxPlayer) {
            showController = false;
        }
    });
})

/* Run server*/
serv.listen(PORT, () => {
    console.log(`Server is running on port: ` + PORT);
});

/* Update game per 0.25 second */
setInterval(function(){
    for(var i in SOCKET_LIST){
        var socket = SOCKET_LIST[i];
        if(numberOfPlayer == maxPlayer) {
            socket.emit("startAble");
        }
        if(showController) {
            socket.emit("showController");
        }
        socket.emit("update",playerList);
        socket.emit("loadMap", mapInfo);
    }
},1000/25);