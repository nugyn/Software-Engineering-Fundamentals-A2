(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Component = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _GameEngine = require('../GameEngine');

var _GameEngine2 = _interopRequireDefault(_GameEngine);

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
    }

    _createClass(Component, [{
        key: 'moveLeft',
        value: function moveLeft() {
            this.x += this.size;
        }
    }, {
        key: 'moveRight',
        value: function moveRight() {
            this.x -= this.size;
        }
    }, {
        key: 'getPosition',
        get: function get() {
            return {
                x: this.x,
                y: this.y
            };
        }
    }]);

    return Component;
}();

},{"../GameEngine":4}],2:[function(require,module,exports){
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
                bSize: this.bSize
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
    }, {
        key: 'details',
        get: function get() {
            return {
                grid: this.grid,
                bSize: this.bSize
            };
        }
    }]);

    return Map;
}();

exports.default = Map;

},{"../GameEngine":4}],3:[function(require,module,exports){
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
        return _this;
    }

    _createClass(Player, [{
        key: 'die',
        value: function die() {
            this.alive = false;
        }
    }, {
        key: 'render',
        value: function render() {
            this.object.globalCompositeOperation = 'destination-over';
            this.object.fillStyle = _GameEngine2.default.getColor().player;
            this.object.fillRect(this.x, this.y, this.size, this.size);
            // var ctx = document.querySelector("canvas").getContext("2d");
            // ctx.fillRect(0,0,150,150);
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
    }, {
        key: 'getPosition',
        get: function get() {
            return _get(Player.prototype.__proto__ || Object.getPrototypeOf(Player.prototype), 'getPosition', this).call(this);
        }
    }]);

    return Player;
}(_Component2.Component);

},{"../GameEngine":4,"./Component":1}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Map = require('./Components/Map');

var _Map2 = _interopRequireDefault(_Map);

var _Player = require('./Components/Player');

var _Component = require('./Components/Component');

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
            var renderObject = this.map.renderObject();
            var player1 = new _Player.Player(0, 0, renderObject, "Thang");
            player1.render();
            console.log(player1.status);
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

},{"./Components/Component":1,"./Components/Map":2,"./Components/Player":3}],5:[function(require,module,exports){
"use strict";

var _GameEngine = require("./GameEngine");

var _GameEngine2 = _interopRequireDefault(_GameEngine);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var main = new _GameEngine2.default(document.querySelector("canvas"), 450, 450);
main.render().then(main.setup());

},{"./GameEngine":4}]},{},[5]);
