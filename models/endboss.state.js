// ============================================================
//  Endboss State / Logic (prototype split)
// ============================================================

/**
 * Function to pause the end boss when it is colliding.
 */
Endboss.prototype.collisionPause = function () {
  this.speed = 0;
};

/**
 * Function to restore the end boss after collision pause.
 */
Endboss.prototype.restoreSpeed = function () {
  this.speed = 20 + this.booster;
};

/**
 * Function to handle the death conditions & animation.
 */
Endboss.prototype.runDeathConditions = function () {
  this.speed = 0;
  this.cancelAllAnimations();
  this.updateStatusBar();
  this.endBossDead();
};

/**
 * Function to handle the hurting conditions & animation.
 */
Endboss.prototype.runHurtConditions = function () {
  this.updateStatusBar();
  this.lastEnergy = this.energy;
  this.isHurting();
};

/**
 * Function to handle the intro conditions & animation.
 */
Endboss.prototype.runIntroConditions = function () {
  playSound('bossIntro');
  setTimeout(() => {
    this.bossIntro = true;
    this.isWalking();
  }, 1500);
};

/**
 * Function to check if end boss got a new hit.
 * @returns {boolean} - The value is true when energy is reduced.
 */
Endboss.prototype.newHit = function () {
  return this.energy !== this.lastEnergy;
};

/**
 * Function to update status bar according to end boss's energy.
 */
Endboss.prototype.updateStatusBar = function () {
  let percentage = (this.energy > 0 && this.energy < 30) ? 30 : this.energy;
  this.world.endBossBar.setPercentage(percentage);
};


/**
 * Endboss takes damage in "2-bottle steps":
 * - every bottle still counts as a hit (hurt animation / sound)
 * - energy is reduced only on every 2nd bottle hit (=> bar drops in 20% steps)
 */
Endboss.prototype.hit = function () {
  this.hurtSound();

  if (this._bottleHits == null) this._bottleHits = 0;
  this._bottleHits += 1;

  // mark as recently hit (used for hurt state)
  this.lastHit = new Date().getTime();

  // reduce energy only on every 2nd bottle
  if (this._bottleHits % 2 === 0) {
    this.energy -= 20;
    if (this.energy <= 0) this.energy = 0;
  }
};
