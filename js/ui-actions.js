/**
 * Delegated UI actions (data-action buttons).
 * Keeps handlers short and avoids long switch blocks.
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
 * Handles clicks on elements with a data-action attribute.
 * @param {MouseEvent} e
 * @returns {void}
 */
function handleActionClick(e) {
  const action = getActionFromEvent(e);
  if (!action) return;
  runAction(action);
}

/**
 * Extracts the action string from an event target.
 * @param {Event} e
 * @returns {string|null}
 */
function getActionFromEvent(e) {
  const btn = e.target.closest("[data-action]");
  return btn ? btn.dataset.action : null;
}

/**
 * Runs the matching action handler.
 * @param {string} action
 * @returns {void}
 */
function runAction(action) {
  const fn = ACTION_HANDLERS[action];
  if (fn) fn();
}

/**
 * Starts the game also via tapping/clicking on the canvas while the start screen is visible.
 * @param {PointerEvent} e
 * @returns {void}
 */
function handleCanvasPointerDown(e) {
  if (e.target?.id !== "canvas") return;
  const start = document.getElementById("startScreen");
  if (start && !start.hidden) init();
}

/**
 * Opens a <dialog> by id (if supported).
 * @param {string} id
 * @returns {void}
 */
function openDialog(id) {
  document.getElementById(id)?.showModal?.();
}

/**
 * Closes a <dialog> by id (if supported).
 * @param {string} id
 * @returns {void}
 */
function closeDialog(id) {
  document.getElementById(id)?.close?.();
}

/**
 * Toggles fullscreen using the global helper if present.
 * @returns {void}
 */
function runFullscreenToggle() {
  if (typeof window.toggleFullscreen === "function") window.toggleFullscreen();
}

/**
 * Opens the legal dialog.
 * @returns {void}
 */
function openLegal() {
  const dlg = document.getElementById("legalDialog");
  if (!dlg) return;
  if (!dlg.open) dlg.showModal();
}

/**
 * Closes the legal dialog.
 * @returns {void}
 */
function closeLegal() {
  const dlg = document.getElementById("legalDialog");
  if (!dlg) return;
  if (dlg.open) dlg.close();
}
