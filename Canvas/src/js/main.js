import io from 'socket.io-client';
const socket = io('http://localhost:8080');
import GameEngine from './GameEngine';
let main = new GameEngine(document.querySelector("canvas"), 450, 450);
main.render();
socket.emit("msg", {
    msg: "hello mom"
})