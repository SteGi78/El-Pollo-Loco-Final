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