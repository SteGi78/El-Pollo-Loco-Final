/**
 * Datei: merge/js/ui-actions.js
 * Beschreibung: Teil des Browser-Spiels „El Pollo Loco“. Enthält Logik, Klassen und/oder Hilfsfunktionen.
 * Hinweis: Wird im Frontend (HTML/CSS/JavaScript) ausgeführt.
 * @author Stephan Gilles
 * @date 03.01.2026
 */

document.addEventListener("click", handleActionClick);
document.addEventListener("pointerdown", handleCanvasPointerDown);

const ACTION_HANDLERS = {
  "start-game": () => init(),
  "restart-game": () => restartGame(),
  "return-menu": () => (typeof returnToMenu === "function" ? returnToMenu() : null),
  "toggle-mute": () => (typeof toggleMute === "function" ? toggleMute() : null),
  "fullscreen": () => runFullscreenToggle(),
  "open-instructions": () => openDialog("instructionsDialog"),
  "close-instructions": () => closeDialog("instructionsDialog"),
  "open-legal": () => openLegal(),
  "close-legal": () => closeLegal(),
};

/**
 * Funktion handleActionClick.
 * @param {any} e - Parameter.
 * @returns {any}
 */
function handleActionClick(e) {
  const action = getActionFromEvent(e);
  if (!action) return;
  runAction(action);
}

/**
 * Funktion getActionFromEvent.
 * @param {any} e - Parameter.
 * @returns {any}
 */
function getActionFromEvent(e) {
  const btn = e.target.closest("[data-action]");
  return btn ? btn.dataset.action : null;
}

/**
 * Funktion runAction.
 * @param {any} action - Parameter.
 * @returns {any}
 */
function runAction(action) {
  const fn = ACTION_HANDLERS[action];
  if (fn) fn();
}

/**
 * Funktion handleCanvasPointerDown.
 * @param {any} e - Parameter.
 * @returns {any}
 */
function handleCanvasPointerDown(e) {
  if (e.target?.id !== "canvas") return;
  const start = document.getElementById("startScreen");
  if (start && !start.hidden) init();
}

/**
 * Funktion openDialog.
 * @param {any} id - Parameter.
 * @returns {any}
 */
function openDialog(id) {
  document.getElementById(id)?.showModal?.();
}

/**
 * Funktion closeDialog.
 * @param {any} id - Parameter.
 * @returns {any}
 */
function closeDialog(id) {
  document.getElementById(id)?.close?.();
}

/**
 * Funktion runFullscreenToggle.
 * @returns {any}
 */
function runFullscreenToggle() {
  if (typeof window.toggleFullscreen === "function") window.toggleFullscreen();
}

/**
 * Funktion openLegal.
 * @returns {any}
 */
function openLegal() {
  const dlg = document.getElementById("legalDialog");
  if (!dlg) return;
  if (!dlg.open) dlg.showModal();
}

/**
 * Funktion closeLegal.
 * @returns {any}
 */
function closeLegal() {
  const dlg = document.getElementById("legalDialog");
  if (!dlg) return;
  if (dlg.open) dlg.close();
}
