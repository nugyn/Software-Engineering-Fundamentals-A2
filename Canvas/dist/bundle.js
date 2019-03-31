(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Component = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _GameEngine = require('../GameEngine');

var _GameEngine2 = _interopRequireDefault(_GameEngine);

var _InvalidMoveException = require('../Exceptions/InvalidMoveException');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Component = exports.Component = function () {
    function Component(x, y, object, name, npc) {
        _classCallCheck(this, Component);

        this.x = x;
        this.y = y;
        this.name = name;
        this.npc = npc;
        this.size = object.bSize;
        this.object = object.object;
        this.controllable = false;
        this.grid = object.grid;
    }

    _createClass(Component, [{
        key: 'getPosition',
        value: function getPosition() {
            return {
                x: this.x,
                y: this.y
            };
        }
    }, {
        key: 'control',
        value: function control(boolean) {
            this.controllable = boolean;
        }
    }, {
        key: 'getPotentialMove',
        value: function getPotentialMove(direction) {
            var potentialMove = void 0;
            switch (direction) {
                case 'up':
                    potentialMove = this.y - this.size;
                    break;
                case 'down':
                    potentialMove = this.y + this.size;
                    break;
                case 'left':
                    potentialMove = this.x - this.size;
                    break;
                case 'right':
                    potentialMove = this.x + this.size;
                    break;
            }
            var indX = direction == 'left' || direction == 'right' ? potentialMove / this.size : this.x / this.size;
            var indY = direction == 'up' || direction == 'down' ? potentialMove / this.size : this.y / this.size;
            return this.grid[indY][indX];
        }
    }, {
        key: 'logError',
        value: function logError(e) {
            if (e instanceof TypeError) {
                console.warn("Can't move beyond the grid");
            } else {
                console.warn(e.getMessage());
            }
        }
    }, {
        key: 'moveRight',
        value: function moveRight() {
            try {
                if (this.getPotentialMove('right') == 1) {
                    this.x += this.size;
                } else {
                    throw new _InvalidMoveException.InvalidMoveException(this.getPotentialMove('right'));
                }
            } catch (e) {
                this.logError(e);
            }
        }
    }, {
        key: 'moveLeft',
        value: function moveLeft() {
            try {
                if (this.getPotentialMove('left') == 1) {
                    this.x -= this.size;
                } else {
                    throw new _InvalidMoveException.InvalidMoveException(this.getPotentialMove('left'));
                }
            } catch (e) {
                this.logError(e);
            }
        }
    }, {
        key: 'moveUp',
        value: function moveUp() {
            try {
                if (this.getPotentialMove('up') == 1) {
                    this.y -= this.size;
                } else {
                    throw new _InvalidMoveException.InvalidMoveException(this.getPotentialMove('up'));
                }
            } catch (e) {
                this.logError(e);
            }
        }
    }, {
        key: 'moveDown',
        value: function moveDown() {
            try {
                if (this.getPotentialMove('down') == 1) {
                    this.y += this.size;
                } else {
                    throw new _InvalidMoveException.InvalidMoveException(this.getPotentialMove('down'));
                }
            } catch (e) {
                this.logError(e);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            document.querySelector(".debug").innerHTML = "Player: x{" + this.x + "} y{" + this.y + "}";
            this.object.fillRect(this.x, this.y, this.size, this.size);
        }
    }]);

    return Component;
}();

},{"../Exceptions/InvalidMoveException":6,"../GameEngine":7}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Driver = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Player = require("./Player");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Driver = exports.Driver = function () {
    function Driver(renderObject) {
        _classCallCheck(this, Driver);

        this.renderObject = renderObject;
        this.component = [];
    }

    _createClass(Driver, [{
        key: "keyListener",
        value: function keyListener(component) {
            window.onkeyup = function (e) {
                var key = e.keyCode ? e.keyCode : e.which;
                switch (key) {
                    case 37:
                        /* left arrow */
                        component.moveLeft();
                        break;
                    case 39:
                        /* right arrow */
                        component.moveRight();
                        break;
                    case 38:
                        /* up arrow */
                        component.moveUp();
                        break;
                    case 40:
                        /* down arrow */
                        component.moveDown();
                        break;
                }
            };
        }
    }, {
        key: "init",
        value: function init() {
            var player1 = new _Player.Player(0, 0, this.renderObject, "Thang");
            player1.render();
            this.component.push(player1);
            this.keyListener(player1);
            return this.component;
        }
    }]);

    return Driver;
}();

},{"./Player":4}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _GameEngine = require('../GameEngine');

var _GameEngine2 = _interopRequireDefault(_GameEngine);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Map = function () {
    function Map(canvas, width, height) {
        _classCallCheck(this, Map);

        this.grid = [[1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 0, 0, 0, 1, 0, 0, 0, 1], [1, 0, 0, 0, 1, 0, 0, 0, 1], [1, 0, 0, 0, 1, 0, 0, 0, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 0, 0, 0, 1, 0, 0, 0, 1], [1, 0, 0, 0, 1, 0, 0, 0, 1], [1, 0, 0, 0, 1, 0, 0, 0, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1]];
        this.bSize = width / this.grid[0].length;
        this.object = canvas.getContext('2d');
    }

    _createClass(Map, [{
        key: 'renderObject',
        value: function renderObject() {
            return {
                object: this.object,
                bSize: this.bSize,
                grid: this.grid
            };
        }
    }, {
        key: 'drawMap',
        value: async function drawMap() {
            for (var row = 0; row < this.grid.length; row++) {
                for (var i = 0; i < this.grid[row].length; i++) {
                    /* */
                    this.object.fillStyle = this.grid[row][i] == "1" ? _GameEngine2.default.getColor().path : _GameEngine2.default.getColor().block;

                    this.object.fillRect(this.bSize * i, this.bSize * row, this.bSize, this.bSize);
                    this.object.strokeStyle = _GameEngine2.default.getColor().border;
                    this.object.strokeRect(this.bSize * i, this.bSize * row, this.bSize, this.bSize);
                }
            }
        }
    }]);

    return Map;
}();

exports.default = Map;

},{"../GameEngine":7}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Player = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Component2 = require('./Component');

var _GameEngine = require('../GameEngine');

var _GameEngine2 = _interopRequireDefault(_GameEngine);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Player = exports.Player = function (_Component) {
    _inherits(Player, _Component);

    function Player(x, y, object, name) {
        _classCallCheck(this, Player);

        var _this = _possibleConstructorReturn(this, (Player.__proto__ || Object.getPrototypeOf(Player)).call(this, x, y, object, name, false));

        _this.alive = true;
        _get(Player.prototype.__proto__ || Object.getPrototypeOf(Player.prototype), 'control', _this).call(_this, true);
        return _this;
    }

    _createClass(Player, [{
        key: 'die',
        value: function die() {
            this.alive = false;
        }
    }, {
        key: 'getPosition',
        value: function getPosition() {
            return _get(Player.prototype.__proto__ || Object.getPrototypeOf(Player.prototype), 'getPosition', this).call(this);
        }
    }, {
        key: 'render',
        value: function render() {
            this.object.fillStyle = _GameEngine2.default.getColor().player;
            _get(Player.prototype.__proto__ || Object.getPrototypeOf(Player.prototype), 'render', this).call(this);
        }
    }, {
        key: 'status',
        get: function get() {
            return {
                name: this.name,
                renderObject: this.object,
                x: this.x,
                y: this.y,
                size: this.size,
                alive: this.alive
            };
        }
    }]);

    return Player;
}(_Component2.Component);

},{"../GameEngine":7,"./Component":1}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Exception = function () {
    function Exception(message) {
        _classCallCheck(this, Exception);

        this.message = message;
    }

    _createClass(Exception, [{
        key: "getMessage",
        value: function getMessage() {
            return this.message;
        }
    }]);

    return Exception;
}();

exports.default = Exception;

},{}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.InvalidMoveException = undefined;

var _Exception2 = require("./Exception");

var _Exception3 = _interopRequireDefault(_Exception2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var InvalidMoveException = exports.InvalidMoveException = function (_Exception) {
    _inherits(InvalidMoveException, _Exception);

    function InvalidMoveException(e) {
        _classCallCheck(this, InvalidMoveException);

        var message = "Invalid move, grid value has to be 1. Moving to " + e;
        return _possibleConstructorReturn(this, (InvalidMoveException.__proto__ || Object.getPrototypeOf(InvalidMoveException)).call(this, message));
    }

    return InvalidMoveException;
}(_Exception3.default);

},{"./Exception":5}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Map = require('./Components/Map');

var _Map2 = _interopRequireDefault(_Map);

var _Driver = require('./Components/Driver');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GameEngine = function () {
    function GameEngine(canvas, width, height) {
        _classCallCheck(this, GameEngine);

        this.player = [];
        this.width = width;
        this.height = height;
        this.canvas = canvas;
        this.map = new _Map2.default(canvas, width, height);
        this.setResolution(canvas, width, height);
    }

    _createClass(GameEngine, [{
        key: 'setup',
        value: async function setup() {
            await this.map.drawMap();
        }
    }, {
        key: 'setResolution',
        value: function setResolution(canvas, width, height) {
            canvas.width = width;
            canvas.height = height;
        }
    }, {
        key: 'render',
        value: async function render() {
            var gameplay = new _Driver.Driver(this.map.renderObject());
            var players = gameplay.init();
            this.animate(players);
        }
    }, {
        key: 'animate',
        value: async function animate(players) {
            requestAnimationFrame(this.animate.bind(this, players));
            this.canvas.getContext("2d").clearRect(0, 0, this.width, this.height);
            this.setup();
            for (var i = 0; i < players.length; i++) {
                players[i].render();
            }
        }
    }, {
        key: 'details',
        get: function get() {
            return {
                mWdith: this.width,
                mHeight: this.height,
                bSize: this.map.details().bSize
            };
        }
    }], [{
        key: 'getColor',
        value: function getColor() {
            return {
                path: "#77B6EA",
                block: "#37393A",
                player: "#A6B1E1",
                monster: "#A5243D",
                border: "#000"
            };
        }
    }]);

    return GameEngine;
}();

exports.default = GameEngine;

},{"./Components/Driver":2,"./Components/Map":3}],8:[function(require,module,exports){
"use strict";

var _GameEngine = require("./GameEngine");

var _GameEngine2 = _interopRequireDefault(_GameEngine);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var main = new _GameEngine2.default(document.querySelector("canvas"), 450, 450);
main.render();

},{"./GameEngine":7}]},{},[8]);
