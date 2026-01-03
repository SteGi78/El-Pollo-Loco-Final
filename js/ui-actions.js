/**
 * Datei: merge/js/ui-actions.js
 * Beschreibung: Teil des Browser-Spiels „El Pollo Loco“. Enthält Logik, Klassen und/oder Hilfsfunktionen.
 * Hinweis: Wird im Frontend (HTML/CSS/JavaScript) ausgeführt.
 * @author Max Mustermann
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
 * @param {Event} e - Parameter.
 * @returns {void}
 */
function handleActionClick(e) {
  const action = getActionFromEvent(e);
  if (!action) return;
  runAction(action);
}

/**
 * Funktion getActionFromEvent.
 * @param {Event} e - Parameter.
 * @returns {unknown}
 */
function getActionFromEvent(e) {
  const btn = e.target.closest("[data-action]");
  return btn ? btn.dataset.action : null;
}

/**
 * Funktion runAction.
 * @param {unknown} action - Parameter.
 * @returns {void}
 */
function runAction(action) {
  const fn = ACTION_HANDLERS[action];
  if (fn) fn();
}

/**
 * Funktion handleCanvasPointerDown.
 * @param {Event} e - Parameter.
 * @returns {void}
 */
function handleCanvasPointerDown(e) {
  if (e.target?.id !== "canvas") return;
  const start = document.getElementById("startScreen");
  if (start && !start.hidden) init();
}

/**
 * Funktion openDialog.
 * @param {string} id - Parameter.
 * @returns {void}
 */
function openDialog(id) {
  document.getElementById(id)?.showModal?.();
}

/**
 * Funktion closeDialog.
 * @param {string} id - Parameter.
 * @returns {void}
 */
function closeDialog(id) {
  document.getElementById(id)?.close?.();
}

/**
 * Funktion runFullscreenToggle.
 * @returns {void}
 */
function runFullscreenToggle() {
  if (typeof window.toggleFullscreen === "function") window.toggleFullscreen();
}

/**
 * Funktion openLegal.
 * @returns {void}
 */
function openLegal() {
  const dlg = document.getElementById("legalDialog");
  if (!dlg) return;
  if (!dlg.open) dlg.showModal();
}

/**
 * Funktion closeLegal.
 * @returns {void}
 */
function closeLegal() {
  const dlg = document.getElementById("legalDialog");
  if (!dlg) return;
  if (dlg.open) dlg.close();
}
