class Bottle extends MoveableObject {
    x = 450 + Math.floor(Math.random() * 3950) +  Math.floor(Math.random() * 15 + 6);
    y = 360;
    width = 80;
    height = 70;
    offset = {
        top: 10,
        bottom: 10,
        left: 20,
        right: 15
    }

    IMAGES_BOTTLE = [
        "img/6_salsa_bottle/1_salsa_bottle_on_ground.png",
        "img/6_salsa_bottle/2_salsa_bottle_on_ground.png"
    ];

    constructor() {
        super().loadImage(this.IMAGES_BOTTLE[Math.round(Math.random())]);
    }
}
