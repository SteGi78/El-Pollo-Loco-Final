// ============================================================
//  Endboss Animations (prototype split)
// ============================================================

/**
 * Function to manage the animations and movements.
 */
Endboss.prototype.animate = function () {
  this._startBossLoop();
  this._startAlertAnimation();
};

Endboss.prototype._finishHurting = function () {
  this.hurtAnimation = this.cancelAnimation(this.hurtAnimation);
  if (this.isDead()) return;
  this.restoreSpeed();
  this.isWalking();
  this.booster += 15;
};


Endboss.prototype._handleBossAttack = function () {
  if (!this.isColliding(this.world.character) || this.isDead()) return;
  this.isAttacking();
};


Endboss.prototype._handleBossIntro = function () {
  if (this.bossIntro || !this.world.isCharacterTooFar) return false;
  if (this.world.isCharacterTooFar(this)) return false;
  this.runIntroConditions();
  return true;
};


Endboss.prototype._handleBossHurt = function () {
  if (!this.isHurt() || !this.newHit()) return false;
  this.runHurtConditions();
  return true;
};


Endboss.prototype._handleBossDeath = function () {
  if (!this.isDead()) return false;
  this.runDeathConditions();
  return true;
};


Endboss.prototype._isWorldReady = function () {
  return !!(this.world && this.world.character);
};


Endboss.prototype._tickBoss = function () {
  if (!this._isWorldReady()) return;
  if (this._handleBossDeath()) return;
  if (this._handleBossHurt()) return;
  if (this._handleBossIntro()) return;
  this._handleBossAttack();
};


Endboss.prototype._startAlertAnimation = function () {
  this.animationIntervals = this.playAnimation(this.IMAGES_ALERT, 500);
};


Endboss.prototype._startBossLoop = function () {
  this.runInterval = setInterval(() => this._tickBoss(), 150);
};

;

/**
 * Function to handle the walking animation.
 */
Endboss.prototype.isWalking = function () {
  if (this.animationIntervals) this.stopAnimation();
  if (!this.walkAnimation) {
    this.walkAnimation = this.playAnimation(this.IMAGES_WALKING, false, true);
  }
};

/**
 * Function to handle the hurting animation.
 */
Endboss.prototype.isHurting = function () {
  if (this.hurtAnimation || this.isDead()) return;
  this.cancelAllAnimations();
  this.hurtAnimation = this.playAnimation(this.IMAGES_HURT, 200);
  setTimeout(() => this._finishHurting(), 1200);
};
;

/**
 * Function to handle the attacking animation.
 */
Endboss.prototype.isAttacking = function () {
  if (!this.attackAnimation) {
    this.cancelAllAnimations();

    if (this.walkAnimation) {
      this.collisionPause();
      this.walkAnimation = this.cancelAnimation(this.walkAnimation);
    }

    this.attackAnimation = this.playAnimation(this.IMAGES_ATTACK, 150);
    this.cancelAttack();
  }
};

/**
 * Function to cancel the attacking animation.
 */
Endboss.prototype.cancelAttack = function () {
  clearTimeout(this.timeoutId);
  this.timeoutId = setTimeout(() => {
    this.attackAnimation = this.cancelAnimation(this.attackAnimation);
    if (!this.isDead()) {
      this.restoreSpeed();
      this.isWalking();
    }
  }, 1800);
};

/**
 * Function to cancel all animations except death animation.
 */
Endboss.prototype.cancelAllAnimations = function () {
  this.stopAnimation();
  this.hurtAnimation = this.cancelAnimation(this.hurtAnimation);
  this.walkAnimation = this.cancelAnimation(this.walkAnimation);
  this.attackAnimation = this.cancelAnimation(this.attackAnimation);
};

/**
 * Function to show death animation.
 */
Endboss.prototype.endBossDead = function () {
  if (!this.deathAnimation) {
    this.deathAnimation = this.playAnimation(this.IMAGES_DEAD, 150);
    clearTimeout(this.timeoutId);
    this.timeoutId = null;
    setTimeout(() => {
      this.cancelAnimation(this.deathAnimation);
      this.loadImage("img/4_enemie_boss_chicken/5_dead/G26.png");
    }, 300);
  }
};
