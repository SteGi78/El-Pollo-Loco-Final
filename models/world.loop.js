/**
 * Datei: merge/models/world.loop.js
 * Beschreibung: Teil des Browser-Spiels „El Pollo Loco“. Enthält Logik, Klassen und/oder Hilfsfunktionen.
 * Hinweis: Wird im Frontend (HTML/CSS/JavaScript) ausgeführt.
 * @author Stephan Gilles
 * @date 03.01.2026
 */

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
  if (!this._shouldThrowBottle()) return;
  const pos = this._getBottleSpawnPosition();
  const bottle = new ThrowableObject(pos.x, pos.y, this.character.otherDirection);
  this._commitBottleThrow(bottle);
};

World.prototype._commitBottleThrow = function (bottle) {
  this.throwableObjects.push(bottle);
  this.lastBottleThrown = Date.now();
  playSound("bottleThrow");
  this.bottle_collected = Math.max(0, this.bottle_collected - 1);
  this.updateBottleBar();
};


World.prototype._getBottleSpawnX = function () {
  const right = this.character.width - this.character.offset.right - 40;
  const left = this.character.offset.left - 40;
  return this.character.x + (this.character.otherDirection ? left : right);
};


World.prototype._getBottleSpawnPosition = function () {
  const x = this._getBottleSpawnX();
  const y = this.character.y + this.character.offset.top;
  return { x, y };
};


World.prototype._shouldThrowBottle = function () {
  return this.keyboard.D && this.canThrowObject();
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
  if (this.isDestroyed) return;

  const boss = this.level?.endboss?.[0];
  // Wenn der Boss bereits tot ist, darf hier KEIN "Escape-Loss" mehr triggern.
  if (boss && typeof boss.isDead === 'function' && boss.isDead()) return;

  const bossEscapedLeft = boss && boss.x < -200 && this.character.x >= 100;
  const bossTooFarAway = boss && (this.character.x - boss.x > 1000);

  if (bossEscapedLeft || bossTooFarAway || this.allBottlesUsed()) {
    this.gameOver(false);
  }
};

World.prototype.allBottlesUsed = function () {
  const boss = this.level?.endboss?.[0];
  if (boss && typeof boss.isDead === 'function' && boss.isDead()) return false;
  return this.throwableObjects.length == 0 && this.bottle_collected == 0 && this.level.bottles.length == 0;
};
