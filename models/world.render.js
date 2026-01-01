// ============================================================
//  World Rendering (split)
// ============================================================

World.prototype.draw = function () {
  if (this.isDestroyed) return;
  const cam = this._getSnappedCameraX();
  this._clearCanvas();
  this._drawWorldLayer(cam);
  this.drawFixedObjs();
  this._drawForegroundLayer(cam);
  this._scheduleNextFrame();
};

World.prototype._renderFrame = function () {
  this.draw();
  this.checkOtherDirection();
};


World.prototype._scheduleNextFrame = function () {
  this.requestId = requestAnimationFrame(() => this._renderFrame());
};


World.prototype._drawForegroundLayer = function (cam) {
  this.ctx.save();
  this.ctx.translate(cam, 0);
  this.drawForegroundObjs();
  this.ctx.restore();
};


World.prototype._drawWorldLayer = function (cam) {
  this.ctx.save();
  this.ctx.translate(cam, 0);
  this.drawBasicObjs();
  this.drawEnemies();
  this.drawCollectableObjs();
  this.ctx.restore();
};


World.prototype._clearCanvas = function () {
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
};


World.prototype._getSnappedCameraX = function () {
  return (this.cam_x ?? this.camera_x ?? 0) | 0;
};

;

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
