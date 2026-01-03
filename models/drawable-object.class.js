/**
 * Datei: merge/models/drawable-object.class.js
 * Beschreibung: Teil des Browser-Spiels „El Pollo Loco“. Enthält Logik, Klassen und/oder Hilfsfunktionen.
 * Hinweis: Wird im Frontend (HTML/CSS/JavaScript) ausgeführt.
 * @author Stephan Gilles
 * @date 03.01.2026
 */

/**
 * Klasse DrawableObject.
 * @class
 */
class DrawableObject {
  x;
  y;
  height;
  width;
  img;
  imageCache = {};
  currentImage = 0;

  /**
   * Methode loadImage.
   * @param {string} path - Parameter.
   * @returns {void}
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * Methode loadImages.
   * @param {string[]} arr - Parameter.
   * @returns {void}
   */
  loadImages(arr) {
    arr.forEach((path) => {
      const img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  /**
   * Methode draw.
   * @param {CanvasRenderingContext2D} ctx - Parameter.
   * @returns {void}
   */
  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
}
