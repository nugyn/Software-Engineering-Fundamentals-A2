var express = require('express');
var app = express();
var cors = require('cors')
var serv = require('http').Server(app);
const PORT = 8080;
var playerList = [];
app.use(cors())

app.get('/',(req,res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.use('/dist', express.static(__dirname + '/public/dist'));

serv.listen(PORT);

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

// var socket = require('socket.io-client')('http://localhost:8080');
var io = require('socket.io')(serv, {log:false, origins:'*:*'});

console.log(`[+] Game is running on ${PORT}`);
io.sockets.on('connection', socket => {
    var PlayerId = socket.client.id;
    console.log(`Player: ${PlayerId} joined the game`);
    playerList.push({
        id: PlayerId,
        name: "Player" + Math.floor(Math.random() * 10)
    });
    socket.on("msg", data => {
        console.log("msg: " + data.msg)
    })
    socket.on("disconnect", () => {
        console.log(`Player: ${PlayerId} left the game`);
        playerList
    })
    console.log("Number of player: " + playerList.length);
})

// socket.on('connect', s => {
      
//         console.log(s);
    
//         // socket.on("disconnect", () => {
//         //     console.log(`Player: ${PlayerId} left the game`);
//         // });
// });

