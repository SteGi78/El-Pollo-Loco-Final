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
    draw(ctx) {
        const x = Math.round(this.x);
        const y = Math.round(this.y);

        // Crop source edges to avoid alpha-border seams.
        // With large 1920px-wide PNGs downscaled to 720px, a slightly larger
        // crop is safer (some assets have a soft/transparent edge region).
        const border = 8;
        const sw = Math.max(1, this.img.width - border * 2);
        const sh = this.img.height;

        // Slight destination overdraw to cover any remaining resampling.
        ctx.drawImage(
            this.img,
            border, 0, sw, sh,
            x - 2, y, this.width + 4, this.height
        );
    }
}