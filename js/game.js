
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
    // Mobile-Controls sollen erst sichtbar werden, wenn das Spiel wirklich läuft
    document.body.classList.add('is-playing');
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

    // Pointer-Queries: Touch-Device zuverlässig erkennen (iPad Desktop-Viewport etc.)
    const isCoarsePointer =
        window.matchMedia?.('(pointer: coarse)').matches ||
        window.matchMedia?.('(any-pointer: coarse)').matches ||
        ((navigator.maxTouchPoints && navigator.maxTouchPoints > 0) || ('ontouchstart' in window));

    // Mobile UI (Buttons) nur dann aktivieren, wenn Touch verfügbar ist
    document.body.classList.toggle('is-mobile-ui', !!isCoarsePointer);

    // Wir lassen die CSS-Regeln die Sichtbarkeit steuern.
    // (Kein inline display setzen, sonst sabotiert das Media Queries.)
    if (mobileControls) mobileControls.style.display = '';
}
function enableMobileBtn() {
    const mobileControls = document.getElementById('mobileControls');
    if (!mobileControls) return;
    mobileControls.addEventListener('contextmenu', (e) => e.preventDefault());
}
function playGameMusic() {
    window._gameMusicShouldPlay = true;
    if (typeof SOUNDS.game === "undefined") return;
    // Start/ensure background music is playing (playSound resets to 0 only here on explicit start)
    playSound(SOUNDS.game, false);
}

window.addEventListener('resize', adjustControls);
window.addEventListener('orientationchange', adjustControls);
document.addEventListener('DOMContentLoaded', adjustControls);
window.addEventListener('epl:templates-loaded', adjustControls);
