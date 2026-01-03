/**
 * Datei: merge/models/status-bar.class.js
 * Beschreibung: Teil des Browser-Spiels „El Pollo Loco“. Enthält Logik, Klassen und/oder Hilfsfunktionen.
 * Hinweis: Wird im Frontend (HTML/CSS/JavaScript) ausgeführt.
 * @author Stephan Gilles
 * @date 03.01.2026
 */

/**
 * Klasse StatusBar.
 * @class
 */
class StatusBar extends DrawableObject {
  width = 200;
  height = 60;
  x = 10;
  y = 0;

  IMAGES = [
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png"
  ];

  percentage = 100;

  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.setPercentage(this.percentage);
  }

  /**
   * Methode setPercentage.
   * @param {number} percentage - Parameter.
   * @returns {void}
   */
  setPercentage(percentage) {
    const p = Math.max(0, Math.min(100, Number(percentage) || 0));
    this.percentage = p;

    const index = this._getImageIndexFromPercentage();
    const path = this.IMAGES[index];

    this.img = this.imageCache[path];
  }

  /**
   * Methode _getImageIndexFromPercentage.
   * @returns {void}
   */
  _getImageIndexFromPercentage() {
    const value =
      typeof getAvailableStatusbarValue === "function"
        ? getAvailableStatusbarValue(this.percentage)
        : Math.max(0, Math.min(100, this.percentage));

    return value / 20;
  }
}
