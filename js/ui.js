/**
 * Datei: merge/js/ui.js
 * Beschreibung: Teil des Browser-Spiels „El Pollo Loco“. Enthält Logik, Klassen und/oder Hilfsfunktionen.
 * Hinweis: Wird im Frontend (HTML/CSS/JavaScript) ausgeführt.
 * @author Stephan Gilles
 * @date 03.01.2026
 */

/**
 * Funktion showGameOverScreen.
 * @param {any} win - Parameter.
 * @returns {any}
 */
function showGameOverScreen(win = false) {
  const els = getGameOverElements();
  if (!els.overlay) return;

  setGameOverMessage(els.messageEl, win);
  showOverlay(els.overlay);
  announceGameOver(els.sr, win);
}

/**
 * Funktion hideGameOverScreen.
 * @returns {any}
 */
function hideGameOverScreen() {
  const els = getGameOverElements();
  if (!els.overlay) return;

  hideOverlay(els.overlay);
  clearSrStatus(els.sr);
}

/**
 * Funktion getGameOverElements.
 * @returns {any}
 */
function getGameOverElements() {
  return {
    overlay: document.getElementById('gameOverScreen'),
    sr: document.getElementById('sr-status'),
    messageEl: document.getElementById('gameOverMessage')
  };
}

/**
 * Funktion setGameOverMessage.
 * @param {any} messageEl - Parameter.
 * @param {any} win - Parameter.
 * @returns {any}
 */
function setGameOverMessage(messageEl, win) {
  if (!messageEl) return;
  messageEl.textContent = win ? 'Du hast den Endboss besiegt!' : 'Du wurdest besiegt.';
}

/**
 * Funktion showOverlay.
 * @param {any} overlay - Parameter.
 * @returns {any}
 */
function showOverlay(overlay) {
  overlay.style.display = 'grid';
  overlay.removeAttribute('hidden');
  overlay.setAttribute('aria-hidden', 'false');
  setOverlayInert(overlay, false);
}

/**
 * Funktion hideOverlay.
 * @param {any} overlay - Parameter.
 * @returns {any}
 */
function hideOverlay(overlay) {
  overlay.style.display = 'none';
  overlay.setAttribute('hidden', '');
  overlay.setAttribute('aria-hidden', 'true');
  setOverlayInert(overlay, true);
}

/**
 * Funktion setOverlayInert.
 * @param {any} overlay - Parameter.
 * @param {any} value - Parameter.
 * @returns {any}
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
 * Funktion announceGameOver.
 * @param {any} sr - Parameter.
 * @param {any} win - Parameter.
 * @returns {any}
 */
function announceGameOver(sr, win) {
  if (!sr) return;
  sr.textContent = win ? 'Game gewonnen' : 'Game verloren';
}

/**
 * Funktion clearSrStatus.
 * @param {any} sr - Parameter.
 * @returns {any}
 */
function clearSrStatus(sr) {
  if (sr) sr.textContent = '';
}


/**
 * Funktion setupInstructionsDialog.
 * @returns {any}
 */
function setupInstructionsDialog() {
  const dialog = document.getElementById('instructionsDialog');
  if (!dialog) return;
  dialog.addEventListener('click', onDialogBackdropClick.bind(null, dialog));
  document.addEventListener('keydown', onDialogEscape.bind(null, dialog));
}

/**
 * Funktion onDialogBackdropClick.
 * @param {any} dialog - Parameter.
 * @param {any} event - Parameter.
 * @returns {any}
 */
function onDialogBackdropClick(dialog, event) {
  if (event.target === dialog) dialog.close();
}

/**
 * Funktion onDialogEscape.
 * @param {any} dialog - Parameter.
 * @param {any} event - Parameter.
 * @returns {any}
 */
function onDialogEscape(dialog, event) {
  if (event.key === 'Escape' && dialog.open) dialog.close();
}

/**
 * Funktion toggleFullscreen.
 * @returns {any}
 */
function toggleFullscreen() {
  const target = getFullscreenHost();
  if (!document.fullscreenElement) return requestFullscreen(target);
  return exitFullscreen();
}

/**
 * Funktion getFullscreenHost.
 * @returns {any}
 */
function getFullscreenHost() {
  return document.querySelector('main')
    || document.getElementById('app')
    || document.documentElement;
}

/**
 * Funktion requestFullscreen.
 * @param {any} target - Parameter.
 * @returns {any}
 */
function requestFullscreen(target) {
  if (target?.requestFullscreen) return target.requestFullscreen();
}

/**
 * Funktion exitFullscreen.
 * @returns {any}
 */
function exitFullscreen() {
  if (document.exitFullscreen) return document.exitFullscreen();
}

/**
 * Funktion bindFullscreenButton.
 * @returns {any}
 */
function bindFullscreenButton() {
  const btn = document.getElementById('fullscreenBtn');
  if (!btn || btn.dataset.bound === '1') return;

  btn.dataset.bound = '1';
  btn.addEventListener('click', handleFullscreenButtonClick);
}

/**
 * Funktion handleFullscreenButtonClick.
 * @param {any} event - Parameter.
 * @returns {any}
 */
function handleFullscreenButtonClick(event) {
  event.stopPropagation();
  Promise.resolve(toggleFullscreen())
    .catch((e) => console.warn('Fullscreen failed:', e))
    .finally(updateFullscreenButtonState);
}

/**
 * Funktion updateFullscreenButtonState.
 * @returns {any}
 */
function updateFullscreenButtonState() {
  const btn = document.getElementById('fullscreenBtn');
  if (!btn) return;

  const isFs = !!document.fullscreenElement;
  btn.textContent = isFs ? 'Vollbild beenden' : 'Vollbild';
  btn.setAttribute('aria-pressed', String(isFs));
}

/**
 * Funktion updateOrientationLock.
 * @returns {any}
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
 * Funktion getOrientationLockElements.
 * @returns {any}
 */
function getOrientationLockElements() {
  return {
    rotateNotice: document.getElementById('rotateNotice'),
    main: document.querySelector('main')
  };
}

/**
 * Funktion shouldLockToLandscape.
 * @returns {any}
 */
function shouldLockToLandscape() {
  const portrait = window.matchMedia('(orientation: portrait)').matches;
  const isSmallViewport = window.innerWidth <= 960;
  return portrait && isSmallViewport;
}

/**
 * Funktion applyOrientationLock.
 * @param {any} rotateNotice - Parameter.
 * @param {any} main - Parameter.
 * @returns {any}
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
 * Funktion clearOrientationLock.
 * @param {any} rotateNotice - Parameter.
 * @param {any} main - Parameter.
 * @returns {any}
 */
function clearOrientationLock(rotateNotice, main) {
  document.body.classList.remove('is-portrait-lock');
  hideRotateNotice(rotateNotice);
  showMainAfterOrientationLock(main);
}

/**
 * Funktion ensureFocusable.
 * @param {any} el - Parameter.
 * @returns {any}
 */
function ensureFocusable(el) {
  if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '-1');
}

/**
 * Funktion showRotateNotice.
 * @param {any} el - Parameter.
 * @returns {any}
 */
function showRotateNotice(el) {
  el.hidden = false;
  el.setAttribute('aria-hidden', 'false');
  el.style.display = 'flex';
}

/**
 * Funktion hideRotateNotice.
 * @param {any} el - Parameter.
 * @returns {any}
 */
function hideRotateNotice(el) {
  el.hidden = true;
  el.setAttribute('aria-hidden', 'true');
  el.style.display = 'none';
}

/**
 * Funktion hideMainForOrientationLock.
 * @param {any} main - Parameter.
 * @returns {any}
 */
function hideMainForOrientationLock(main) {
  main.setAttribute('aria-hidden', 'true');
  if (typeof setInert === 'function') setInert(main, true);
  main.style.display = 'none';
}

/**
 * Funktion showMainAfterOrientationLock.
 * @param {any} main - Parameter.
 * @returns {any}
 */
function showMainAfterOrientationLock(main) {
  main.setAttribute('aria-hidden', 'false');
  if (typeof setInert === 'function') setInert(main, false);
  main.style.display = '';
}

/**
 * Funktion setupLegalDialog.
 * @returns {any}
 */
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

/**
 * Funktion initUIBindings.
 * @returns {any}
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
