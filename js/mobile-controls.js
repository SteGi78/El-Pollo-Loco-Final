/**
 * Mobile-/Touch-Steuerung (Buttons)
 *
 * WICHTIG:
 * Die Buttons werden per Template nachgeladen (fetch). Deshalb binden wir die Listener erst,
 * wenn das Event 'epl:templates-loaded' gefeuert wurde.
 */

/**
 * Binds mobile controls once (idempotent).
 * @returns {void}
 */
function bindMobileControls() {
  if (window.__eplMobileControlsBound) return;

  const buttons = getMobileButtons();
  if (!buttons) return;

  bindAllButtons(buttons);
  window.__eplMobileControlsBound = true;
}

/**
 * Reads required button elements from the DOM.
 * @returns {{btnLeft: HTMLElement, btnRight: HTMLElement, btnJump: HTMLElement, btnAction: HTMLElement} | null}
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
 * Binds press interactions for all mobile buttons.
 * @param {{btnLeft: HTMLElement, btnRight: HTMLElement, btnJump: HTMLElement, btnAction: HTMLElement}} buttons
 * @returns {void}
 */
function bindAllButtons(buttons) {
  bindPress(buttons.btnLeft, 'LEFT');
  bindPress(buttons.btnRight, 'RIGHT');
  bindPress(buttons.btnJump, 'UP');
  bindPress(buttons.btnAction, 'D'); // D = throw
}

/**
 * Updates the global keyboard flags.
 * @param {string} propName
 * @param {boolean} value
 * @returns {void}
 */
function setKeyboardFlag(propName, value) {
  const kb = window.keyboard;
  if (!kb) return;

  if (Object.prototype.hasOwnProperty.call(kb, propName) || propName in kb) {
    kb[propName] = value;
  }
}

/**
 * Binds press (pointer) events to a button element.
 * @param {HTMLElement} button
 * @param {string} keyName
 * @returns {void}
 */
function bindPress(button, keyName) {
  addPointerListener(button, 'pointerdown', () => setKeyboardFlag(keyName, true));
  addPointerListener(button, 'pointerup', () => setKeyboardFlag(keyName, false));
  addPointerListener(button, 'pointercancel', () => setKeyboardFlag(keyName, false));
  addPointerListener(button, 'pointerleave', () => setKeyboardFlag(keyName, false));
  preventContextMenu(button);
}

/**
 * Adds a pointer listener and prevents default browser behavior (touch scrolling etc.).
 * @param {HTMLElement} button
 * @param {string} eventName
 * @param {Function} handler
 * @returns {void}
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
 * Prevents long-press context menu on mobile.
 * @param {HTMLElement} button
 * @returns {void}
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
