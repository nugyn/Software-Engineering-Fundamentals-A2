Feature('PlayerMovement');

Scenario('test player movement', (I) => {
    I.amOnPage('https://monstermash-d9577.firebaseapp.com/');
    I.see('Player', '.debug');
    // within('canvas', () => {
        /* 37 left
         * 39 right
         * 38 up
         * 40 down
         */
    I.pressKey('ArrowRight');
    I.see('Player: x{50} y{0}', '.debug');

    I.pressKey('ArrowRight');
    I.see('Player: x{100} y{0}', '.debug');

    I.pressKey('ArrowRight');
    I.see('Player: x{150} y{0}', '.debug');
    I.pressKey('ArrowRight');
    I.see('Player: x{200} y{0}', '.debug');
    I.pressKey('ArrowDown');
    I.see('Player: x{200} y{50}', '.debug');
    I.pressKey('ArrowLeft');
    I.see('Player: x{200} y{50}', '.debug');
    I.pressKey('ArrowRight');
    I.see('Player: x{200} y{50}', '.debug');
    I.pressKey('ArrowDown');
    I.see('Player: x{200} y{100}', '.debug');
    I.pressKey('ArrowDown');
    I.see('Player: x{200} y{150}', '.debug');
    I.pressKey('ArrowDown');
    I.see('Player: x{200} y{200}', '.debug');
    I.pressKey('ArrowRight');
    I.see('Player: x{250} y{200}', '.debug');
    I.pressKey('ArrowLeft');
    I.pressKey('ArrowLeft');
    I.see('Player: x{150} y{200}', '.debug');
    I.pressKey('ArrowLeft');
    I.pressKey('ArrowLeft');
    I.pressKey('ArrowDown');
    I.see('Player: x{50} y{200}', '.debug');
    I.pressKey('ArrowLeft');
    I.pressKey('ArrowLeft');
    I.see('Player: x{0} y{200}', '.debug');
    I.pressKey('ArrowDown');
    I.pressKey('ArrowDown');
    I.pressKey('ArrowDown');
    I.pressKey('ArrowDown');
    I.pressKey('ArrowDown');
    I.see('Player: x{0} y{400}', '.debug');
    I.pressKey('ArrowRight');
    I.pressKey('ArrowRight');
    I.pressKey('ArrowRight');
    I.pressKey('ArrowRight');
    I.pressKey('ArrowDown');
    I.see('Player: x{200} y{400}', '.debug');
    I.pressKey('ArrowUp');
    I.see('Player: x{200} y{350}', '.debug');
    I.pressKey('ArrowUp');
    I.see('Player: x{200} y{300}', '.debug');
    I.pressKey('ArrowDown');
    I.pressKey('ArrowDown');
    I.pressKey('ArrowRight');
    I.pressKey('ArrowRight');
    I.pressKey('ArrowRight');
    I.pressKey('ArrowRight');
    I.pressKey('ArrowRight');
    I.see('Player: x{400} y{400}', '.debug');
    I.pressKey('ArrowUp');
    I.pressKey('ArrowUp');
    I.pressKey('ArrowUp');
    I.pressKey('ArrowUp');
    I.pressKey('ArrowUp');
    I.pressKey('ArrowUp');
    I.pressKey('ArrowUp');
    I.pressKey('ArrowUp');
    I.pressKey('ArrowUp');
    I.see('Player: x{400} y{0}', '.debug');
    I.pressKey('ArrowLeft');
    I.pressKey('ArrowLeft');
    I.pressKey('ArrowLeft');
    I.pressKey('ArrowLeft');
    I.pressKey('ArrowLeft');
    I.pressKey('ArrowLeft');
    I.pressKey('ArrowLeft');
    I.pressKey('ArrowLeft');
    I.pressKey('ArrowLeft');
    I.see('Player: x{0} y{0}', '.debug');


    // });
});
