/**
 * Datei: merge/js/game.js
 * Beschreibung: Teil des Browser-Spiels „El Pollo Loco“. Enthält Logik, Klassen und/oder Hilfsfunktionen.
 * Hinweis: Wird im Frontend (HTML/CSS/JavaScript) ausgeführt.
 * @author Stephan Gilles
 * @date 03.01.2026
 */

let canvas;
let world;
let keyboard = new Keyboard();

const MOBILE_BREAKPOINT = 900;
window.keyboard = keyboard;

// init muss im globalen Scope liegen
window.init = function (restart = false) {
  prepareInit(restart);
  initLevel();
  canvas = getCanvas();
  world = new World(canvas, keyboard);
  finalizeInit();
};

/**
 * Funktion prepareInit.
 * @param {boolean} restart - Parameter.
 * @returns {void}
 */
function prepareInit(restart) {
  if (restart) return resetGame();
  stopCurrentWorld();
}

/**
 * Funktion getCanvas.
 * @returns {HTMLElement|null}
 */
function getCanvas() {
  return document.getElementById("canvas");
}

/**
 * Funktion finalizeInit.
 * @returns {void}
 */
function finalizeInit() {
  hideScreens();
  document.body.classList.add("is-playing");
  adjustControls();
  playGameMusic();
  enableMobileBtn();
  updateOrientationLock();
}


/**
 * Funktion hideScreens.
 * @returns {void}
 */
function hideScreens() {
    hideElement(document.getElementById("startScreen"));
    hideGameOverScreen();
}
/**
 * Funktion resetGame.
 * @returns {void}
 */
function resetGame() {
    stopCurrentWorld();
    keyboard = new Keyboard();
    window.keyboard = keyboard;
}
/**
 * Funktion stopCurrentWorld.
 * @returns {void}
 */
function stopCurrentWorld() {
    if (world && typeof world.destroy === 'function') {
        world.destroy();
    }
    world = null;
    pauseAllSounds();
}
/**
 * Funktion adjustControls.
 * @returns {void}
 */
function adjustControls() {
  document.body.classList.toggle('is-mobile-ui', isCoarsePointerDevice());
  resetMobileControlsInlineStyle();
}

/**
 * Funktion isCoarsePointerDevice.
 * @returns {boolean}
 */
function isCoarsePointerDevice() {
  const coarsePointer = window.matchMedia?.('(pointer: coarse)').matches;
  const coarseAny = window.matchMedia?.('(any-pointer: coarse)').matches;
  const touchPoints = (navigator.maxTouchPoints && navigator.maxTouchPoints > 0) || ('ontouchstart' in window);
  return !!(coarsePointer || coarseAny || touchPoints);
}

/**
 * Funktion resetMobileControlsInlineStyle.
 * @returns {void}
 */
function resetMobileControlsInlineStyle() {
  const mobileControls = document.getElementById('mobileControls');
  if (mobileControls) mobileControls.style.display = '';
}
/**
 * Funktion enableMobileBtn.
 * @returns {void}
 */
function enableMobileBtn() {
    const mobileControls = document.getElementById('mobileControls');
    if (!mobileControls) return;
    mobileControls.addEventListener('contextmenu', (e) => e.preventDefault());
}
/**
 * Funktion playGameMusic.
 * @returns {void}
 */
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
