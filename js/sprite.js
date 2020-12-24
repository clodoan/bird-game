class Sprite {
    constructor(animation, x, y, speed) {
        this.x = x;
        this.y = y;
        this.animation = animation;
        this.len = this.animation.length;
        this.speed = speed;
        this.index = 0;
        
        //movement
        this.push = 4;

        this.ydrag = 0.1;
        this.xdrag = 0.01;

        this.vx = 0;
        this.vy = 0;

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
        this.x -= this.vx;
        this.y += this.vy;

        this.vy += this.ydrag;
        this.vx += this.xdrag;
        
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
        this.vy = -this.push
    }

    moveDown() {
        this.vy = this.push
    }

    moveRight() {
        this.vx = -this.push
    }

    moveLeft() {
        this.vx = this.push
    }
}
