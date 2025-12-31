
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
class BottleBar extends StatusBar{
    width = 200;
    height = 60;
    x = 10;
    y= 90;
    
    IMAGES = [
        "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png",
        "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/10.png",
        "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png",
        "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/30.png",
        "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png",
        "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/50.png",
        "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png",
        "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/70.png",
        "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png",
        "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/90.png",
        "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png",
    ]

    percentage = 0;

    
    /**
     * Bottle bar has 11 images (0..100 in 10er Schritten).
     * Therefore we override StatusBar.updateStatusBar() (which only supports 6 images).
     * @returns {number} index in IMAGES array (0..10)
     */
    updateStatusBar() {
        const pct = Math.max(0, Math.min(100, this.percentage));
        if (pct >= 100) return 10;
        return Math.floor(pct / 10);
    }

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.setPercentage(0);
    }
}