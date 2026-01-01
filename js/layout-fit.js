/**
 * Layout fitting helper.
 * Scales the game wrapper while preserving aspect ratio (3:2).
 */

/**
 * Fits the .epl-wrap element into the viewport.
 * @returns {void}
 */
function fit() {
  const wrap = document.querySelector(".epl-wrap");
  if (!wrap) return;

  const available = getAvailableViewport();
  const size = getFittedSize(available.width, available.height, 3 / 2);
  applyWrapSize(wrap, size.width, size.height);
}

/**
 * @returns {{width:number, height:number}}
 */
function getAvailableViewport() {
  return { width: window.innerWidth, height: window.innerHeight };
}

/**
 * Computes a fitted rectangle for a given aspect ratio.
 * @param {number} w
 * @param {number} h
 * @param {number} aspect
 * @returns {{width:number, height:number}}
 */
function getFittedSize(w, h, aspect) {
  let width = w;
  let height = Math.floor(width / aspect);

  if (height > h) {
    height = h;
    width = Math.floor(height * aspect);
  }
  return { width, height };
}

/**
 * Applies the computed size to the wrapper.
 * @param {HTMLElement} wrap
 * @param {number} width
 * @param {number} height
 * @returns {void}
 */
function applyWrapSize(wrap, width, height) {
  wrap.style.width = `${width}px`;
  wrap.style.height = `${height}px`;
}

window.addEventListener("resize", fit);
document.addEventListener("DOMContentLoaded", fit);
