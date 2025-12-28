
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
<<<<<<< HEAD
    // Mobile-Controls sollen erst sichtbar werden, wenn das Spiel wirklich läuft
    document.body.classList.add('is-playing');
=======
>>>>>>> c8f4fc3242a73c5fc6378c8305766fb02549da37
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
<<<<<<< HEAD
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
=======
    const isMobile = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`).matches;
    if (!mobileControls) return;
    mobileControls.style.display = isMobile ? 'flex' : 'none';
    mobileControls.setAttribute('aria-hidden', isMobile ? 'false' : 'true');
>>>>>>> c8f4fc3242a73c5fc6378c8305766fb02549da37
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
<<<<<<< HEAD
window.addEventListener('epl:templates-loaded', adjustControls);
=======
>>>>>>> c8f4fc3242a73c5fc6378c8305766fb02549da37
