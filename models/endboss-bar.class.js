/**
 * Datei: merge/models/endboss-bar.class.js
 * Beschreibung: Teil des Browser-Spiels „El Pollo Loco“. Enthält Logik, Klassen und/oder Hilfsfunktionen.
 * Hinweis: Wird im Frontend (HTML/CSS/JavaScript) ausgeführt.
 * @author Stephan Gilles
 * @date 03.01.2026
 */

/**
 * Klasse EndbossBar.
 * @class
 */
class EndbossBar extends StatusBar {
  width = 200;
  height = 60;
  x = 500;
  y = 0;

  IMAGES = [
    "img/7_statusbars/2_statusbar_endboss/bar/0.png",
    "img/7_statusbars/2_statusbar_endboss/bar/20.png",
    "img/7_statusbars/2_statusbar_endboss/bar/40.png",
    "img/7_statusbars/2_statusbar_endboss/bar/60.png",
    "img/7_statusbars/2_statusbar_endboss/bar/80.png",
    "img/7_statusbars/2_statusbar_endboss/bar/100.png"
  ];

  percentage = 100;

  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.setPercentage(this.percentage);
  }
}
