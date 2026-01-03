/**
 * Datei: merge/models/background-object.class.js
 * Beschreibung: Teil des Browser-Spiels „El Pollo Loco“. Enthält Logik, Klassen und/oder Hilfsfunktionen.
 * Hinweis: Wird im Frontend (HTML/CSS/JavaScript) ausgeführt.
 * @author Stephan Gilles
 * @date 03.01.2026
 */

/**
 * Klasse BackgroundObject.
 * @class
 */
class BackgroundObject extends DrawableObject {
    width = 720;
    height = 480;
    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.y = 480 - this.height;
        this.x = x;
    }

    /**
     * Methode draw.
     * @param {CanvasRenderingContext2D} ctx - Parameter.
     * @returns {void}
     */
    draw(ctx) {
      const crop = this.getSeamSafeCrop();
      this.drawCropped(ctx, crop);
    }

    /**
     * Methode getSeamSafeCrop.
     * @returns {Object}
     */
    getSeamSafeCrop() {
      const sx = 0;
      const sy = 0;
      const sw = Math.max(0, (this.img?.width ?? 0) - 2);
      const sh = Math.max(0, (this.img?.height ?? 0) - 2);
      return { sx, sy, sw, sh, dx: this.x, dy: this.y, dw: this.width, dh: this.height };
    }

    /**
     * Methode drawCropped.
     * @param {CanvasRenderingContext2D} ctx - Parameter.
     * @param {CropRect} crop - Parameter.
     * @returns {void}
     */
    drawCropped(ctx, crop) {
      if (!this.img) return;
      ctx.drawImage(this.img, crop.sx, crop.sy, crop.sw, crop.sh, crop.dx, crop.dy, crop.dw, crop.dh);
    }
}
