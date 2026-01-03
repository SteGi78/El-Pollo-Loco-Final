/**
 * Datei: merge/js/templates.js
 * Beschreibung: Teil des Browser-Spiels „El Pollo Loco“. Enthält Logik, Klassen und/oder Hilfsfunktionen.
 * Hinweis: Wird im Frontend (HTML/CSS/JavaScript) ausgeführt.
 * @author Stephan Gilles
 * @date 03.01.2026
 */

/**
 * Funktion insertHTML.
 * @param {HTMLElement} targetEl - Parameter.
 * @param {unknown} html - Parameter.
 * @returns {void}
 */
function insertHTML(targetEl, html) {
  const tpl = document.createElement("template");
  tpl.innerHTML = html.trim();
  targetEl.appendChild(tpl.content);
}


/**
 * Funktion fillHTML.
 * @param {HTMLElement} targetEl - Parameter.
 * @param {unknown} html - Parameter.
 * @returns {void}
 */
function fillHTML(targetEl, html) {
  insertHTML(targetEl, html);
}


async function fetchHTML(url) {
  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) {
      console.error(`[templates] Konnte Template nicht laden: ${url} (${res.status})`);
      return "";
    }
    return await res.text();
  } catch (err) {
    console.error(`[templates] Fehler beim Laden von: ${url}`, err);
    return "";
  }
}


async function loadTemplates() {
  const root = getTemplateRoot();
  if (!root || isAlreadyLoaded(root)) return;

  const overlayRoot = getOverlayRoot();
  await loadRootTemplates(root);
  await loadRotateNotice(overlayRoot);
  notifyTemplatesLoaded();
}

/**
 * Funktion getTemplateRoot.
 * @returns {HTMLElement|null}
 */
function getTemplateRoot() {
  return document.getElementById("ui-root");
}

/**
 * Funktion getOverlayRoot.
 * @returns {HTMLElement|null}
 */
function getOverlayRoot() {
  return document.getElementById("overlay-root") || document.body;
}

/**
 * Funktion isAlreadyLoaded.
 * @param {HTMLElement} root - Parameter.
 * @returns {boolean}
 */
function isAlreadyLoaded(root) {
  if (root.dataset.loaded === "1") return true;
  root.dataset.loaded = "1";
  return false;
}

async function loadRootTemplates(root) {
  for (const file of getRootTemplateFiles()) {
    const html = await fetchHTML(file);
    fillHTML(root, html);
  }
}

/**
 * Funktion getRootTemplateFiles.
 * @returns {Array<unknown>}
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

async function loadRotateNotice(overlayRoot) {
  const rotateHTML = await fetchHTML("./templates/rotateNotice.html");
  fillHTML(overlayRoot, rotateHTML);
}

/**
 * Funktion notifyTemplatesLoaded.
 * @returns {void}
 */
function notifyTemplatesLoaded() {
  window.dispatchEvent(new Event("epl:templates-loaded"));
}

// sofort starten (defer scripts)
loadTemplates().catch((err) => console.error(err));
