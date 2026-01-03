/**
 * Datei: merge/models/character.anim.js
 * Beschreibung: Teil des Browser-Spiels „El Pollo Loco“. Enthält Logik, Klassen und/oder Hilfsfunktionen.
 * Hinweis: Wird im Frontend (HTML/CSS/JavaScript) ausgeführt.
 * @author Stephan Gilles
 * @date 03.01.2026
 */

// ============================================================
//  Character Animations (prototype split)
// ============================================================

Character.prototype.animate = function () {
  this.runControl();
  this._animState = "idle";
  this.animationIntervals = setInterval(() => this._tickAnimation(), 150);
};

Character.prototype._shouldUseLongIdle = function (currentImage) {
  return (this.idleStart && currentImage % 35 === 0) || this.longIdle;
};


Character.prototype._startIdleIfNeeded = function () {
  if (this.idleStart || this.longIdle) return;
  this.currentImage = 0;
  this.idleStart = true;
};


Character.prototype._resetLongIdle = function (arr) {
  this.longIdle = false;
  this.idleStart = false;
  return arr;
};


Character.prototype._isBottleThrowLocked = function () {
  return !this.world.canThrowObject() && this.world.lastBottleThrown != 0;
};


Character.prototype._shouldCancelLongIdle = function (idle) {
  return !idle || this.afterJump || this.isAboveGround() || this._isBottleThrowLocked();
};


Character.prototype._playAnimState = function (state) {
  if (state === "dead") return this.playDeathAnimation();
  if (state === "hurt") return this.playAnimation(this.IMAGES_HURT);
  if (state === "jump") return this.playAnimation(this.IMAGES_JUMPING);
  if (state === "walk") return this.playAnimation(this.IMAGES_WALKING);
  this.playAnimation(this.IMAGES_IDLE, true);
};


Character.prototype._shouldResetAnimFrame = function (state) {
  return state === "jump" || state === "hurt" || state === "dead";
};


Character.prototype._syncAnimState = function (nextState) {
  if (nextState === this._animState) return;
  this._animState = nextState;
  if (this._shouldResetAnimFrame(nextState)) this.currentImage = 0;
};


Character.prototype._getNextAnimState = function () {
  if (this.isDead()) return "dead";
  if (this.isHurt()) return "hurt";
  if (this.isAboveGround()) return "jump";
  if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) return "walk";
  return "idle";
};


Character.prototype._tickAnimation = function () {
  const nextState = this._getNextAnimState();
  this._syncAnimState(nextState);
  this._playAnimState(nextState);
};


Character.prototype.playAnimation = function (arr, idle) {
  arr = this.isLongIdle(this.currentImage, arr, idle);
  let i = this.currentImage % arr.length;
  let path = arr[i];
  this.img = this.imageCache[path];
  this.currentImage++;
};

Character.prototype.isLongIdle = function (currentImage, arr, idle) {
  if (this._shouldCancelLongIdle(idle)) return this._resetLongIdle(arr);
  this._startIdleIfNeeded();
  if (this._shouldUseLongIdle(currentImage)) return this.IMAGES_LONG_IDLE;
  this.longIdle = false;
  return arr;
};

Character.prototype.playDeathAnimation = function () {
  this.speed = 0;
  this.deathAnimation = this.playAnimation(this.IMAGES_DEAD);
  setTimeout(() => {
    clearInterval(this.deathAnimation);
  }, 350);
};
