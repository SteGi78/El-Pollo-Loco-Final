/**
 * Shows the Game Over overlay and announces the result for screen readers.
 * @param {boolean} win - True if the player won.
 * @returns {void}
 */
function showGameOverScreen(win = false) {
  const els = getGameOverElements();
  if (!els.overlay) return;

  setGameOverMessage(els.messageEl, win);
  showOverlay(els.overlay);
  announceGameOver(els.sr, win);
}

/**
 * Hides the Game Over overlay.
 * @returns {void}
 */
function hideGameOverScreen() {
  const els = getGameOverElements();
  if (!els.overlay) return;

  hideOverlay(els.overlay);
  clearSrStatus(els.sr);
}

/**
 * Reads DOM elements used by the Game Over overlay.
 * @returns {{overlay: HTMLElement|null, sr: HTMLElement|null, messageEl: HTMLElement|null}}
 */
function getGameOverElements() {
  return {
    overlay: document.getElementById('gameOverScreen'),
    sr: document.getElementById('sr-status'),
    messageEl: document.getElementById('gameOverMessage')
  };
}

/**
 * Updates the visible Game Over message.
 * @param {HTMLElement|null} messageEl
 * @param {boolean} win
 * @returns {void}
 */
function setGameOverMessage(messageEl, win) {
  if (!messageEl) return;
  messageEl.textContent = win ? 'Du hast den Endboss besiegt!' : 'Du wurdest besiegt.';
}

/**
 * Shows an overlay in a robust and accessible way.
 * @param {HTMLElement} overlay
 * @returns {void}
 */
function showOverlay(overlay) {
  overlay.style.display = 'grid';
  overlay.removeAttribute('hidden');
  overlay.setAttribute('aria-hidden', 'false');
  setOverlayInert(overlay, false);
}

/**
 * Hides an overlay in a robust and accessible way.
 * @param {HTMLElement} overlay
 * @returns {void}
 */
function hideOverlay(overlay) {
  overlay.style.display = 'none';
  overlay.setAttribute('hidden', '');
  overlay.setAttribute('aria-hidden', 'true');
  setOverlayInert(overlay, true);
}

/**
 * Sets or removes inert on an overlay (if available).
 * @param {HTMLElement} overlay
 * @param {boolean} value
 * @returns {void}
 */
function setOverlayInert(overlay, value) {
  if (typeof setInert === 'function') {
    setInert(overlay, value);
    return;
  }
  if (value) overlay.setAttribute('inert', '');
  else overlay.removeAttribute('inert');
}

/**
 * Announces the Game Over status for screen readers.
 * @param {HTMLElement|null} sr
 * @param {boolean} win
 * @returns {void}
 */
function announceGameOver(sr, win) {
  if (!sr) return;
  sr.textContent = win ? 'Game gewonnen' : 'Game verloren';
}

/**
 * Clears the screen-reader status line.
 * @param {HTMLElement|null} sr
 * @returns {void}
 */
function clearSrStatus(sr) {
  if (sr) sr.textContent = '';
}


/**
 * Wires the instructions dialog (close on backdrop / ESC).
 * @returns {void}
 */
function setupInstructionsDialog() {
  const dialog = document.getElementById('instructionsDialog');
  if (!dialog) return;
  dialog.addEventListener('click', onDialogBackdropClick.bind(null, dialog));
  document.addEventListener('keydown', onDialogEscape.bind(null, dialog));
}

/**
 * Closes a dialog when the backdrop is clicked.
 * @param {HTMLDialogElement} dialog
 * @param {MouseEvent} event
 * @returns {void}
 */
function onDialogBackdropClick(dialog, event) {
  if (event.target === dialog) dialog.close();
}

/**
 * Closes a dialog on ESC key.
 * @param {HTMLDialogElement} dialog
 * @param {KeyboardEvent} event
 * @returns {void}
 */
function onDialogEscape(dialog, event) {
  if (event.key === 'Escape' && dialog.open) dialog.close();
}

/**
 * Toggles browser fullscreen mode.
 * Uses main/#app/documentElement as fullscreen host to preserve 3:2 letterboxing.
 * @returns {Promise<void>|void}
 */
function toggleFullscreen() {
  const target = getFullscreenHost();
  if (!document.fullscreenElement) return requestFullscreen(target);
  return exitFullscreen();
}

/**
 * @returns {HTMLElement}
 */
function getFullscreenHost() {
  return document.querySelector('main')
    || document.getElementById('app')
    || document.documentElement;
}

/**
 * @param {HTMLElement} target
 * @returns {Promise<void>|void}
 */
function requestFullscreen(target) {
  if (target?.requestFullscreen) return target.requestFullscreen();
}

/**
 * @returns {Promise<void>|void}
 */
function exitFullscreen() {
  if (document.exitFullscreen) return document.exitFullscreen();
}

/**
 * Binds the fullscreen toggle button (idempotent).
 * @returns {void}
 */
function bindFullscreenButton() {
  const btn = document.getElementById('fullscreenBtn');
  if (!btn || btn.dataset.bound === '1') return;

  btn.dataset.bound = '1';
  btn.addEventListener('click', handleFullscreenButtonClick);
}

/**
 * Fullscreen button click handler.
 * @param {MouseEvent} event
 * @returns {void}
 */
function handleFullscreenButtonClick(event) {
  event.stopPropagation();
  Promise.resolve(toggleFullscreen())
    .catch((e) => console.warn('Fullscreen failed:', e))
    .finally(updateFullscreenButtonState);
}

function updateFullscreenButtonState() {
  const btn = document.getElementById('fullscreenBtn');
  if (!btn) return;

  const isFs = !!document.fullscreenElement;
  btn.textContent = isFs ? 'Vollbild beenden' : 'Vollbild';
  btn.setAttribute('aria-pressed', String(isFs));
}

/**
 * Locks the UI to landscape on small portrait screens.
 * Shows the rotate notice and hides the main game area.
 * @returns {void}
 */
function updateOrientationLock() {
  const { rotateNotice, main } = getOrientationLockElements();
  if (!rotateNotice || !main) return;

  if (shouldLockToLandscape()) {
    applyOrientationLock(rotateNotice, main);
    return;
  }
  clearOrientationLock(rotateNotice, main);
}

/**
 * @returns {{rotateNotice: HTMLElement|null, main: HTMLElement|null}}
 */
function getOrientationLockElements() {
  return {
    rotateNotice: document.getElementById('rotateNotice'),
    main: document.querySelector('main')
  };
}

/**
 * @returns {boolean}
 */
function shouldLockToLandscape() {
  const portrait = window.matchMedia('(orientation: portrait)').matches;
  const isSmallViewport = window.innerWidth <= 960;
  return portrait && isSmallViewport;
}

/**
 * @param {HTMLElement} rotateNotice
 * @param {HTMLElement} main
 * @returns {void}
 */
function applyOrientationLock(rotateNotice, main) {
  document.body.classList.add('is-portrait-lock');
  ensureFocusable(rotateNotice);
  showRotateNotice(rotateNotice);
  hideMainForOrientationLock(main);
  if (typeof blurIfContainsActiveElement === 'function') blurIfContainsActiveElement(main);
  rotateNotice.focus?.({ preventScroll: true });
}

/**
 * @param {HTMLElement} rotateNotice
 * @param {HTMLElement} main
 * @returns {void}
 */
function clearOrientationLock(rotateNotice, main) {
  document.body.classList.remove('is-portrait-lock');
  hideRotateNotice(rotateNotice);
  showMainAfterOrientationLock(main);
}

/**
 * @param {HTMLElement} el
 * @returns {void}
 */
function ensureFocusable(el) {
  if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '-1');
}

/**
 * @param {HTMLElement} el
 * @returns {void}
 */
function showRotateNotice(el) {
  el.hidden = false;
  el.setAttribute('aria-hidden', 'false');
  el.style.display = 'flex';
}

/**
 * @param {HTMLElement} el
 * @returns {void}
 */
function hideRotateNotice(el) {
  el.hidden = true;
  el.setAttribute('aria-hidden', 'true');
  el.style.display = 'none';
}

/**
 * @param {HTMLElement} main
 * @returns {void}
 */
function hideMainForOrientationLock(main) {
  main.setAttribute('aria-hidden', 'true');
  if (typeof setInert === 'function') setInert(main, true);
  main.style.display = 'none';
}

/**
 * @param {HTMLElement} main
 * @returns {void}
 */
function showMainAfterOrientationLock(main) {
  main.setAttribute('aria-hidden', 'false');
  if (typeof setInert === 'function') setInert(main, false);
  main.style.display = '';
}

function setupLegalDialog() {
  const dlg = document.getElementById('legalDialog');
  if (!dlg) return;

  // Klick auf Backdrop schließt
  dlg.addEventListener('click', (ev) => {
    const rect = dlg.getBoundingClientRect();
    const inDialog = (
      ev.clientX >= rect.left && ev.clientX <= rect.right &&
      ev.clientY >= rect.top && ev.clientY <= rect.bottom
    );
    if (!inDialog) dlg.close();
  });
}

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
  // Button-Label + Layout-Updates nach Fullscreen Toggle
  updateFullscreenButtonState();
  updateOrientationLock();

  // CSS kann zusätzlich über Klasse reagieren (für Browser-Eigenheiten)
  document.body.classList.toggle('is-fullscreen', !!document.fullscreenElement);

  // DPI/Canvas und Layout sauber nachziehen
  window.dispatchEvent(new Event('resize'));
});

window.addEventListener('resize', updateOrientationLock);
window.addEventListener('orientationchange', updateOrientationLock);

// global verfügbar machen
window.updateOrientationLock = updateOrientationLock;
window.toggleFullscreen = toggleFullscreen;
