import express from 'express';
import http from 'http';
import SocketIO from 'socket.io';
import cors from 'cors';
import Player from './src/js/Components/Player'; // this cause duplicated session

/* Global */
const app = express();
const serv = http.Server(app);
const PORT = process.env.PORT || 8080;
let playerList = {};
let SOCKET_LIST = {};
let mapInfo = {};
let maxPlayer = 2;
let playerIndex = 0;
let positionTaken = {
    "top-left": false, 
    "top-right": false, 
    "bottom-left": false, 
    "bottom-right": false,
};
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
        var pos; 
        socket.on("setPosition", position => {
            positionTaken[position] = true;
            pos = position;
        })
        var thisPlayer = {
            id: socket.client.id,
            x: 0,
            y: 0,
            name: playerName,
            npc: false
        }
        SOCKET_LIST[thisPlayer.id] = socket;
        playerList[thisPlayer.id] = thisPlayer;
        socket.emit('initPlayer', thisPlayer)
        console.log(`Player: ${thisPlayer.id} joined the game as ${playerName}`);
         /* Player moves */
        socket.on("move", usr => {
            /* socketID must match, just send back socketID for dataID*/
            console.log(usr);
            playerList[usr.id].x = usr.x;
            playerList[usr.id].y = usr.y;
        })
         /* Player leaves the game*/
        socket.on("disconnect", () => {
            playerIndex -= 1;
            positionTaken[pos] = false;
            delete SOCKET_LIST[thisPlayer.id];
            delete playerList[thisPlayer.id];
        })
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
        socket.emit("update",playerList);
        socket.emit("loadMap", mapInfo);
    }
},1000/25);