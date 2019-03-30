import Map from './Components/Map';
import { Player } from './Components/Player';
import { Component } from './Components/Component';
export default class GameEngine { 
    constructor(canvas, width, height) {
        this.player = [];
        this.width = width; 
        this.height = height;
        this.canvas = canvas;
        this.map = new Map(canvas,width,height);
        this.setResolution(canvas, width,height);
    }

    static getColor() {
        return {
            path: "#77B6EA",
            block: "#37393A",
            player: "#A6B1E1",
            monster: "#A5243D",
            border: "#000"
        }
    }

    async setup() {
        await this.map.drawMap();
    }

    setResolution(canvas,width,height) {
        canvas.width = width;
        canvas.height = height;
    }
    
    get details() {
        return {
            mWdith: this.width,
            mHeight: this.height,
            bSize: this.map.details().bSize,
        }
    }

    async render() {
        const renderObject = this.map.renderObject();
        let player1 = new Player(0,0,renderObject,"Thang");
        player1.render();
        console.log(player1.status);
    }
}