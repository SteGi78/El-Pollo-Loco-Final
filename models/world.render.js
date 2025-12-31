// ============================================================
//  World Rendering (split)
// ============================================================

World.prototype.draw = function () {
    if (this.isDestroyed) return;

    // IMPORTANT:
    // Use an integer camera translation to avoid sub-pixel rendering.
    // Sub-pixel camera movement is the #1 reason for visible 1px seams
    // between tiled background images when the canvas is CSS-scaled.
    const cam = Math.round(this.cam_x);

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // 1) World-space: Background / Clouds / Enemies / Collectables
    this.ctx.save();
    this.ctx.translate(cam, 0);
    this.drawBasicObjs();
    this.drawEnemies();
    this.drawCollectableObjs();
    this.ctx.restore();

    // 2) Screen-space UI (Bars etc.)
    this.drawFixedObjs();

    // 3) Foreground world-space: Character + Projectiles on top of UI
    // (Feedback: Pepe soll nicht "hinter" die Bars springen können.)
    this.ctx.save();
    this.ctx.translate(cam, 0);
    this.drawForegroundObjs();
    this.ctx.restore();

    this.requestId = requestAnimationFrame(() => {
        this.draw();
        this.checkOtherDirection();
    });
};

World.prototype.drawBasicObjs = function () {
    this.addObjsToMap(this.level.backgroundObjects);
    this.addObjsToMap(this.level.clouds);
};

World.prototype.drawForegroundObjs = function () {
    this.addToMap(this.character);
    this.addObjsToMap(this.throwableObjects);
};

World.prototype.drawFixedObjs = function () {
    this.addToMap(this.statusBar);
    this.addToMap(this.coinBar);
    this.addToMap(this.bottleBar);
    if (!this.isCharacterTooFar(this.level.endboss[0])) {
        this.addToMap(this.endBossBar);
    }
};

World.prototype.drawCollectableObjs = function () {
    this.addObjsToMap(this.level.bottles);
    this.addObjsToMap(this.level.coins);
};

World.prototype.isCharacterTooFar = function (endBoss) {
    return this.character.x + 590 < endBoss.x;
};

World.prototype.drawEnemies = function () {
    this.addObjsToMap(this.level.enemies);
    this.addObjsToMap(this.level.endboss);
};

World.prototype.addObjsToMap = function (objs) {
    objs.forEach((o) => {
        this.addToMap(o);
    });
};

World.prototype.addToMap = function (mo) {
    if (mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }
};

World.prototype.flipImage = function (mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
};

World.prototype.flipImageBack = function (mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
};

World.prototype.checkOtherDirection = function () {
    // Bugfix: ursprüngliches "!this.character.speed == 0" ist Precedence-fehlerhaft.
    if (this.keyboard.LEFT && this.character.speed !== 0) {
        this.character.otherDirection = true;
    }

    if (this.keyboard.RIGHT && this.character.speed !== 0) {
        this.character.otherDirection = false;
    }
};
