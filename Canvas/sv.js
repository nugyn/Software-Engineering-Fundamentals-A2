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
/* Hosting */

app.get('/',(req,res) => {
    res.sendFile(__dirname + '/public/index.html');
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
    /* Init player to activate driver.js*/
    var thisPlayer = {
        id: socket.client.id,
        x: 0,
        y: 0,
        name: "Test",
        npc: false
    }
    SOCKET_LIST[thisPlayer.id] = socket;
    playerList[thisPlayer.id] = thisPlayer;
    socket.emit('initPlayer', thisPlayer)
    console.log(`Player: ${thisPlayer.id} joined the game`);

    /* Player moves */
    socket.on("move", usr => {
        /* socketID must match, just send back socketID for dataID*/
        console.log(usr);
        playerList[usr.id].x = usr.x;
        playerList[usr.id].y = usr.y;
    })

    /* Player leaves the game*/
    socket.on("disconnect", () => {
        console.log(playerList);
        delete SOCKET_LIST[thisPlayer.id];
        delete playerList[thisPlayer.id];
    })
})

/* Run server*/
serv.listen(PORT, () => {
    console.log(`Server is running on port: ` + PORT);
});

/* Update game per 0.25 second */
setInterval(function(){
    for(var i in SOCKET_LIST){
        var socket = SOCKET_LIST[i];
        socket.emit('update',playerList);
    }
},1000/2);