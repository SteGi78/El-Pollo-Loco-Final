/**
 * Datei: merge/js/preload.js
 * Beschreibung: Teil des Browser-Spiels „El Pollo Loco“. Enthält Logik, Klassen und/oder Hilfsfunktionen.
 * Hinweis: Wird im Frontend (HTML/CSS/JavaScript) ausgeführt.
 * @author Stephan Gilles
 * @date 03.01.2026
 */

const imagesToPreload = [
  // Hier nur relevante Assets für den Start
  "img/5_background/layers/3_third_layer/1.png"
  // ... bei Bedarf erweitern
];

const preloadedImages = {};

/**
 * Funktion preloadImages.
 * @param {any} callback - Parameter.
 * @returns {any}
 */
function preloadImages(callback) {
  let index = 0;

  /**
   * Funktion done.
   * @returns {any}
   */
  const done = () => {
    index++;
    if (index >= imagesToPreload.length) return safeCallback(callback);
    preloadSingle(imagesToPreload[index], done);
  };

  if (!imagesToPreload.length) return safeCallback(callback);
  preloadSingle(imagesToPreload[index], done);
}

/**
 * Funktion preloadSingle.
 * @param {any} src - Parameter.
 * @param {any} done - Parameter.
 * @returns {any}
 */
function preloadSingle(src, done) {
  if (preloadedImages[src]) return done(src, true);

  const img = new Image();
  img.onload = () => handlePreloadDone(src, img, done);
  img.onerror = () => handlePreloadDone(src, null, done);
  img.src = src;
}

/**
 * Funktion handlePreloadDone.
 * @param {any} src - Parameter.
 * @param {any} img - Parameter.
 * @param {any} done - Parameter.
 * @returns {any}
 */
function handlePreloadDone(src, img, done) {
  if (img) preloadedImages[src] = img;
  done(src, Boolean(img));
}

/**
 * Funktion safeCallback.
 * @param {any} callback - Parameter.
 * @returns {any}
 */
function safeCallback(callback) {
  if (typeof callback === "function") callback();
}

// preloadImages(init);
