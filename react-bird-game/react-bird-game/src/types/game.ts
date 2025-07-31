export class Sprite {
  x: number;
  y: number;
  animation: HTMLImageElement[];
  len: number;
  speed: number;
  index: number;
  push: number;
  ydrag: number;
  xdrag: number;
  vx: number;
  vy: number;

  constructor(animation: HTMLImageElement[], x: number, y: number, speed: number) {
    this.x = x;
    this.y = y;
    this.animation = animation;
    this.len = this.animation.length;
    this.speed = speed;
    this.index = 0;
    
    // Movement
    this.push = 4;
    this.ydrag = 0.1;
    this.xdrag = 0.01;
    this.vx = 0;
    this.vy = 0;
  }

  show(ctx?: CanvasRenderingContext2D) {
    if (!ctx) return;
    const index = Math.floor(this.index) % this.len;
    if (this.animation[index]) {
      ctx.drawImage(this.animation[index], this.x, this.y);
    }
  }

  animate() {
    this.index += this.speed;
  }

  hits(other: Sprite): boolean {
    return this.collideRectRect(this.x, this.y, 24, 24, other.x, other.y, 64, 64);
  }

  private collideRectRect(x1: number, y1: number, w1: number, h1: number, x2: number, y2: number, w2: number, h2: number): boolean {
    return x1 < x2 + w2 && x1 + w1 > x2 && y1 < y2 + h2 && y1 + h1 > y2;
  }

  update() {
    this.x -= this.vx;
    this.y += this.vy;

    this.vy += this.ydrag;
    this.vx += this.xdrag;
    
    // Endless canvas y
    if (this.y < 0) {
      this.y = 600; // height
    } else if (this.y > 600) {
      this.y = 0;
    }

    // Endless canvas x
    if (this.x > 800) { // width
      this.x = 0;
    } else if (this.x < 0) {
      this.x = 800;
    }
  }

  // Movements
  moveUp() {
    this.vy = -this.push;
  }

  moveDown() {
    this.vy = this.push;
  }

  moveRight() {
    this.vx = -this.push;
  }

  moveLeft() {
    this.vx = this.push;
  }
}

export class Monster {
  x: number;
  y: number;
  speed: number;
  image: HTMLImageElement;

  constructor(image: HTMLImageElement, x: number, y: number) {
    this.x = x;
    this.y = y;
    this.speed = 10 - Math.floor(Math.random() * 10);
    this.image = image;
  }

  hits(bird: Sprite): boolean {
    return this.collideRectRect(this.x, this.y, 64, 64, bird.x, bird.y, 64, 64);
  }

  private collideRectRect(x1: number, y1: number, w1: number, h1: number, x2: number, y2: number, w2: number, h2: number): boolean {
    return x1 < x2 + w2 && x1 + w1 > x2 && y1 < y2 + h2 && y1 + h1 > y2;
  }

  show(ctx: CanvasRenderingContext2D) {
    if (this.image) {
      ctx.drawImage(this.image, this.x, this.y, 64, 64);
    }
  }

  update(t: number) {
    this.y = this.y + Math.sin(4 * Math.PI * t);
  }
  
  move() {
    this.x -= this.speed;
  }
}

export class Cloud {
  x: number;
  y: number;
  traspolation: number;
  image: HTMLImageElement;

  constructor(image: HTMLImageElement, x: number, y: number) {
    this.x = x;
    this.y = y;
    this.traspolation = 1;
    this.image = image;
  }

  show(ctx: CanvasRenderingContext2D) {
    if (this.image) {
      ctx.drawImage(this.image, this.x, this.y, 200, 200);
    }
  }

  move() {
    this.x -= this.traspolation;
  }
}