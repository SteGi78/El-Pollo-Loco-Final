
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

function prepareInit(restart) {
  if (restart) return resetGame();
  stopCurrentWorld();
}

function getCanvas() {
  return document.getElementById("canvas");
}

function finalizeInit() {
  hideScreens();
  document.body.classList.add("is-playing");
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
/**
 * Applies mobile UI state depending on coarse pointer / touch support.
 * @returns {void}
 */
function adjustControls() {
  document.body.classList.toggle('is-mobile-ui', isCoarsePointerDevice());
  resetMobileControlsInlineStyle();
}

/**
 * Detects touch/coarse pointer devices reliably (iPad desktop viewport etc.).
 * @returns {boolean}
 */
function isCoarsePointerDevice() {
  const coarsePointer = window.matchMedia?.('(pointer: coarse)').matches;
  const coarseAny = window.matchMedia?.('(any-pointer: coarse)').matches;
  const touchPoints = (navigator.maxTouchPoints && navigator.maxTouchPoints > 0) || ('ontouchstart' in window);
  return !!(coarsePointer || coarseAny || touchPoints);
}

/**
 * Resets inline display style so CSS media queries can control visibility.
 * @returns {void}
 */
function resetMobileControlsInlineStyle() {
  const mobileControls = document.getElementById('mobileControls');
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
