// ==== El Pollo Loco – DPI/Retina Fix (Canvas bleibt logisch 720x480) ====
// Warum so?
// - Das komplette Projekt (BackgroundObject, Physics, UI-Bars etc.) rechnet in 720x480.
// - Für Responsive darf nur die CSS-Größe skalieren, nicht die Logik-Auflösung.
// - Für Retina: Backing-Store auf DPR hochziehen, Logik bleibt 720x480.

(function () {
  const canvas = document.getElementById('canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');

  const BASE_W = 720;
  const BASE_H = 480;

  function applyDpi() {
    // NOTE (Windows Display Scaling):
    // Fractional devicePixelRatio values (e.g. 1.25 / 1.5) can introduce
    // subpixel sampling inside the canvas even if we draw at integer coords.
    // That often shows up as 1px seams between tiled background images.
    // We therefore snap DPR to an integer. On Retina this stays 2; on 125%
    // scaling this becomes 1, which is visually more stable for this game.
    const rawDpr = window.devicePixelRatio || 1;
    const dpr = Math.max(1, Math.round(rawDpr));
    const w = Math.round(BASE_W * dpr);
    const h = Math.round(BASE_H * dpr);

    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
    }

    // 1 Logik-Pixel bleibt 1 Einheit; der Backing-Store ist dpr-fach größer.
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // Crisp sprites + no resampling artifacts on tile borders.
    ctx.imageSmoothingEnabled = false;
  }

  window.addEventListener('resize', () => requestAnimationFrame(applyDpi), { passive: true });
  requestAnimationFrame(applyDpi);
})();
