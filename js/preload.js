/**
 * Simple asset preloader.
 * Keeps a cache of already loaded images to reduce start stutter.
 */

const imagesToPreload = [
  // Hier nur relevante Assets für den Start
  "img/5_background/layers/3_third_layer/1.png"
  // ... bei Bedarf erweitern
];

const preloadedImages = {};

/**
 * Preloads images and calls the callback when finished.
 * @param {Function} [callback]
 * @returns {void}
 */
function preloadImages(callback) {
  if (!imagesToPreload.length) return safeCallback(callback);

  let loaded = 0;
  for (const src of imagesToPreload) {
    preloadSingle(src, () => {
      loaded += 1;
      if (loaded === imagesToPreload.length) safeCallback(callback);
    });
  }
}

/**
 * Preloads a single image.
 * @param {string} src
 * @param {Function} done
 * @returns {void}
 */
function preloadSingle(src, done) {
  const img = new Image();
  img.onload = handlePreloadDone.bind(null, src, img, done);
  img.onerror = handlePreloadDone.bind(null, src, null, done);
  img.src = src;
}

/**
 * Stores a successfully loaded image and continues the preload chain.
 * @param {string} src
 * @param {HTMLImageElement|null} img
 * @param {Function} done
 * @returns {void}
 */
function handlePreloadDone(src, img, done) {
  if (img) preloadedImages[src] = img;
  done();
}

/**
 * Calls a callback only if it is a function.
 * @param {Function} callback
 * @returns {void}
 */
function safeCallback(callback) {
  if (typeof callback === "function") callback();
}

// preloadImages(init);
