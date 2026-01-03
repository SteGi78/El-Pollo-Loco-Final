/**
 * Datei: merge/models/bar-values.js
 * Beschreibung: Teil des Browser-Spiels „El Pollo Loco“. Enthält Logik, Klassen und/oder Hilfsfunktionen.
 * Hinweis: Wird im Frontend (HTML/CSS/JavaScript) ausgeführt.
 * @author Stephan Gilles
 * @date 03.01.2026
 */

/**
 * Funktion getAvailableStatusbarValue.
 * @param {number} percent - Parameter.
 * @returns {unknown}
 */
function getAvailableStatusbarValue(percent) {
  const available = [0, 20, 40, 60, 80, 100];
  const p = Math.max(0, Math.min(100, Number(percent) || 0));
  return Math.max(...available.filter(v => v <= p));
}

/**
 * Funktion getAllowedBarValue.
 * @param {number} percent - Parameter.
 * @returns {unknown}
 */
function getAllowedBarValue(percent) {
  return getAvailableStatusbarValue(percent);
}
