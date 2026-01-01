/**
 * Canvas DPI handling.
 * Keeps logic resolution at 720x480 but scales the backing store for crisp rendering.
 */

let currentDpr = 1;

/**
 * Applies the current devicePixelRatio to the canvas backing store.
 * Snaps DPR to an integer to reduce seams on scaled pixel art.
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
 * @returns {number}
 */
function getSnappedDpr() {
  const dpr = window.devicePixelRatio || 1;
  return Math.max(1, Math.round(dpr));
}

/**
 * @param {HTMLCanvasElement} canvas
 * @param {number} dpr
 * @returns {void}
 */
function resizeCanvasForDpr(canvas, dpr) {
  canvas.width = 720 * dpr;
  canvas.height = 480 * dpr;
}

/**
 * @param {HTMLCanvasElement} canvas
 * @param {number} dpr
 * @returns {void}
 */
function applyCanvasTransform(canvas, dpr) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}
