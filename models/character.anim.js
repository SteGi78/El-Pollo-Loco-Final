// ============================================================
//  Character Animations (prototype split)
// ============================================================

/**
 * Function to manage the animations.
 * WICHTIG: Jump-Animation läuft, solange der Charakter in der Luft ist
 * (nicht nur solange die Taste gedrückt wird).
 */
Character.prototype.animate = function () {
  this.runControl();
  this._animState = "idle";

  this.animationIntervals = setInterval(() => {
    let nextState = "idle";

    if (this.isDead()) nextState = "dead";
    else if (this.isHurt()) nextState = "hurt";
    else if (this.isAboveGround()) nextState = "jump";
    else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) nextState = "walk";

    if (nextState !== this._animState) {
      this._animState = nextState;
      if (nextState === "jump" || nextState === "hurt" || nextState === "dead") {
        this.currentImage = 0;
      }
    }

    if (nextState === "dead") {
      this.playDeathAnimation();
    } else if (nextState === "hurt") {
      this.playAnimation(this.IMAGES_HURT);
    } else if (nextState === "jump") {
      this.playAnimation(this.IMAGES_JUMPING);
    } else if (nextState === "walk") {
      this.playAnimation(this.IMAGES_WALKING);
    } else {
      this.playAnimation(this.IMAGES_IDLE, true);
    }
  }, 150);
};

/**
 * Function represents the sequence of images to be animated.
 * @param {Array} arr - The array of images to be animated.
 * @param {boolean} idle - The value must be true when the idle animation is wished.
 */
Character.prototype.playAnimation = function (arr, idle) {
  arr = this.isLongIdle(this.currentImage, arr, idle);
  let i = this.currentImage % arr.length;
  let path = arr[i];
  this.img = this.imageCache[path];
  this.currentImage++;
};

/**
 * Function to control the long idle animation.
 * @param {number} currentImage - The current image of the array
 * @param {Array} arr - The array of images to be animated.
 * @param {boolean} idle - The value must be true when the idle animation is wished.
 * @returns {Array} - The array of images.
 */
Character.prototype.isLongIdle = function (currentImage, arr, idle) {
  if (!idle || this.afterJump || this.isAboveGround() || (!this.world.canThrowObject() && this.world.lastBottleThrown != 0)) {
    this.longIdle = false;
    this.idleStart = false;
    return arr;
  } else if (!this.idleStart && !this.longIdle) {
    this.currentImage = 0;
    this.idleStart = true;
  }

  if (this.idleStart && currentImage % 35 == 0 || this.longIdle) {
    this.longIdle = true;
    return this.IMAGES_LONG_IDLE;
  } else {
    this.longIdle = false;
    return arr;
  }
};

/**
 * Function to play the character's death animation.
 */
Character.prototype.playDeathAnimation = function () {
  this.speed = 0;
  this.deathAnimation = this.playAnimation(this.IMAGES_DEAD);
  setTimeout(() => {
    clearInterval(this.deathAnimation);
  }, 350);
};
