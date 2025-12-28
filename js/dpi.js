<<<<<<< HEAD
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
=======
// ==== El Pollo Loco - DPI/Retina Fix (canvas id="canvas") ====
(function(){
  const canvas = document.getElementById('canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function fitCanvasToCssSize() {
    const dpr = Math.max(1, window.devicePixelRatio || 1);
    const rect = canvas.getBoundingClientRect();
    const w = Math.round(rect.width * dpr);
    const h = Math.round(rect.height * dpr);
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width  = w;
      canvas.height = h;
      // Logische Einheiten auf CSS-Pixel skalieren
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    // Optional: Wenn deine Engine Viewport braucht:
    // if (window.world && typeof window.world.setViewport === 'function') {
    //   window.world.setViewport(rect.width, rect.height);
    // }
  }

  window.addEventListener('resize', fitCanvasToCssSize);
  // Nach dem ersten Layout:
  requestAnimationFrame(fitCanvasToCssSize);
})();
>>>>>>> c8f4fc3242a73c5fc6378c8305766fb02549da37
