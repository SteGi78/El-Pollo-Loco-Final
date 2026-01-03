/**
 * Datei: js/ui.js
 * Beschreibung: UI-Funktionen (Game-Over Screen, Dialoge, Fullscreen, Rotate-Hinweis).
 * Hinweis: Wird im Frontend (HTML/CSS/JavaScript) ausgeführt.
 * @author Stephan Gilles
 * @date 03.01.2026
 */

/** @returns {HTMLElement|null} */
function $id(id) {
  return document.getElementById(id);
}

/**
 * Stellt sicher, dass der Game-Over-Screen existiert (Template oder Fallback).
 * @returns {HTMLElement|null}
 */
function ensureGameOverScreenExists() {
  let overlay = $id('gameOverScreen');
  if (overlay) return overlay;

  const root = $id('ui-root') || $id('app') || document.querySelector('main') || document.body;
  if (!root) return null;

  overlay = document.createElement('section');
  overlay.id = 'gameOverScreen';
  overlay.className = 'screen';
  overlay.setAttribute('aria-hidden', 'true');
  overlay.setAttribute('hidden', '');
  overlay.innerHTML = `
    <div class="screen__inner" role="document">
      <h2>Game Over</h2>
      <p id="gameOverMessage" class="gameover-msg">Du wurdest besiegt.</p>
      <div class="gameover-actions">
        <button type="button" data-action="restart-game">Neu starten</button>
        <button type="button" data-action="return-menu">Zurück zum Hauptmenü</button>
      </div>
    </div>
  `;
  root.appendChild(overlay);
  return overlay;
}

/**
 * Setzt Sichtbarkeit + ARIA/hidden konsistent.
 * @param {HTMLElement} el - Ziel-Element.
 * @param {boolean} visible - true = sichtbar.
 * @param {string} displayWhenVisible - z.B. "grid" oder "flex".
 * @returns {void}
 */
function setVisible(el, visible, displayWhenVisible = 'block') {
  if (!el) return;
  el.style.display = visible ? displayWhenVisible : 'none';
  el.setAttribute('aria-hidden', String(!visible));
  if (visible) el.removeAttribute('hidden');
  else el.setAttribute('hidden', '');
}

/**
 * Zeigt den Game-Over-Screen (Win/Lose).
 * @param {boolean} win - true = gewonnen, false = verloren.
 * @returns {void}
 */
function showGameOverScreen(win = false) {
  const overlay = ensureGameOverScreenExists();
  if (!overlay) return;

  const msgEl = $id('gameOverMessage');
  if (msgEl) msgEl.textContent = win ? 'Du hast den Endboss besiegt!' : 'Du wurdest besiegt.';

  const sr = $id('sr-status');
  if (sr) sr.textContent = win ? 'Game gewonnen' : 'Game verloren';

  setVisible(overlay, true, 'grid');
}

/**
 * Versteckt den Game-Over-Screen.
 * @returns {void}
 */
function hideGameOverScreen() {
  const overlay = $id('gameOverScreen');
  if (!overlay) return;

  const sr = $id('sr-status');
  if (sr) sr.textContent = '';

  setVisible(overlay, false);
}

/**
 * Aktiviert den Hilfe-Dialog (schließen via Klick außen / ESC).
 * @returns {void}
 */
function setupInstructionsDialog() {
  const dialog = /** @type {HTMLDialogElement|null} */ ($id('instructionsDialog'));
  if (!dialog || dialog.dataset.bound === '1') return;

  dialog.dataset.bound = '1';
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && dialog.open) dialog.close();
  });
}

/**
 * Aktiviert den Impressum/Legal-Dialog (Backdrop-Klick schließt).
 * @returns {void}
 */
function setupLegalDialog() {
  const dlg = /** @type {HTMLDialogElement|null} */ ($id('legalDialog'));
  if (!dlg || dlg.dataset.bound === '1') return;

  dlg.dataset.bound = '1';
  dlg.addEventListener('click', (ev) => {
    const rect = dlg.getBoundingClientRect();
    const inside =
      ev.clientX >= rect.left && ev.clientX <= rect.right &&
      ev.clientY >= rect.top && ev.clientY <= rect.bottom;
    if (!inside) dlg.close();
  });
}

/**
 * Toggles Fullscreen (main/app/document).
 * @returns {Promise<void>|void}
 */
function toggleFullscreen() {
  const host = document.querySelector('main') || $id('app') || document.documentElement;

  if (!document.fullscreenElement) return host.requestFullscreen?.();
  return document.exitFullscreen?.();
}

/**
 * Aktualisiert Text/State des Fullscreen-Buttons.
 * @returns {void}
 */
function updateFullscreenButtonState() {
  const btn = $id('fullscreenBtn');
  if (!btn) return;

  const isFs = !!document.fullscreenElement;
  btn.textContent = isFs ? 'Vollbild beenden' : 'Vollbild';
  btn.setAttribute('aria-pressed', String(isFs));
}

/**
 * Bindet den Fullscreen-Button (einmalig).
 * @returns {void}
 */
function bindFullscreenButton() {
  const btn = $id('fullscreenBtn');
  if (!btn || btn.dataset.bound === '1') return;

  btn.dataset.bound = '1';
  btn.addEventListener('click', (event) => {
    event.stopPropagation();
    Promise.resolve(toggleFullscreen())
      .catch((e) => console.warn('Fullscreen failed:', e));
  });
}

/**
 * Zeigt bei Portrait + kleiner Breite den "Rotate"-Hinweis.
 * @returns {void}
 */
function updateOrientationLock() {
  const rotateNotice = $id('rotateNotice');
  const main = document.querySelector('main');
  if (!rotateNotice || !main) return;

  const isPortrait = window.matchMedia('(orientation: portrait)').matches;
  const isSmall = window.innerWidth <= 960;
  const lock = isPortrait && isSmall;

  document.body.classList.toggle('is-portrait-lock', lock);
  rotateNotice.style.display = lock ? 'flex' : 'none';
  main.style.display = lock ? 'none' : '';
}

/**
 * Initialisiert UI-Bindings.
 * @returns {void}
 */
function initUIBindings() {
  setupInstructionsDialog();
  setupLegalDialog();
  bindFullscreenButton();
  updateFullscreenButtonState();
  updateOrientationLock();
}

document.addEventListener('DOMContentLoaded', initUIBindings);
window.addEventListener('epl:templates-loaded', initUIBindings);

document.addEventListener('fullscreenchange', () => {
  updateFullscreenButtonState();
  updateOrientationLock();
  document.body.classList.toggle('is-fullscreen', !!document.fullscreenElement);
  window.dispatchEvent(new Event('resize'));
});

window.addEventListener('resize', updateOrientationLock);
window.addEventListener('orientationchange', updateOrientationLock);

// global verfügbar machen (wird von anderen Modulen genutzt)
window.showGameOverScreen = showGameOverScreen;
window.hideGameOverScreen = hideGameOverScreen;
window.toggleFullscreen = toggleFullscreen;
window.updateOrientationLock = updateOrientationLock;
