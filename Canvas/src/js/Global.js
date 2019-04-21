/* Store all the constant */
export default class Global {
    static getColor() {
        return {
            path: "#77B6EA",
            block: "#37393A",
            player: "#A6B1E1",
            monster: "#A5243D",
            border: "#000",
            name: "#000"
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
}