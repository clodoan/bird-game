class Sprite {
    constructor(animation, x, y, speed) {
        this.x = x;
        this.y = y;
        this.animation = animation;
        this.len = this.animation.length;
        this.speed = speed;
        this.index = 0;
        // this.up = upImg;
        
        //movement
        this.agility = 2;
        this.xagility = 0;
        this.yagility = 0;
        // this.gravity = 0.8;
        this.velocity = 0;
    }

    show() {
        let index = floor(this.index) % this.len;
        image(this.animation[index], this.x, this.y);
    }

    animate() {
        this.index += this.speed;
    }

    hits(bottle) {
        return collideRectRect(this.x, this.y, 24, 24, bottle.x, bottle.y, 64, 64);
    }

    update() {
        this.x = this.x + this.xagility;
        this.y = this.y + this.yagility;
        
        //endless canvas y
        if (this.y < 0) {
            this.y = height;
        } else if (this.y > height) {
            this.y = 0;
        }

        //endless canvas x
        if (this.x > width) {
            this.x = 0;
        } else if (this.x < 0) {
            this.x = width;
        }
    }

    //movements
    moveUp() {
        this.yagility = -this.agility
    }

    moveDown() {
        this.yagility = this.agility;
    }

    moveRight() {
        this.xagility = this.agility;
        // this.rotate(PI / 3.0);
    }

    moveLeft() {
        this.xagility = -this.agility;
    }
}
