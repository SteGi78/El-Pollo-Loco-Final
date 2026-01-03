/**
 * Datei: merge/js/mobile-controls.js
 * Beschreibung: Teil des Browser-Spiels „El Pollo Loco“. Enthält Logik, Klassen und/oder Hilfsfunktionen.
 * Hinweis: Wird im Frontend (HTML/CSS/JavaScript) ausgeführt.
 * @author Stephan Gilles
 * @date 03.01.2026
 */

/**
 * Funktion bindMobileControls.
 * @returns {any}
 */
function bindMobileControls() {
  if (window.__eplMobileControlsBound) return;

  const buttons = getMobileButtons();
  if (!buttons) return;

  bindAllButtons(buttons);
  window.__eplMobileControlsBound = true;
}

/**
 * Funktion getMobileButtons.
 * @returns {any}
 */
function getMobileButtons() {
  const btnLeft = document.getElementById('btnLeft');
  const btnRight = document.getElementById('btnRight');
  const btnJump = document.getElementById('btnJump');
  const btnAction = document.getElementById('btnAction');

  if (!btnLeft || !btnRight || !btnJump || !btnAction) return null;
  return { btnLeft, btnRight, btnJump, btnAction };
}

/**
 * Funktion bindAllButtons.
 * @param {any} buttons - Parameter.
 * @returns {any}
 */
function bindAllButtons(buttons) {
  bindPress(buttons.btnLeft, 'LEFT');
  bindPress(buttons.btnRight, 'RIGHT');
  bindPress(buttons.btnJump, 'UP');
  bindPress(buttons.btnAction, 'D'); // D = throw
}

/**
 * Funktion setKeyboardFlag.
 * @param {any} propName - Parameter.
 * @param {any} value - Parameter.
 * @returns {any}
 */
function setKeyboardFlag(propName, value) {
  const kb = window.keyboard;
  if (!kb) return;

  if (Object.prototype.hasOwnProperty.call(kb, propName) || propName in kb) {
    kb[propName] = value;
  }
}

/**
 * Funktion bindPress.
 * @param {any} button - Parameter.
 * @param {any} keyName - Parameter.
 * @returns {any}
 */
function bindPress(button, keyName) {
  addPointerListener(button, 'pointerdown', () => setKeyboardFlag(keyName, true));
  addPointerListener(button, 'pointerup', () => setKeyboardFlag(keyName, false));
  addPointerListener(button, 'pointercancel', () => setKeyboardFlag(keyName, false));
  addPointerListener(button, 'pointerleave', () => setKeyboardFlag(keyName, false));
  preventContextMenu(button);
}

/**
 * Funktion addPointerListener.
 * @param {any} button - Parameter.
 * @param {any} eventName - Parameter.
 * @param {any} handler - Parameter.
 * @returns {any}
 */
function addPointerListener(button, eventName, handler) {
  button.addEventListener(
    eventName,
    (e) => {
      e.preventDefault();
      handler(e);
    },
    { passive: false }
  );
}

/**
 * Funktion preventContextMenu.
 * @param {any} button - Parameter.
 * @returns {any}
 */
function preventContextMenu(button) {
  button.addEventListener('contextmenu', (e) => e.preventDefault());
}

if (document.readyState !== 'loading') {
  bindMobileControls();
}

window.addEventListener('epl:templates-loaded', bindMobileControls);

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(bindMobileControls, 0);
});
