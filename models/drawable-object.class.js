class DrawableObject {
    x;
    y;
    height;
    width;
    img;
    imageCache = {};
    currentImage = 0;

    /**
     * Function to load a image according to its path.
     * @param {string} path - The path of the image.
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Function to load and store the images of an array.
     * @param {string} imageArray - The array of movement images.
     */
    loadImages(imageArray) {
        imageArray.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    /**
     * Function to draw the object.
     * @param {context} ctx - The context in 2D.
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
     * Function to draw a frame around the moveable objects and their offsets points.
     * @param {context} ctx - The context in 2D.
     */
  /**
   * Draws debug frames for selected object types (developer mode).
   * @param {CanvasRenderingContext2D} ctx
   * @returns {void}
   */
  drawFrame(ctx) {
    if (!this.shouldDrawDebugFrame()) return;
    this.drawDebugBoundingBox(ctx);
    this.drawDebugOffsetPoints(ctx);
  }

  /**
   * @returns {boolean}
   */
  shouldDrawDebugFrame() {
    return (
      this instanceof Character
      || this instanceof Chicken
      || this instanceof Chick
      || this instanceof Endboss
      || this instanceof ThrowableObject
      || this instanceof Bottle
      || this instanceof Coin
    );
  }

  /**
   * @param {CanvasRenderingContext2D} ctx
   * @returns {void}
   */
  drawDebugBoundingBox(ctx) {
    ctx.beginPath();
    ctx.lineWidth = 4;
    ctx.strokeStyle = 'blue';
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.stroke();
  }

  /**
   * Draws offset marker points for more accurate collision debugging.
   * @param {CanvasRenderingContext2D} ctx
   * @returns {void}
   */
  drawDebugOffsetPoints(ctx) {
    const o = this.offset || { x: 0, y: 0, width: 0, height: 0 };
    const isCharacter = this instanceof Character;
    const baseY = this.y + (isCharacter ? o.y + 100 : o.y);
    this.drawDebugPoint(ctx, this.x + o.x, baseY, 'red');
    this.drawDebugPoint(ctx, this.x + o.x + this.width - o.width, baseY, 'red');
  }

  /**
   * @param {CanvasRenderingContext2D} ctx
   * @param {number} x
   * @param {number} y
   * @param {string} color
   * @returns {void}
   */
  drawDebugPoint(ctx, x, y, color) {
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(x, y, 20, 0, 2 * Math.PI);
    ctx.fill();
  }
}
