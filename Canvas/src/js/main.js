import GameEngine from './GameEngine';
let main = new GameEngine(document.querySelector("canvas"), 450, 450);
main.render().then(
    main.setup()
);
