// ==== El Pollo Loco – Pixel-Perfect Fit ====
// Ziel:
// - Verhindert fractional CSS-Skalierung (Subpixel) des Canvas.
// - Subpixel-Skalierung ist eine häufige Ursache für 1px "Seams" (Lücken)
//   zwischen gekachelten Hintergrundbildern – selbst wenn im Canvas korrekt
//   gezeichnet wird.
//
// Strategie:
// - Wir setzen die Größe von .epl-wrap in *ganzen Pixeln* (px) und lassen den
//   Canvas weiterhin 100% davon einnehmen.
// - Seitenverhältnis bleibt 3:2 (720x480 Logik).

(function () {
  const wrap = document.querySelector('.epl-wrap');
  if (!wrap) return;

  const RATIO_W = 3;
  const RATIO_H = 2;

  function fit() {
    const isFs = !!document.fullscreenElement;

    // verfügbaren Platz bestimmen
    // - In normaler Ansicht: max 96vw und 96vh (damit keine Scrollbars entstehen)
    // - Im Fullscreen: 100vw/100vh
    const maxW = isFs ? window.innerWidth : Math.min(window.innerWidth * 0.96, 1280);
    const maxH = isFs ? window.innerHeight : window.innerHeight * 0.96;

    // Breite so groß wie möglich, aber begrenzt durch Höhe (3:2)
    let w = Math.floor(Math.min(maxW, (maxH * RATIO_W) / RATIO_H));
    let h = Math.floor((w * RATIO_H) / RATIO_W);

    // Minimum (verhindert 0px in sehr kleinen Viewports)
    w = Math.max(320, w);
    h = Math.max(213, h); // 320*(2/3)

    wrap.style.width = `${w}px`;
    wrap.style.height = `${h}px`;
  }

  const rafFit = () => requestAnimationFrame(fit);
  window.addEventListener('resize', rafFit, { passive: true });
  document.addEventListener('fullscreenchange', rafFit);
  requestAnimationFrame(fit);
})();
