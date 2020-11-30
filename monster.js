class Monster {
    constructor(image, x, y) {
        this.x = x;
        this.y = y; 
        this.speed = 20 - floor(random(19));
        this.image = image;
    }

    hits(bird) {
        return collideRectRect(this.x, this.y, 64, 64, bird.x, bird.y, 64, 64);
    }

    show() {
        image(this.image, this.x, this.y, 64, 64);
    }

    update(t) {
        this.y = this.y + sin(2*PI*t);
    }
    move() {
        this.x -= this.speed;
    }
}