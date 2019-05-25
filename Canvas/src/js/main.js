/* 
Main function link DOM with the Game Engine
*/
import GameEngine from './GameEngine';
import Global from './Global';
let main = new GameEngine(document.querySelector("canvas"), Global.resolution(), Global.resolution());
main.render();