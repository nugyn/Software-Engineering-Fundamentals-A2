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
/* TODO: Refresh the position of players somehow for each move. 
 *
 *
*/
console.log(`[+] Game is running on ${PORT}`);

io.sockets.on('connection', socket => {

        var thisPlayer = {
            id: socket.client.id,
            name: "Player" + Math.floor(Math.random() * 10)
        }

    socket.emit("myPlayer", thisPlayer);

        console.log(`Player: ${thisPlayer.id} joined the game`);

        console.log("Number of player: " + playerList.length);

    socket.on("addPlayer", player => {
        playerList.push(player);
        console.log(playerList);
    })

    socket.emit("getPlayer", playerList);

    socket.on("playerMove", data => {
        playerList = playerList.map(player => {
            if(player.id == data.id) {
                player.x = data.x;
                player.y = data.y;
            }
        })
        socket.emit("getPlayer", playerList);
    })

    socket.on("disconnect", () => {
        playerList = playerList.filter(player=> player.id !== thisPlayer.id);
        console.log(`Player: ${thisPlayer.id} left the game`);
        console.log("Number of player: " + playerList.length);
    })
    

})
