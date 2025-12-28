
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
    if (!mobileControls) return;

    // Mobile-Buttons sollen NUR auf echten Mobile/Tablet-Geräten sichtbar sein.
    // Nicht nur, weil das Browserfenster am Desktop schmal ist.
    const ua = navigator.userAgent || '';
    const isMobileDevice = /Android|iPhone|iPad|iPod|Mobi/i.test(ua);

    document.body.classList.toggle('is-mobile-ui', isMobileDevice);

    const isPlaying = document.body.classList.contains('is-playing');
    const shouldShow = isMobileDevice && isPlaying;
    mobileControls.setAttribute('aria-hidden', shouldShow ? 'false' : 'true');

    // Wichtig: keine Inline-Styles, damit CSS (body.is-mobile-ui ...) die Sichtbarkeit steuert.
    mobileControls.style.display = '';
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
window.addEventListener('epl:templates-loaded', adjustControls);
