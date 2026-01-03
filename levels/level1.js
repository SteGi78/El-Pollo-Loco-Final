/**
 * Datei: merge/levels/level1.js
 * Beschreibung: Teil des Browser-Spiels „El Pollo Loco“. Enthält Logik, Klassen und/oder Hilfsfunktionen.
 * Hinweis: Wird im Frontend (HTML/CSS/JavaScript) ausgeführt.
 * @author Stephan Gilles
 * @date 03.01.2026
 */

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
 * Funktion initLevel.
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
 * Funktion createLevel1Enemies.
 * @returns {void}
 */
function createLevel1Enemies() {
  return LEVEL1_ENEMY_TYPES.map((EnemyClass) => new EnemyClass());
}

/**
 * Funktion createLevel1Clouds.
 * @returns {void}
 */
function createLevel1Clouds() {
  return Array.from({ length: LEVEL1_CLOUD_COUNT }, () => new Cloud());
}

/**
 * Funktion createLevel1BackgroundObjects.
 * @returns {void}
 */
function createLevel1BackgroundObjects() {
  const objects = [];
  for (let segment = -1; segment <= LEVEL1_LAST_SEGMENT; segment++) {
    objects.push(...createBackgroundSegment(segment));
  }
  return objects;
}

/**
 * Funktion createBackgroundSegment.
 * @param {unknown} segmentIndex - Parameter.
 * @returns {BackgroundObject}
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
 * Funktion getLayerVariant.
 * @param {unknown} segmentIndex - Parameter.
 * @returns {unknown}
 */
function getLayerVariant(segmentIndex) {
  return segmentIndex % 2 === 0 ? 1 : 2;
}

/**
 * Funktion createLevel1Endboss.
 * @returns {Array<unknown>}
 */
function createLevel1Endboss() {
  return [new Endboss()];
}

/**
 * Funktion createLevel1Bottles.
 * @returns {void}
 */
function createLevel1Bottles() {
  return Array.from({ length: LEVEL1_BOTTLE_COUNT }, () => new Bottle());
}

/**
 * Funktion createLevel1Coins.
 * @returns {void}
 */
function createLevel1Coins() {
  return LEVEL1_COIN_POSITIONS.map(([x, y]) => new Coin(x, y));
}
