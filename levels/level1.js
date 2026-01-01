/* global Level, Snake, Chick, Chicken, Cloud, BackgroundObject, Endboss, Bottle, Coin */

let level1;

const LEVEL_SEGMENT_WIDTH = 719;
const LEVEL1_LAST_SEGMENT = 7;

const LEVEL1_ENEMY_TYPES = [
  Snake,
  Chick,
  Chick,
  Chick,
  Snake,
  Chicken,
  Chicken,
  Chick,
  Snake,
  Chicken,
  Chicken,
  Snake,
  Chick,
  Chicken,
  Chicken
];

const LEVEL1_BG_LAYER_TEMPLATES = [
  "img/5_background/layers/air.png",
  "img/5_background/layers/3_third_layer/{v}.png",
  "img/5_background/layers/2_second_layer/{v}.png",
  "img/5_background/layers/1_first_layer/{v}.png"
];

const LEVEL1_COIN_POSITIONS = [
  [200, 150],
  [1000, 100],
  [1850, 75],
  [2750, 50],
  [4000, 50]
];

const LEVEL1_BOTTLE_COUNT = 23;
const LEVEL1_CLOUD_COUNT = 5;

/**
 * Initializes Level 1 and stores it in the global variable `level1`.
 * This function is called by the global game init flow.
 * @returns {void}
 */
function initLevel() {
  level1 = new Level(
    createLevel1Enemies(),
    createLevel1Clouds(),
    createLevel1BackgroundObjects(),
    createLevel1Endboss(),
    createLevel1Bottles(),
    createLevel1Coins()
  );
}

/**
 * Creates the enemy list for Level 1.
 * @returns {MoveableObject[]}
 */
function createLevel1Enemies() {
  return LEVEL1_ENEMY_TYPES.map((EnemyClass) => new EnemyClass());
}

/**
 * Creates the clouds for Level 1.
 * @returns {Cloud[]}
 */
function createLevel1Clouds() {
  return Array.from({ length: LEVEL1_CLOUD_COUNT }, () => new Cloud());
}

/**
 * Creates all parallax background objects for Level 1.
 * @returns {BackgroundObject[]}
 */
function createLevel1BackgroundObjects() {
  const objects = [];
  for (let segment = -1; segment <= LEVEL1_LAST_SEGMENT; segment++) {
    objects.push(...createBackgroundSegment(segment));
  }
  return objects;
}

/**
 * Creates one 4-layer parallax background segment for a given segment index.
 * @param {number} segmentIndex
 * @returns {BackgroundObject[]}
 */
function createBackgroundSegment(segmentIndex) {
  const x = segmentIndex * LEVEL_SEGMENT_WIDTH;
  const v = getLayerVariant(segmentIndex);
  return LEVEL1_BG_LAYER_TEMPLATES.map((template) => {
    const path = template.replace("{v}", String(v));
    return new BackgroundObject(path, x);
  });
}

/**
 * Returns the layer variant (1 or 2) used by background tiles.
 * @param {number} segmentIndex
 * @returns {number}
 */
function getLayerVariant(segmentIndex) {
  return segmentIndex % 2 === 0 ? 1 : 2;
}

/**
 * Creates the endboss list for Level 1.
 * @returns {Endboss[]}
 */
function createLevel1Endboss() {
  return [new Endboss()];
}

/**
 * Creates the bottle objects for Level 1.
 * @returns {Bottle[]}
 */
function createLevel1Bottles() {
  return Array.from({ length: LEVEL1_BOTTLE_COUNT }, () => new Bottle());
}

/**
 * Creates the coin objects for Level 1.
 * @returns {Coin[]}
 */
function createLevel1Coins() {
  return LEVEL1_COIN_POSITIONS.map(([x, y]) => new Coin(x, y));
}
