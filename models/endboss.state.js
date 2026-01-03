/**
 * Datei: merge/models/endboss.state.js
 * Beschreibung: Teil des Browser-Spiels „El Pollo Loco“. Enthält Logik, Klassen und/oder Hilfsfunktionen.
 * Hinweis: Wird im Frontend (HTML/CSS/JavaScript) ausgeführt.
 * @author Stephan Gilles
 * @date 03.01.2026
 */

// ============================================================
//  Endboss State / Logic (prototype split)
// ============================================================

Endboss.prototype.collisionPause = function () {
  this.speed = 0;
};

Endboss.prototype.restoreSpeed = function () {
  this.speed = 20 + this.booster;
};

Endboss.prototype.runDeathConditions = function () {
  this.speed = 0;
  this.cancelAllAnimations();
  this.updateStatusBar();
  this.endBossDead();
};

Endboss.prototype.runHurtConditions = function () {
  this.updateStatusBar();
  this.lastEnergy = this.energy;
  this.isHurting();
};

Endboss.prototype.runIntroConditions = function () {
  playSound('bossIntro');
  setTimeout(() => {
    this.bossIntro = true;
    this.isWalking();
  }, 1500);
};

Endboss.prototype.newHit = function () {
  return this.energy !== this.lastEnergy;
};

Endboss.prototype.updateStatusBar = function () {
  let percentage = (this.energy > 0 && this.energy < 30) ? 30 : this.energy;
  this.world.endBossBar.setPercentage(percentage);
};


Endboss.prototype.hit = function () {
  this.hurtSound();
  if (this._bottleHits == null) this._bottleHits = 0;
  this._bottleHits += 1;
  this.lastHit = Date.now();
  if (this._bottleHits % 2 !== 0) return;
  this.energy = Math.max(0, this.energy - 20);
};
