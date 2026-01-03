/**
 * Datei: merge/js/layout-fit.js
 * Beschreibung: Teil des Browser-Spiels „El Pollo Loco“. Enthält Logik, Klassen und/oder Hilfsfunktionen.
 * Hinweis: Wird im Frontend (HTML/CSS/JavaScript) ausgeführt.
 * @author Stephan Gilles
 * @date 03.01.2026
 */

/**
 * Funktion fit.
 * @returns {any}
 */
function fit() {
  const wrap = document.querySelector(".epl-wrap");
  if (!wrap) return;

  const available = getAvailableViewport();
  const size = getFittedSize(available.width, available.height, 3 / 2);
  applyWrapSize(wrap, size.width, size.height);
}

/**
 * Funktion getAvailableViewport.
 * @returns {any}
 */
function getAvailableViewport() {
  return { width: window.innerWidth, height: window.innerHeight };
}

/**
 * Funktion getFittedSize.
 * @param {any} w - Parameter.
 * @param {any} h - Parameter.
 * @param {any} aspect - Parameter.
 * @returns {any}
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
 * Funktion applyWrapSize.
 * @param {any} wrap - Parameter.
 * @param {any} width - Parameter.
 * @param {any} height - Parameter.
 * @returns {any}
 */
function applyWrapSize(wrap, width, height) {
  wrap.style.width = `${width}px`;
  wrap.style.height = `${height}px`;
}

window.addEventListener("resize", fit);
document.addEventListener("DOMContentLoaded", fit);
