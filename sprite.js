class Sprite {
    constructor(animation, x, y, speed, upImg) {
        this.x = x;
        this.y = y;
        this.animation = animation;
        this.len = this.animation.length;
        this.speed = speed;
        this.index = 0;
        this.up = upImg;
        
        //movement
        this.agility = 20;
        this.gravity = 0.8;
        this.velocity = 0;
    }

    show() {
        let index = floor(this.index) % this.len;
        // imageMode(CENTER);
        image(this.animation[index], this.x, this.y);
    }

    animate() {
        this.index += this.speed;
    }

    hits(bottle) {
        return collideRectRect(this.x, this.y, 24, 24, bottle.x, bottle.y, 64, 64);
    }

    //movements
    moveUp() {
        this.y += -this.agility;    
        if (this.y < 0) {
            this.y = height - this.agility;
        }
        
    }

    moveDown() {
        this.y += this.agility;
        if (this.y > height) {
            this.y = this.agility;
        }
    }

    moveRight() {
        this.x += this.agility
        if (this.x > width) {
            this.x = -this.agility;
        }
    }

    moveLeft() {
        this.x += -this.agility
        if (this.x < 0) {
            this.x = width - this.agility;
        }
    }
}
