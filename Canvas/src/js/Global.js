import * as ip from 'ip';
export default class Global {
    /* 
    Global:
    Store all of the static variable, grid, resolution, host, port.
    */
    static getColor() {
        /* 
        Default the color path
        */
        return {
            path: "#77B6EA",
            block: "#37393A",
            player: "#A6B1E1",
            monster: "#A5243D",
            border: "#000",
            name: "#fff",
            playerColor: ["#E75A7C", "#DAA89B", "#9055A2", "#6D466B"]
        }
    }

    static getGrid() {
        /* 
        Store the grid data
        */
        return ([
            [1, 1, 1, 1, 2, 1, 1, 1, 1], 
            [1, 0, 0, 0, 1, 0, 0, 0, 1], 
            [1, 0, 0, 0, 1, 0, 0, 0, 1], 
            [1, 0, 0, 0, 1, 0, 0, 0, 1], 
            [2, 1, 1, 1, 1, 1, 1, 1, 2], 
            [1, 0, 0, 0, 1, 0, 0, 0, 1], 
            [1, 0, 0, 0, 1, 0, 0, 0, 1], 
            [1, 0, 0, 0, 1, 0, 0, 0, 1], 
            [1, 1, 1, 1, 2, 1, 1, 1, 1]
        ]);
    }
    static getBSize() {
        /* 
        Calculate the block size of a player based on resolution and grid
        */
        return this.resolution()/this.getGrid()[0].length;
    }
    static resolution() {
        /* 
        Set resolution of the canvas
        */
        return 720;
    }

    static getHost() {
        /* 
        Set host domain
        */
        return "http://" + ip.address() + ":" + this.getPort();
    }

    static getPort() {
        /* 
        Set port
        */
        return 8080;
    }
}