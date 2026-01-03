/**
 * Datei: merge/models/character.control.js
 * Beschreibung: Teil des Browser-Spiels „El Pollo Loco“. Enthält Logik, Klassen und/oder Hilfsfunktionen.
 * Hinweis: Wird im Frontend (HTML/CSS/JavaScript) ausgeführt.
 * @author Stephan Gilles
 * @date 03.01.2026
 */

// ============================================================
//  Character Controls / Movement / Status
// ============================================================

Character.prototype.runControl = function () {
  this.runInterval = setInterval(() => this._tickControl(), 1000 / 60);
};

Character.prototype._maybeEndHitStun = function () {
  const timePassed = (Date.now() - this.lastHit) / 1000;
  if (timePassed > 1) this.gettingHit = false;
};


Character.prototype._endHitStun = function () {
  this.speed = 10;
  this.gettingHit = false;
};


Character.prototype._startHitStun = function () {
  this.hit();
  this.speed = 2;
  this.gettingHit = true;
  setTimeout(() => this._endHitStun(), 500);
};


Character.prototype._isJumpPressed = function () {
  return this.world.keyboard.UP || this.world.keyboard.SPACE;
};


Character.prototype._walkByInput = function () {
  this.longIdle = false;
  this.idleStart = false;
  this.isWalking(this.world.keyboard.RIGHT);
};


Character.prototype._canMoveHorizontally = function () {
  return (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x)
    || (this.world.keyboard.LEFT && this.x > 0);
};


Character.prototype._handleMovementInput = function () {
  if (this._canMoveHorizontally()) this._walkByInput();
  if (this._isJumpPressed()) this.isJumping();
};


Character.prototype._tickControl = function () {
  if (!this.isDead()) this._handleMovementInput();
  this.isAfterJump();
  this.positionCameraX();
};


Character.prototype.isAfterJump = function () {
  if (this.isAboveGround()) {
    this.afterJump = true;
  } else {
    this.afterJump = false;
  }
};

Character.prototype.isWalking = function (right) {
  playSound('walk');
  if (right) {
    this.moveRight();
  } else {
    this.moveLeft();
  }
};

Character.prototype.jump = function () {
  this.speedY = 20;
  this.y = this.speedY;
};

Character.prototype.isJumping = function () {
  if (!this.isAboveGround()) {
    playSound('jump');
    this.jump();
  }
};

Character.prototype.takingHit = function () {
  if (!this.gettingHit) return this._startHitStun();
  this._maybeEndHitStun();
};

Character.prototype.positionCameraX = function () {
  if (this.world.level.endboss[0].x > this.x - 350 && !this.endBossEscaping) {
    this.world.cam_x = -this.x + 100;
  } else {
    this.world.cam_x = -this.x + 500;
    if (!this.endBossEscaping) this.endBossEscaping = true;
  }
};

Character.prototype.updateStatusBar = function () {
  let percentage = (this.energy > 0 && this.energy < 30) ? 30 : this.energy;
  this.world.statusBar.setPercentage(percentage);
};
