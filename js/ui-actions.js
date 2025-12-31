document.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-action]");
  if (!btn) return;

  const action = btn.dataset.action;

  switch (action) {
    case "start-game":
      init();
      break;

    case "open-instructions":
      document.getElementById("instructionsDialog")?.showModal?.();
      break;

    case "close-instructions":
      document.getElementById("instructionsDialog")?.close?.();
      break;

    case "open-legal":
      openLegal();
      break;

    case "close-legal":
      closeLegal();
      break;

    case "restart-game":
      restartGame();
      break;

    case "return-menu":
      returnToMenu();
      break;

    case "toggle-mute":
      toggleMute();
      break;

    case "fullscreen":
      // Fullscreen muss direkt aus einer User-Geste (Klick/Tap) heraus aufgerufen werden.
      // KEIN .click()-Proxy (würde rekursiv werden, wenn der Button selbst data-action="fullscreen" trägt).
      if (typeof window.toggleFullscreen === 'function') {
        window.toggleFullscreen();
      }
      break;
  }
});

// Start auch per Klick/Tap aufs Canvas (wie dein Hint)
document.addEventListener("pointerdown", (e) => {
  if (e.target?.id !== "canvas") return;
  const start = document.getElementById("startScreen");
  if (start && !start.hidden) init();
});
function openLegal() {
  const dlg = document.getElementById("legalDialog");
  if (!dlg) return;
  if (!dlg.open) dlg.showModal();
}

function closeLegal() {
  const dlg = document.getElementById("legalDialog");
  if (!dlg) return;
  if (dlg.open) dlg.close();
}


