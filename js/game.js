
let canvas;
let world;
let keyboard = new Keyboard();
const isMobileDevice = window.innerWidth <= 1368;

// init muss im globalen Scope liegen
window.init = function(restart = false) {
    if (restart) {
        resetGame();
    } else {
        stopCurrentWorld();
    }
    initLevel();
    canvas = document.getElementById("canvas");
    world = new World(canvas, keyboard);
    hideScreens();
    adjustControls();
    playGameMusic();
    enableMobileBtn();
}
function hideScreens() {
    document.getElementById("startScreen").style.display = "none";
    document.getElementById("gameOverScreen").style.display = "none";
}
function showGameOverScreen() {
    document.getElementById("gameOverScreen").style.display = "block";
}
function showStartScreen() {
    document.getElementById("startScreen").style.display = "block";
}
function resetGame() {
    stopCurrentWorld();
    keyboard = new Keyboard();
}
function stopCurrentWorld() {
    if (world && typeof world.destroy === 'function') {
        world.destroy();
    }
    world = null;
}
function adjustControls() {
    const mobileControls = document.getElementById('mobileControls');
    if (isMobileDevice) {
        mobileControls.style.display = 'flex';
    } else {
        mobileControls.style.display = 'none';
    }
}
function enableMobileBtn() {}
function playGameMusic() {
    if (typeof SOUNDS.game !== "undefined" && !soundMuted) {
        SOUNDS.game.loop = true;
        SOUNDS.game.volume = 0.15;
        SOUNDS.game.play();
    }
}
