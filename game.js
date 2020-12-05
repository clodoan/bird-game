//sprites
let walkSprite;
let bottleSprite;
let monsterSprite;

let walkAnimation = [];
let bottleAnimation = [];
let monsterAnimation = [];
let monsters = [];

//settings
let frameSize = 128;
let step = 20;
let t = 0;
let score = 0;
let timer = 15;

function preload(){
    upImg = loadImage('/assets/images/bird-jump-128.png');
    gameOver = loadImage('/assets/images/game-over.png');
    monster = loadImage('/assets/images/monster.png');
    fart = loadImage('/assets/images/bird-jump-128.png');
    
    walkSprite = loadImage('/assets/sprites/walk-sprite-128.png');
    bottleSprite = loadImage('/assets/sprites/bottle-sprite-128.png');
}

function setup() {
    createCanvas(800, 600);
    textFont('VT323');
    textSize(40);
    frameRate(60);
    reset();

    bird = new Sprite(walkAnimation, 100, 100, 0.2, upImg);
    bottle = new Sprite(bottleAnimation, 200, 200, 0.4);
}

function reset() {
    score = 0;
    timer = 15;

    //remove monsters
    for (i = 0; i < monsters.length; i++ ) {
        monsters[i].x = -1000;
        console.log(monsters[i]);
    }

    //frame extractiron from sprite for bird
    for (let i = 0; (i * frameSize) < walkSprite.width; i++) {
        let img = walkSprite.get(i * frameSize, 0, frameSize, frameSize);
        walkAnimation.push(img);
    }

    //frame extraction from sprite for bottle
    for (let i = 0; (i * frameSize) < bottleSprite.width; i++) {
        let img = bottleSprite.get(i * frameSize, 0, frameSize, frameSize);
        bottleAnimation.push(img);
    }
}

function bottleLocation() {
    bottle.x = floor(random(width-128));
    bottle.y = floor(random(height-128));
}

function gameover() {
    console.log("game over");
    
    gameOver.resize(600,600);
    imageMode(CENTER);
    image(gameOver, bird.x, bird.y);
    
    fill(255,0,0);
    text('Relapse', width/2, height/2, 200);
    text('Press "r" to continue with life', width/2 - 80, height/2 + 40, 400);

    // bird.remove();
    noLoop();
}

function timeout() {
    console.log("timeout");
    fill(255,0,0);
    text('life is over', width/2, height/2, 200);
    image(fart, bird.x, bird.y, 128, 128);
    bird.remove();
    noLoop();
}

function keyPressed(){
    switch(keyCode) {
        case LEFT_ARROW:
            bird.moveLeft();
            break;
        case RIGHT_ARROW: 
            bird.moveRight();
            break;
        case UP_ARROW:
            bird.moveUp();
            break;
        case DOWN_ARROW:
            bird.moveDown();
            break;
        case 82:
            reset();
            loop(); 
            break;
    }   
}

function draw() {
    background(111111);

    //timer and score counters
    text('Score: ' + score, 24, 40);
    textAlign(LEFT);
    text('Time: ' + timer, 480, 40);

    //border
    rect(800, 600);

    //counter and time out
    if (frameCount % 60 == 0 && timer > 0) {
        timer --;
    } else if (timer == 0) {
        timeout();
    }
    
    //update bottle pos when drank
    if (bird.hits(bottle)) {
        bottleLocation();
        score ++;
    }

    //bottle
    bottle.show();
    bottle.animate();

    //bird
    bird.show();
    bird.animate();
    bird.update();

    //enemies 
    if (random(1) < 0.05) {
        monsters.push(new Monster(monster, 800, floor(random(height))));
    }

    for (m of monsters) {
        m.show();
        m.move();
        m.update(t);
        if (m.hits(bird)) {
            gameover();
        }
    }
    
    t = t + 0.01;
} 
