/* 
ControllerJS:
A main class for rendering view. 
Its job is to switch between different views. 
And also initialise Driver and Player class.
*/
import io from 'socket.io-client';
import Player from './Components/Player';
import { Driver } from './Components/Driver';
import Global from './Global';

const socket = io(Global.getHost());
const register = document.querySelector("section.register");
const setup = document.querySelector("section.setup");
const waiting = document.querySelector("section.waiting");
const loading = document.querySelector(".loading");
const controller = document.querySelector(".controller");
const pname = document.querySelectorAll(".playerName");
let mapInfo = {}
var firstPlayer = false;
window.onload = function () {
    hide(controller);
}
/* Support functions */
function fadeOut(element) {
    var op = 1;  // initial opacity
    var timer = setInterval(function () {
        if (op <= 0.1){
            clearInterval(timer);
            element.style.display = 'none';
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.1;
    }, 50);
}

function fadeIn(element) {
    var op = 0.1;  // initial opacity
    element.style.display = 'block';
    var timer = setInterval(function () {
        if (op >= 1){
            clearInterval(timer);
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op += op * 0.1;
    }, 10);
}

function hide(element) {
    element.style.display = 'none';
}


function show(element) {
    if(element == setupMatch) {
        firstPlayer = true;
    }
    element.style.display = 'block';
}

function isEmpty(obj) {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return false;
    }

    return true;
}
let inputCheck = (e) => {
    if(e.target.value.length > 0) {
        joinBtn.disabled = false;
    } else {
        joinBtn.disabled = true;
    }
}

let sessionCheck = (e) => {
    if(e.target.value.length == 6) {
        btnConnect.disabled = false;
    } else {
        btnConnect.disabled = true;
    }
}
/* Join session view */
const session = document.querySelector(".session");
let sessionInput = document.querySelector("input[name='sessionID']");
let btnConnect = document.querySelector("button[name='connect']");
sessionInput.addEventListener("keyup", e => sessionCheck(e), false);
sessionInput.addEventListener("keydown", e => sessionCheck(e), false);
btnConnect.addEventListener("click", () => {
    console.log(sessionInput.value);
    socket.emit("checkSession", sessionInput.value);
    socket.on("sessionValid", () => {
        hide(session);
        socket.on("loadMap", data => {
            console.log(data);
            if(!isEmpty(data)) {
                /* If there is someone opens the map */
                Object.assign(mapInfo, data);
            } 
        })
    })
    socket.on("nosession", () => {
        alert("Invalid session id, please try again");
    });
}, false);

/* Register view */
let playerName = document.querySelector("input[name='playerName']");
let joinBtn = document.querySelector("button[name='join']");
let setupMatch = document.querySelector(".isFirst");
let playerSetting = document.querySelector(".playable");
let limit = document.querySelector(".limit");
let notplayable = false;

playerName.addEventListener("keyup", e => inputCheck(e), false);
playerName.addEventListener("keydown", e => inputCheck(e), false)

joinBtn.addEventListener("click", function (){
    fadeIn(loading);
    console.log(playerName.value);
    [...pname].map(each => each.innerHTML = playerName.value);
    if(!isEmpty(mapInfo)) {
        hide(register)
        show(setup);
        socket.emit("isPlayer", playerName.value);
        socket.on("matchInfo", data => {
            console.log("match info");
            console.log(data);
            if(data.playerIndex == 1) {
                /* If it's first player */
                show(setupMatch);
                show(playerSetting);
            } else if (data.playerIndex <= data.maxPlayer && data.playerIndex > 1){
                hide(setupMatch);
                show(playerSetting);
            } else {
                hide(playerSetting);
                notplayable = true;
                show(limit);
            }
        })
        socket.on("getPosition", data => {
            console.log(data);
            for(var i in data) {
                if(data[i] == true) {
                    console.log(pos.options.namedItem(i));  
                    pos.options.namedItem(i).disabled = true;
                } else {
                    pos.options.namedItem(i).selected = "selected";
                }
            }
        })
    } else {
        alert("There is no match existed");
    }
    fadeOut(loading);
}, false);

/* Setup view */
let maxP = document.querySelector("select[name='maxPlayer']");
let pos = document.querySelector("select[name='position']");
let continueBtn = document.querySelector("button[name='continue']");
continueBtn.addEventListener("click", function () {
    console.log(maxP.options[maxP.selectedIndex].value);
    if(firstPlayer == true) {
        socket.emit("setMaxPlayer", maxP.options[maxP.selectedIndex].value);
    }
    socket.emit("setPosition", pos.options[pos.selectedIndex].value);
    hide(setup);
    show(waiting);
    socket.on("initPlayer", (pack) => {
        /* 
            pack[0] = player; 
            pack[1] = playerList
        */
        var thisPlayer = new Player(pack[0].id,pack[0].x,pack[0].y,playerName.value,mapInfo, socket);

        let controller = new Driver(thisPlayer, socket, btnController);
        controller.init();
        myColor.style.background = pack[0].color;
        [...btnController].map(each => each.style.background = pack[0].color);
    })
})
/* Waiting view */
let myColor = document.querySelector('.myColor');
let leftArrow = document.querySelector(".leftArrow");
let rightArrow = document.querySelector(".rightArrow");
let upArrow = document.querySelector(".upArrow");
let downArrow = document.querySelector(".downArrow");
let btnController = [leftArrow, rightArrow, upArrow, downArrow];
let btnStart = document.querySelector("button[name='start']");

/* Listen for server to start the game */
socket.on("startAble", () => {
    btnStart.classList.remove("is-loading");
    if(firstPlayer == true) {
        btnStart.disabled = false;
        btnStart.innerHTML = "Start Game";
    } else {
        btnStart.innerHTML = "Waiting for the first player to start game";
    }
})

/* Listen for server to wait for players to join the game */
socket.on("wait", () => {
    btnStart.classList.add("is-loading");
    btnStart.disabled = true;
    btnStart.innerHTML = "Loading";
})

btnStart.addEventListener("click", function() {
    socket.emit("start");
})

/* Listen for server to show controller buttons */
socket.on("showController", () => {
    hide(waiting);
    console.warn(limit.style.display);
    if(!notplayable) {
        controller.style.display = 'grid';
    }
})
/* When game ends*/
let gameOver = document.querySelector(".gameOver");

socket.on("die", () => {
    gameOver.style.display = "flex";
})
/* If is a winner */
let winner = document.querySelector(".winner");
socket.on("winner", () => {
    winner.style.display = "flex";
})
/* Session host quit */
socket.on("sessionQuit", () => {
    if(!alert("Host quitted! Refreshing the page...")){
        window.location.reload();
    }
})
/* Auto full screen when click the controller */
controller.addEventListener("click", function() {
    var
          el = document.documentElement
        , rfs =
               el.requestFullScreen
            || el.webkitRequestFullScreen
            || el.mozRequestFullScreen
    ;
    rfs.call(el);
});