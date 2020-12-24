class Cloud {
    constructor(image, x, y) {
        this.x = x;
        this.y = y;
        this.traspolation = 1;
        this.image = image;
    }

    show() {
        image(this.image, this.x, this.y, 200,200);
    }

    move() {
        this.x -= this.traspolation;
    }
}