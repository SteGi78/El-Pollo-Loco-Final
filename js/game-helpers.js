/**
 * Hilfsfunktionen für Game Flow
 * - restartGame(): Neustart ohne kompletten Seiten-Reload
 * - returnToMenu(): zurück zum Startbildschirm
 *
 * Voraussetzung:
 * - Es gibt eine globale init() Funktion, die ein neues Spiel startet.
 * - world / game state wird in init() neu aufgebaut.
 */

function hideElement(el) {
  if (!el) return;
  setInert(el, true);
  blurIfContainsActiveElement(el);
  el.hidden = true;
  el.setAttribute('aria-hidden', 'true');
  el.style.display = 'none';
}

function showElementGrid(el) {
  if (!el) return;
  setInert(el, false);
  el.hidden = false;
  el.setAttribute('aria-hidden', 'false');
  el.style.display = 'grid';
}

/**
 * Spiel neu starten
 * - blendet Game Over Screen aus
 * - ruft init() erneut auf, um eine neue World zu erzeugen
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
 * Zurück ins Hauptmenü
 * - blendet Game Over aus
 * - blendet StartScreen ein
 * - optional kann hier Musik neu gestartet werden etc.
 */
/**
 * Stops the current run and returns to the start screen.
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
 * Entfernt Fokus, falls er innerhalb eines ausgeblendeten Elements liegt.
 * @param {HTMLElement} el
 */
function blurIfContainsActiveElement(el) {
  const active = document.activeElement;
  if (active && el.contains(active) && typeof active.blur === 'function') {
    active.blur();
  }
}

/**
 * Setzt inert-Status, damit versteckte Overlays nicht fokussierbar sind.
 * @param {HTMLElement} el
 * @param {boolean} value
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
