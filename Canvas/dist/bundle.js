(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
        this.object = canvas.getContext('2d');;
    }

    _createClass(Map, [{
        key: 'drawMap',
        value: function drawMap() {
            for (var row = 0; row < this.grid.length; row++) {
                console.log(this.grid[row]);
                for (var i = 0; i < this.grid[row].length; i++) {
                    /* */
                    this.object.fillStyle = this.grid[row][i] == "1" ? _GameEngine2.default.getColor().path : _GameEngine2.default.getColor().block;

                    this.object.fillRect(this.bSize * i, this.bSize * row, this.bSize, this.bSize);
                    this.object.strokeRect(this.bSize * i, this.bSize * row, this.bSize, this.bSize);
                }
            }
        }
    }, {
        key: 'gridDetails',
        get: function get() {
            return this.grid;
        }
    }]);

    return Map;
}();

exports.default = Map;

},{"../GameEngine":2}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Map = require("./Components/Map");

var _Map2 = _interopRequireDefault(_Map);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GameEngine = function () {
    function GameEngine(canvas, width, height) {
        _classCallCheck(this, GameEngine);

        this.player = [];
        this.width = width;
        this.height = height;
        this.map = new _Map2.default(canvas, width, height);
        this.setResolution(canvas, width, height);
    }

    _createClass(GameEngine, [{
        key: "setResolution",
        value: function setResolution(canvas, width, height) {
            canvas.width = width;
            canvas.height = height;
        }
    }, {
        key: "render",
        value: function render() {
            this.map.drawMap();
        }
    }, {
        key: "details",
        get: function get() {
            return {
                mWdith: this.width,
                mHeight: this.height,
                bSize: this.bSize
                // grid: Map.gridDetails()
            };
        }
    }], [{
        key: "getColor",
        value: function getColor() {
            return {
                path: "#77B6EA",
                block: "#37393A"
            };
        }
    }]);

    return GameEngine;
}();

exports.default = GameEngine;

},{"./Components/Map":1}],3:[function(require,module,exports){
"use strict";

var _GameEngine = require("./GameEngine");

var _GameEngine2 = _interopRequireDefault(_GameEngine);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var main = new _GameEngine2.default(document.querySelector("canvas"), 450, 450);
main.render();

},{"./GameEngine":2}]},{},[3]);
