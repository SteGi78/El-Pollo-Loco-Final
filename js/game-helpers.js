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
  el.hidden = true;
  el.setAttribute('aria-hidden', 'true');
  el.style.display = 'none';
}

function showElementGrid(el) {
  if (!el) return;
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
function returnToMenu() {
  const over = document.getElementById('gameOverScreen');
  hideElement(over);
  pauseAllSounds(true);

  if (typeof stopCurrentWorld === 'function') {
    stopCurrentWorld();
  }

  const start = document.getElementById('startScreen');
  showElementGrid(start);
}

// global verfügbar machen
window.restartGame = restartGame;
window.returnToMenu = returnToMenu;
