/**
 * Datei: merge/js/game-helpers.js
 * Beschreibung: Teil des Browser-Spiels „El Pollo Loco“. Enthält Logik, Klassen und/oder Hilfsfunktionen.
 * Hinweis: Wird im Frontend (HTML/CSS/JavaScript) ausgeführt.
 * @author Stephan Gilles
 * @date 03.01.2026
 */

/**
 * Funktion hideElement.
 * @param {HTMLElement} el - Parameter.
 * @returns {void}
 */
function hideElement(el) {
  if (!el) return;
  setInert(el, true);
  blurIfContainsActiveElement(el);
  el.hidden = true;
  el.setAttribute('aria-hidden', 'true');
  el.style.display = 'none';
}

/**
 * Funktion showElementGrid.
 * @param {HTMLElement} el - Parameter.
 * @returns {void}
 */
function showElementGrid(el) {
  if (!el) return;
  setInert(el, false);
  el.hidden = false;
  el.setAttribute('aria-hidden', 'false');
  el.style.display = 'grid';
}

/**
 * Funktion restartGame.
 * @returns {void}
 */
function restartGame() {
  const over = document.getElementById('gameOverScreen');
  hideElement(over);
  pauseAllSounds(true);

  // init() muss im Projekt existieren und eine frische Spielwelt aufbauen
  if (typeof init === 'function') {
    init(true);
  }
}

/**
 * Funktion returnToMenu.
 * @returns {void}
 */
function returnToMenu() {
  hideElement(document.getElementById('gameOverScreen'));
  pauseAllSounds(true);
  if (typeof stopCurrentWorld === 'function') stopCurrentWorld();
  document.body.classList.remove('is-playing');
  if (typeof adjustControls === 'function') adjustControls();
  showElementGrid(document.getElementById('startScreen'));
}

/**
 * Funktion blurIfContainsActiveElement.
 * @param {HTMLElement} el - Parameter.
 * @returns {void}
 */
function blurIfContainsActiveElement(el) {
  const active = document.activeElement;
  if (active && el.contains(active) && typeof active.blur === 'function') {
    active.blur();
  }
}

/**
 * Funktion setInert.
 * @param {HTMLElement} el - Parameter.
 * @param {number} value - Parameter.
 * @returns {void}
 */
function setInert(el, value) {
  if (!el) return;
  if (value) {
    el.setAttribute('inert', '');
    el.inert = true;
  } else {
    el.removeAttribute('inert');
    el.inert = false;
  }
}

// global verfügbar machen
window.restartGame = restartGame;
window.returnToMenu = returnToMenu;
