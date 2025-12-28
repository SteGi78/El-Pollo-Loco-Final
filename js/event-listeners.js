function ensureKeyboard() {
  if (!window.keyboard) {
    window.keyboard = new Keyboard();
  }
  return window.keyboard;
}

window.addEventListener("keydown", (event) => {
  const kb = ensureKeyboard();
  let handled = false;
  switch(event.code) {
    case 'ArrowUp': kb.UP = true; handled = true; break;
    case 'ArrowDown': kb.DOWN = true; handled = true; break;
    case 'ArrowLeft': kb.LEFT = true; handled = true; break;
    case 'ArrowRight': kb.RIGHT = true; handled = true; break;
    case 'Space': kb.SPACE = true; handled = true; break;
    case 'KeyD': kb.D = true; handled = true; break;
  }
  if (handled) event.preventDefault();
});

window.addEventListener("keyup", (event) => {
  const kb = ensureKeyboard();
  switch(event.code) {
    case 'ArrowUp': kb.UP = false; break;
    case 'ArrowDown': kb.DOWN = false; break;
    case 'ArrowLeft': kb.LEFT = false; break;
    case 'ArrowRight': kb.RIGHT = false; break;
    case 'Space': kb.SPACE = false; break;
    case 'KeyD': kb.D = false; break;
  }
});
