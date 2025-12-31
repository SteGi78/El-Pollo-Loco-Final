
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
class StatusBar extends DrawableObject{
    width = 200;
    height = 60;
    x = 10;
    y= 0;
    
    IMAGES = [
        "img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png", 
        "img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png",
        "img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png",
        "img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png",
        "img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png",
        "img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png"
    ]

    percentage = 100;

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.setPercentage(100);
        
    }

    /**
     * Function to change the status image according to the percentage.
     * @param {number} percentage - The value of the percentage.
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.updateStatusBar()]
        this.img = this.imageCache[path];
    }

    /**
     * Function to update status bar.
     */
    updateStatusBar(){
        if(this.percentage == 100){
            return 5
        }else if (this.percentage >= 80){
            return 4;
        } else if (this.percentage >= 60) {
            return 3
        } else if (this.percentage >= 40) {
            return 2
        } else if (this.percentage >= 20){
            return 1
        } else
            return 0
    }
}