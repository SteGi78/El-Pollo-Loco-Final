/**
 * Datei: merge/js/dpi.js
 * Beschreibung: Teil des Browser-Spiels „El Pollo Loco“. Enthält Logik, Klassen und/oder Hilfsfunktionen.
 * Hinweis: Wird im Frontend (HTML/CSS/JavaScript) ausgeführt.
 * @author Stephan Gilles
 * @date 03.01.2026
 */

let currentDpr = 1;

/**
 * Funktion applyDpi.
 * @returns {void}
 */
function applyDpi() {
  const canvas = document.getElementById("canvas");
  if (!canvas) return;

  const dpr = getSnappedDpr();
  if (dpr === currentDpr) return;

  currentDpr = dpr;
  resizeCanvasForDpr(canvas, dpr);
  applyCanvasTransform(canvas, dpr);
}

/**
 * Funktion getSnappedDpr.
 * @returns {unknown}
 */
function getSnappedDpr() {
  const dpr = window.devicePixelRatio || 1;
  return Math.max(1, Math.round(dpr));
}

/**
 * Funktion resizeCanvasForDpr.
 * @param {HTMLCanvasElement} canvas - Parameter.
 * @param {number} dpr - Parameter.
 * @returns {void}
 */
function resizeCanvasForDpr(canvas, dpr) {
  canvas.width = 720 * dpr;
  canvas.height = 480 * dpr;
}

/**
 * Funktion applyCanvasTransform.
 * @param {HTMLCanvasElement} canvas - Parameter.
 * @param {number} dpr - Parameter.
 * @returns {void}
 */
function applyCanvasTransform(canvas, dpr) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}
