async function fetchHTML(path) {
  const res = await fetch(path, { cache: "no-store" });
  if (!res.ok) throw new Error(`Template nicht gefunden: ${path}`);
  return await res.text();
}

function insertHTML(targetEl, html) {
  const tpl = document.createElement("template");
  tpl.innerHTML = html.trim();
  targetEl.appendChild(tpl.content);
}

async function loadTemplates() {
  const root = document.getElementById("ui-root");
  if (!root) return;

  // Rotate-Overlay muss außerhalb von <main> liegen.
  // Sonst wird es zusammen mit <main> ausgeblendet (Portrait-Lock).
  const overlayRoot = document.getElementById('overlay-root') || document.body;

  // Schutz: nicht doppelt laden
  if (root.dataset.loaded === "1") return;
  root.dataset.loaded = "1";

  // 1) Templates, die IN den App-Container gehören
  const filesInRoot = [
    "./templates/startScreen.html",
    "./templates/gameOverScreen.html",
    "./templates/instructionsDialog.html",
    "./templates/muteBtn.html",
    "./templates/mobileControls.html",
    "./templates/footer.html",
  ];

  for (const file of filesInRoot) {
    const html = await fetchHTML(file);
    insertHTML(root, html);
  }

  // 2) Rotate-Notice als echtes Overlay AUSSERHALB von <main>
  const rotateHTML = await fetchHTML("./templates/rotateNotice.html");
  insertHTML(overlayRoot, rotateHTML);

  // Signal: UI/Templates sind im DOM (wichtig für spätere Event-Bindings, z. B. Mobile Controls)
  window.dispatchEvent(new Event('epl:templates-loaded'));
}

// sofort starten (defer scripts)
loadTemplates().catch((err) => console.error(err));
