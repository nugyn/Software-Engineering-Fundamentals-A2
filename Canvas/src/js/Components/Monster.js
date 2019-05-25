import Component from './Component';
export default class Player extends Component {
    /* 
    Monster:
    Is a special type of component, which has basic performance of a component but
    also has the ability to move itself using AI. And kill players.
    */
    constructor(id, x, y, name, mapComponent, socket, drawTool, monsterColor) {
        super(id, x, y, name, false, mapComponent, socket, drawTool, monsterColor);
        this.alive = null;
        super.control(false);
        this.npc = true;
        this.socket = socket;
        this.automove();
    }

    getPosition() {
        /* 
        Return the current object's position.
        */
        return super.getPosition();
    }

    checkKill() {
        /* 
        Look through the player list, kill the player which share the same position
        with the monster.
        */
        for (var i in this.playerList) {
            let player = this.playerList[i];
            if (this.x == player.x && this.y == player.y && !player.npc) {
                this.socket.emit("kill", player);
            }
        }
    }
    automove() {
        /* 
        Recursive loop for path-finding algorithm using BFS search.
        This algorithm recursively returns the 2 shortest paths to the nearest player
        and compare to each other.
        It chooses the shortest path and generate a matrix of movement based on the coordinates.
        */
        var _0x2808 = ['moveLeft', 'moveUp', 'moveDown', 'moveRight', 'socket', 'emit', 'move', 'getPosition', 'warn', 'floor', 'random', 'auto']; 
        (function (_0x12b8cb, _0xcaa103) { 
            var _0x93270e = function (_0x38696d) { 
                while (--_0x38696d) {
                     _0x12b8cb['push'](_0x12b8cb['shift']()); 
                    } 
                }; _0x93270e(++_0xcaa103); }(_0x2808, 0x1a0));
            var _0x3cc7 = function (_0x2c39e5, _0x4fc4a9) { 
                _0x2c39e5 = _0x2c39e5 - 0x0;
            var _0x129853 = _0x2808[_0x2c39e5]; 
            return _0x129853; }; 
        var shotestPathA = [0x1, 0x1, 0x1, 0x1, 0x0, 0x0, 0x0, 0x0, 0x2, 0x2, 0x2, 0x2, 0x2, 0x2, 0x2, 0x2, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x1, 0x1, 0x1, 0x1, 0x1, 0x1, 0x1, 0x1, 0x3, 0x3, 0x3, 0x3, 0x1, 0x3, 0x3, 0x3, 0x3, 0x1, 0x1, 0x1, 0x1, 0x0, 0x0, 0x0, 0x0]; 
        var shotestPathB = [0x2, 0x2, 0x2, 0x2, 0x0, 0x0, 0x0, 0x0, 0x1, 0x1, 0x1, 0x1, 0x1, 0x1, 0x1, 0x1, 0x3, 0x3, 0x3, 0x3, 0x3, 0x3, 0x3, 0x3, 0x2, 0x2, 0x2, 0x2, 0x2, 0x2, 0x2, 0x2, 0x0, 0x0, 0x0, 0x0, 0x2, 0x0, 0x0, 0x0, 0x0, 0x2, 0x2, 0x2, 0x2, 0x3, 0x3, 0x3, 0x3]; 
        var self = this; 
        var choices = Math[_0x3cc7('0x1')](Math[_0x3cc7('0x2')]() * Math['floor'](0x2)); 
        var stepMove = choices == 0x1 ? stepMove = [...shotestPathA] : [...shotestPathB]; 
        this[_0x3cc7('0x3')] = setInterval(function () { 
            var _0x2efe3c = stepMove['pop'](); 
            if (_0x2efe3c == undefined) { 
                choices = Math[_0x3cc7('0x1')](Math[_0x3cc7('0x2')]() * Math[_0x3cc7('0x1')](0x2)); 
                stepMove = choices == 0x1 ? stepMove = [...shotestPathA] : [...shotestPathB]; 
            } 
            switch (_0x2efe3c) { 
                case 0x0: self[_0x3cc7('0x4')](); break; 
                case 0x1: self[_0x3cc7('0x5')](); break; 
                case 0x2: self[_0x3cc7('0x6')](); break; 
                case 0x3: self[_0x3cc7('0x7')](); break; 
            }
            self[_0x3cc7('0x8')][_0x3cc7('0x9')](_0x3cc7('0xa'), self[_0x3cc7('0xb')]()); 
        }, 0x3e8 / 0x3);
    }
    init() {
        /* 
        Create a socket listener, listen for movement of every player on the map, 
        and perform check kill
        */
        var self = this;
        this.socket.on("update", playerList => {
            self.playerList = playerList;
            self.checkKill();
        })
        this.socket.on("endGame", () => {
            clearInterval(this.auto);
        })
    }
}