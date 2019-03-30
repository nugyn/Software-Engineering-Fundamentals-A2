(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GameEngine = exports.GameEngine = function () {
    function GameEngine(canvas, width, height) {
        _classCallCheck(this, GameEngine);

        this.grid = [[1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 0, 0, 0, 1, 0, 0, 0, 1], [1, 0, 0, 0, 1, 0, 0, 0, 1], [1, 0, 0, 0, 1, 0, 0, 0, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 0, 0, 0, 1, 0, 0, 0, 1], [1, 0, 0, 0, 1, 0, 0, 0, 1], [1, 0, 0, 0, 1, 0, 0, 0, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1]];
        this.width = width;
        this.height = height;
        this.setResolution(canvas, width, height);
        this.object = canvas.getContext('2d');
    }

    _createClass(GameEngine, [{
        key: "setResolution",
        value: function setResolution(canvas, width, height) {
            canvas.width = width;
            canvas.height = height;
        }
    }, {
        key: "drawMap",
        value: function drawMap() {
            for (var row = 0; row < this.grid.length; row++) {
                console.log(this.grid[row]);
                for (var i = 0; i < this.grid[row].length; i++) {
                    /* Define block width and height*/
                    var bWidth = this.width / 9;
                    var bHeight = this.height / 9;
                    /* */
                    this.object.fillStyle = this.grid[row][i] == "1" ? GameEngine.getColorPath().path : GameEngine.getColorPath().block;

                    this.object.fillRect(bWidth * i, bHeight * row, bWidth, bHeight);
                    this.object.strokeRect(bWidth * i, bHeight * row, bWidth, bHeight);
                }
            }
        }
    }, {
        key: "render",
        value: function render() {
            this.drawMap();
        }
    }], [{
        key: "getColorPath",
        value: function getColorPath() {
            return {
                path: "#77B6EA",
                block: "#37393A"
            };
        }
    }]);

    return GameEngine;
}();

},{}],2:[function(require,module,exports){
"use strict";

var _GameEngine = require("./GameEngine");

var main = new _GameEngine.GameEngine(document.querySelector("canvas"), 450, 450);
main.render();

},{"./GameEngine":1}]},{},[2]);
