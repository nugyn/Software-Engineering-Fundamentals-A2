/* Store all the constant */
export default class Global {
    static getColor() {
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
        return ([
            [1, 1, 1, 1, 1, 1, 1, 1, 1], 
            [1, 0, 0, 0, 1, 0, 0, 0, 1], 
            [1, 0, 0, 0, 1, 0, 0, 0, 1], 
            [1, 0, 0, 0, 1, 0, 0, 0, 1], 
            [1, 1, 1, 1, 1, 1, 1, 1, 1], 
            [1, 0, 0, 0, 1, 0, 0, 0, 1], 
            [1, 0, 0, 0, 1, 0, 0, 0, 1], 
            [1, 0, 0, 0, 1, 0, 0, 0, 1], 
            [1, 1, 1, 1, 1, 1, 1, 1, 1]
        ]);
    }
    static getBSize() {
        return this.resolution()/this.getGrid()[0].length;
    }
    static resolution() {
        return 720;
    }

    static getHost() {
        return "http://10.132.100.250:" + this.getPort();
    }

    static getPort() {
        return 8080;
    }
}