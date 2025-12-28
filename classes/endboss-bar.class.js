
/**
 * Maps arbitrary bar value (0-100) to closest existing asset (0,20,40,60,80,100).
 * @param {number} val
 * @returns {number} allowed value
 */
function getAllowedBarValue(val) {
    const allowed = [0,20,40,60,80,100];
    return Math.max(...allowed.filter(v=>v<=val));
}


function getAvailableStatusbarValue(val) {
    const available = [0, 20, 40, 60, 80, 100];
    return Math.max(...available.filter(v => v <= val));
}
class EndbossBar extends StatusBar {
    x = 500;
    y = 0;
    width = 200;
    height = 60;

    IMAGES = [
        "img/7_statusbars/2_statusbar_endboss/bar/0.png",
        "img/7_statusbars/2_statusbar_endboss/bar/20.png",
        "img/7_statusbars/2_statusbar_endboss/bar/40.png",
        "img/7_statusbars/2_statusbar_endboss/bar/60.png",
        "img/7_statusbars/2_statusbar_endboss/bar/80.png",
        "img/7_statusbars/2_statusbar_endboss/bar/100.png"
    ];

    percentage = 100;

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.setPercentage(100);
    }
}
