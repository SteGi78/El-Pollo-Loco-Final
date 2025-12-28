
let canvas;
let world;
let keyboard = new Keyboard();

const MOBILE_BREAKPOINT = 900;
window.keyboard = keyboard;

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
    updateOrientationLock();
}
function hideScreens() {
    hideElement(document.getElementById("startScreen"));
    hideGameOverScreen();
}
function resetGame() {
    stopCurrentWorld();
    keyboard = new Keyboard();
    window.keyboard = keyboard;
}
function stopCurrentWorld() {
    if (world && typeof world.destroy === 'function') {
        world.destroy();
    }
    world = null;
    pauseAllSounds();
}
function adjustControls() {
    const mobileControls = document.getElementById('mobileControls');
    const isMobile = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`).matches;
    if (!mobileControls) return;
    mobileControls.style.display = isMobile ? 'flex' : 'none';
    mobileControls.setAttribute('aria-hidden', isMobile ? 'false' : 'true');
}
function enableMobileBtn() {
    const mobileControls = document.getElementById('mobileControls');
    if (!mobileControls) return;
    mobileControls.addEventListener('contextmenu', (e) => e.preventDefault());
}
function playGameMusic() {
    if (typeof SOUNDS.game === "undefined") return;
    playSound(SOUNDS.game, false);
}

window.addEventListener('resize', adjustControls);
window.addEventListener('orientationchange', adjustControls);
document.addEventListener('DOMContentLoaded', adjustControls);
