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
let SESSION_LIST = {};
let mapInfo = {};
let maxPlayer = 2;
let playerIndex = 0;
let numberOfPlayer = 0;

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
    let positionTaken = {
        "top-left": false, 
        "top-right": false, 
        "bottom-left": false, 
        "bottom-right": false,
    };
    console.log(`${socket.client.id} joined`);
    socket.on("isSession", () => {
        var sessionID = Math.floor(Math.random() * 800000) + 100000;
        SESSION_LIST[sessionID] = {};
        socket.emit("getSession", sessionID);
        socket.on("mapInfo", data => {
          SESSION_LIST[sessionID].mapInfo = data
        });
        SESSION_LIST[sessionID].socketio = socket;
        // SESSION_LIST[sessionID].socket = socket;
        SESSION_LIST[sessionID].maxPlayer = maxPlayer;
        SESSION_LIST[sessionID].playerIndex = playerIndex;
        SESSION_LIST[sessionID].positionTaken = positionTaken;
        SESSION_LIST[sessionID].numberOfPlayer = numberOfPlayer;
        SESSION_LIST[sessionID].playerList = {};
        SESSION_LIST[sessionID].drivers = {};
        SESSION_LIST[sessionID].showController = false;
        socket.on("disconnect", () => {
            delete SESSION_LIST[sessionID]
        });
    }); /* is SESSION */

    socket.on("checkSession", sessionID => {
        console.log("checking session")
        var found = false;
        for(var i in SESSION_LIST) {
            if(i == sessionID && SESSION_LIST[sessionID].showController == false) {
                found = true;
                console.log("session found!");
                socket.emit("sessionValid");
                break;
            }
        }
        if(found) {
            console.log(sessionID);
            console.log(SESSION_LIST[sessionID])
            SESSION_LIST[sessionID].drivers[socket.client.id] = socket;
            socket.emit("loadMap", SESSION_LIST[sessionID].mapInfo);
            /* Init player to activate driver.js*/
            socket.on("isPlayer", (playerName) => {
                SESSION_LIST[sessionID].playerIndex += 1;
                socket.emit("matchInfo", {maxPlayer: SESSION_LIST[sessionID].maxPlayer, 
                    playerIndex: SESSION_LIST[sessionID].playerIndex});
                socket.emit("getPosition", SESSION_LIST[sessionID].positionTaken);
                socket.on("setMaxPlayer", maxP => {
                    SESSION_LIST[sessionID].maxPlayer = maxP;
                    console.log(`[+] Changed default maxPlayer for session ${sessionID} to ${maxPlayer}`);
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
                    SESSION_LIST[sessionID].numberOfPlayer += 1;
                    pos = position;
                    SESSION_LIST[sessionID].positionTaken[pos] = true;
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
                    SESSION_LIST[sessionID].playerList[thisPlayer.id] = thisPlayer;
                    socket.emit('initPlayer', thisPlayer)
                    console.log(`Player: ${thisPlayer.id} from ${sessionID} joined the game as ${playerName}`);
                })
                /* Player moves */
                socket.on("move", usr => {
                    /* socketID must match, just send back socketID for dataID*/
                    SESSION_LIST[sessionID].playerList[usr.id].x = usr.x;
                    SESSION_LIST[sessionID].playerList[usr.id].y = usr.y;
                })
                socket.on("start", () => {
                    SESSION_LIST[sessionID].showController = true;
                }) 
                /* Player leaves the game*/
                socket.on("disconnect", () => {
                    SESSION_LIST[sessionID].playerIndex -= 1;
                    SESSION_LIST[sessionID].numberOfPlayer -= 1;
                    SESSION_LIST[sessionID].positionTaken[pos] = false;
                    delete  SESSION_LIST[sessionID].socket;
                    delete  SESSION_LIST[sessionID].playerList[thisPlayer.id];
                })
                if(SESSION_LIST[sessionID].numberOfPlayer <  SESSION_LIST[sessionID].maxPlayer) {
                    SESSION_LIST[sessionID].showController = false;
                }
            }); /* end isplayer */
        } else {
            socket.emit("nosession")
        }
    }); /* end checkSession*/

});
/* Run server*/
serv.listen(PORT, () => {
    console.log(`Server is running on: ` + Global.getHost());
});

/* Update game per 0.25 second */
setInterval(function(){
    for(var i in SESSION_LIST){
        var showController = SESSION_LIST[i].showController;
        var playerList = SESSION_LIST[i].playerList;
        var socketSession = SESSION_LIST[i].socketio; /* Map view */
        var socketDriver = SESSION_LIST[i].drivers; /* Mobile view */
        if(SESSION_LIST[i].numberOfPlayer == SESSION_LIST[i].maxPlayer) {
            for(var i in socketDriver) {
                var socketioDriver = socketDriver[i]
                socketioDriver.emit("startAble");
                socketSession.emit("startAble");
            }
        } else {
            for(var i in socketDriver) {
                var socketioDriver = socketDriver[i]
                socketioDriver.emit("wait");
                socketSession.emit("wait");
            }
        }
        if(showController == true) {
            for(var i in socketDriver) {
                var socketioDriver = socketDriver[i]
                socketioDriver.emit("showController");
                socketSession.emit("gameStart");
            }
        }
        socketSession.emit("update",playerList);
        // socket.emit("loadMap", SESSION_LIST[i].mapInfo);
    }
},1000/25);