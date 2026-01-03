/**
 * Datei: merge/models/bottle-bar.class.js
 * Beschreibung: Teil des Browser-Spiels „El Pollo Loco“. Enthält Logik, Klassen und/oder Hilfsfunktionen.
 * Hinweis: Wird im Frontend (HTML/CSS/JavaScript) ausgeführt.
 * @author Stephan Gilles
 * @date 03.01.2026
 */

/**
 * Klasse BottleBar.
 * @class
 */
class BottleBar extends StatusBar {
  width = 200;
  height = 60;
  x = 10;
  y = 90;

  IMAGES = [
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/10.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/30.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/50.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/70.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/90.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png"
  ];

  percentage = 0;

  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.setPercentage(this.percentage);
  }

  /**
   * Methode _getImageIndexFromPercentage.
   * @returns {any}
   */
  _getImageIndexFromPercentage() {
    const pct = Math.max(0, Math.min(100, this.percentage));
    return Math.min(10, Math.floor(pct / 10));
  }
}
