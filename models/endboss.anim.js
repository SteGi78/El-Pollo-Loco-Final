// ============================================================
//  Endboss Animations (prototype split)
// ============================================================

/**
 * Function to manage the animations and movements.
 */
Endboss.prototype.animate = function () {
  this.runInterval = setInterval(() => {
    // World wird erst nach der Instanziierung gesetzt (World.setWorld()).
    // Schutz gegen Race-Condition: ohne Guard crasht das Spiel im iPad/Reload.
    if (!this.world || !this.world.character) {
      return;
    }

    if (this.isDead()) {
      this.runDeathConditions();
    } else if (this.isHurt() && this.newHit()) {
      this.runHurtConditions();
    } else if (this.world.isCharacterTooFar && !this.world.isCharacterTooFar(this) && !this.bossIntro) {
      this.runIntroConditions();
    } else if (this.isColliding(this.world.character) && !this.isDead()) {
      this.isAttacking();
    }
  }, 150);

  this.animationIntervals = this.playAnimation(this.IMAGES_ALERT, 500);
};

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
  if (!this.hurtAnimation && !this.isDead()) {
    this.cancelAllAnimations();
    this.hurtAnimation = this.playAnimation(this.IMAGES_HURT, 200);

    setTimeout(() => {
      this.hurtAnimation = this.cancelAnimation(this.hurtAnimation);
      if (!this.isDead()) {
        this.restoreSpeed();
        this.isWalking();
        this.booster += 15;
      }
    }, 1200);
  }
};

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
