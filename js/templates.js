/**
 * Template loader (HTML partials).
 * Loads UI fragments into #ui-root and the rotate notice into #overlay-root / body.
 */

/**
 * Fetches an HTML template file.
 * @param {string} path
 * @returns {Promise<string>}
 */
async function fetchHTML(path) {
  const res = await fetch(path, { cache: "no-store" });
  if (!res.ok) throw new Error(`Template nicht gefunden: ${path}`);
  return await res.text();
}

/**
 * Inserts HTML into a target element using a <template> node.
 * @param {HTMLElement} targetEl
 * @param {string} html
 * @returns {void}
 */
function insertHTML(targetEl, html) {
  const tpl = document.createElement("template");
  tpl.innerHTML = html.trim();
  targetEl.appendChild(tpl.content);
}

/**
 * Loads all templates into the DOM (idempotent).
 * @returns {Promise<void>}
 */
async function loadTemplates() {
  const root = getTemplateRoot();
  if (!root || isAlreadyLoaded(root)) return;

  const overlayRoot = getOverlayRoot();
  await loadRootTemplates(root);
  await loadRotateNotice(overlayRoot);
  notifyTemplatesLoaded();
}

/**
 * @returns {HTMLElement|null}
 */
function getTemplateRoot() {
  return document.getElementById("ui-root");
}

/**
 * @returns {HTMLElement}
 */
function getOverlayRoot() {
  return document.getElementById("overlay-root") || document.body;
}

/**
 * Marks the root as loaded and prevents duplicate loading.
 * @param {HTMLElement} root
 * @returns {boolean} True if already loaded.
 */
function isAlreadyLoaded(root) {
  if (root.dataset.loaded === "1") return true;
  root.dataset.loaded = "1";
  return false;
}

/**
 * Loads templates that belong inside the app root.
 * @param {HTMLElement} root
 * @returns {Promise<void>}
 */
async function loadRootTemplates(root) {
  for (const file of getRootTemplateFiles()) {
    const html = await fetchHTML(file);
    insertHTML(root, html);
  }
}

/**
 * @returns {string[]}
 */
function getRootTemplateFiles() {
  return [
    "./templates/startScreen.html",
    "./templates/gameOverScreen.html",
    "./templates/instructionsDialog.html",
    "./templates/legalDialog.html",
    "./templates/muteBtn.html",
    "./templates/mobileControls.html",
    "./templates/footer.html"
  ];
}

/**
 * Loads the rotate notice overlay outside of <main>.
 * @param {HTMLElement} overlayRoot
 * @returns {Promise<void>}
 */
async function loadRotateNotice(overlayRoot) {
  const rotateHTML = await fetchHTML("./templates/rotateNotice.html");
  insertHTML(overlayRoot, rotateHTML);
}

/**
 * Signals that all templates are present in the DOM.
 * @returns {void}
 */
function notifyTemplatesLoaded() {
  window.dispatchEvent(new Event("epl:templates-loaded"));
}

// sofort starten (defer scripts)
loadTemplates().catch((err) => console.error(err));
