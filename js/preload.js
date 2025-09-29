
const imagesToPreload = [
    // Hier nur relevante Assets für den Start
    "img/5_background/layers/3_third_layer/1.png",
    // ...
];
let preloadedImages = {};
function preloadImages(callback) {
    let loaded = 0;
    imagesToPreload.forEach(src => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
            loaded++;
            preloadedImages[src] = img;
            if (loaded === imagesToPreload.length && typeof callback === 'function') {
                callback();
            }
        };
        img.onerror = () => {
            loaded++;
            if (loaded === imagesToPreload.length && typeof callback === 'function') {
                callback();
            }
        };
    });
}
// preloadImages(init);
