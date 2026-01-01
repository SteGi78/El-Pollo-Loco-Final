class BackgroundObject extends DrawableObject {
    width = 720;
    height = 480;
    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.y = 480 - this.height;
        this.x = x;
    }

    /**
     * Draw background tiles in a seam-safe way.
     *
     * Why seams happen:
     * - The background PNGs are large (e.g. 1920x1080) and are scaled down to
     *   720x480 every frame.
     * - Some background layers contain transparent pixels on the very left/right
     *   edge (alpha=0). When two tiles touch, this can reveal the layer below as
     *   a thin vertical line.
     *
     * Fix:
     * - Crop a few source pixels on the left/right edge (removes transparent
     *   borders) and slightly overdraw the destination by 1px.
     */
    /**
     * Draws a parallax background tile.
     * Uses integer-aligned source cropping to reduce seams on scaled canvases.
     * @param {CanvasRenderingContext2D} ctx
     * @returns {void}
     */
    draw(ctx) {
      const crop = this.getSeamSafeCrop();
      this.drawCropped(ctx, crop);
    }

    /**
     * Calculates a seam-safe crop rectangle for the image.
     * @returns {{sx:number, sy:number, sw:number, sh:number, dx:number, dy:number, dw:number, dh:number}}
     */
    getSeamSafeCrop() {
      const sx = 0;
      const sy = 0;
      const sw = Math.max(0, (this.img?.width ?? 0) - 2);
      const sh = Math.max(0, (this.img?.height ?? 0) - 2);
      return { sx, sy, sw, sh, dx: this.x, dy: this.y, dw: this.width, dh: this.height };
    }

    /**
     * Draws the image using a crop rectangle.
     * @param {CanvasRenderingContext2D} ctx
     * @param {{sx:number, sy:number, sw:number, sh:number, dx:number, dy:number, dw:number, dh:number}} crop
     * @returns {void}
     */
    drawCropped(ctx, crop) {
      if (!this.img) return;
      ctx.drawImage(this.img, crop.sx, crop.sy, crop.sw, crop.sh, crop.dx, crop.dy, crop.dw, crop.dh);
    }
}
