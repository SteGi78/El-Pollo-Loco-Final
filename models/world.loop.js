// ============================================================
//  World Loop / Throw / Boss-Escape
// ============================================================

World.prototype.setWorld = function () {
  this.level.endboss[0].world = this;
};

World.prototype.run = function () {
  this.runInterval = setInterval(() => {
    this.checkCollisionsWithEnemies();
    this.checkCollisionsWithEndboss();
    this.checkThrowObjects();
    this.checkBottleCollided();
    this.checkBottleSplashed();
    this.checkDeathsAfterCollision();
    this.collectingBottle();
    this.collectingCoin();
    this.checkBossEscaping();
  }, 1000 / 60);
};

World.prototype.stopLoops = function () {
  if (this.requestId) {
    cancelAnimationFrame(this.requestId);
    this.requestId = null;
  }
  if (this.runInterval) {
    clearInterval(this.runInterval);
    this.runInterval = null;
  }
};

World.prototype.checkThrowObjects = function () {
  if (this.keyboard.D && this.canThrowObject()) {
    let x = (!this.character.otherDirection)
      ? this.character.x + this.character.width - this.character.offset.right - 40
      : this.character.x + this.character.offset.left - 40;
    let y = this.character.y + this.character.offset.top;

    let bottle = new ThrowableObject(x, y, this.character.otherDirection);
    this.throwableObjects.push(bottle);

    this.lastBottleThrown = new Date().getTime();
    playSound('bottleThrow');

    this.bottle_collected = Math.max(0, this.bottle_collected - 1);
    this.updateBottleBar();
  }
};

World.prototype.downgradeBottleBar = function () {
  // kompatibel behalten: alter Name, neue Logik
  this.updateBottleBar();
};

World.prototype.canThrowObject = function () {
  let timePassed = new Date().getTime() - this.lastBottleThrown;
  timePassed /= 1000;
  return timePassed > 1 && this.bottle_collected > 0 && !this.character.gettingHit;
};

World.prototype.checkBossEscaping = function () {
  if ((this.level.endboss[0].x < -200 && this.character.x >= 100) ||
    (this.character.x - this.level.endboss[0].x > 1000) ||
    this.allBottlesUsed()) {
    this.gameOver(false);
  }
};

World.prototype.allBottlesUsed = function () {
  return this.throwableObjects.length == 0 && this.bottle_collected == 0 && this.level.bottles.length == 0;
};
