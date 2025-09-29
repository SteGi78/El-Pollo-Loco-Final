
window.addEventListener("keydown", (event) => {
    let handled = false;
    switch(event.code) {
        case 'ArrowUp': keyboard.UP = true; handled = true; break;
        case 'ArrowDown': keyboard.DOWN = true; handled = true; break;
        case 'ArrowLeft': keyboard.LEFT = true; handled = true; break;
        case 'ArrowRight': keyboard.RIGHT = true; handled = true; break;
        case 'Space': keyboard.SPACE = true; handled = true; break;
        case 'KeyD': keyboard.D = true; handled = true; break;
    }
    if (handled) event.preventDefault();
});
window.addEventListener("keyup", (event) => {
    switch(event.code) {
        case 'ArrowUp': keyboard.UP = false; break;
        case 'ArrowDown': keyboard.DOWN = false; break;
        case 'ArrowLeft': keyboard.LEFT = false; break;
        case 'ArrowRight': keyboard.RIGHT = false; break;
        case 'Space': keyboard.SPACE = false; break;
        case 'KeyD': keyboard.D = false; break;
    }
});
