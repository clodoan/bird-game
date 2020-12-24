//sprites
let walkSprite;
let bottleSprite;
let monsterSprite;
let clouds;

let walkAnimation = [];
let bottleAnimation = [];
let monsterAnimation = [];
let monsters = [];

//settings
let frameSize = 128;
let step = 10;
let t = 0;
timer = 78;

//sound
let monsterSound;

function preload(){
    // images
    upImg = loadImage('/assets/images/bird-jump-128.png');
    gameOver = loadImage('/assets/images/game-over.png');
    monster = loadImage('/assets/images/monster.png');
    fart = loadImage('/assets/images/bird-jump-128.png');
    walkSprite = loadImage('/assets/sprites/walk-sprite-128.png');
    bottleSprite = loadImage('/assets/sprites/bottle-sprite-128.png');
    clouds = loadImage('/assets/images/clouds.png');
    
    // sounds
    wohooSound = loadSound('/assets/sounds/wohoo.mp4');
    deadSound = loadSound('/assets/sounds/dead.mp4');
    monsterSound = loadSound('/assets/sounds/monster-appear.mp4');
    fartSound = loadSound('/assets/sounds/fart.mp4');
    blogeekSound = loadSound('/assets/sounds/blogeek.mp4');
    // backgroundMusic = loadSound('/assets/sounds/background.wav');
}

function setup() {
    var cnv = createCanvas(800, 600);
    cnv.center();

    textFont('VT323');
    textSize(40);
    frameRate(60);
    reset();

    bird = new Sprite(walkAnimation, 100, 100, 0.2);
    bottle = new Sprite(bottleAnimation, 200, 200, 0.4);
}

function bottleLocation() {
    bottle.x = floor(random(width-128));
    bottle.y = floor(random(height-128));
}

function draw() {
    // backgroundMusic.play();
    background (100,192,255);
    image(clouds, 40, 40, 200, 200);
    image(clouds, 440, 240, 200, 200);

    //timer and score counters
    fill(255,0,0);
    text('Score: ' + score, 24, 40);
    textAlign(LEFT);
    text('Time: ' + timer, 480, 40);

    //counter and time out
    if (frameCount % 40 == 0 && timer > 0) {
        timer --;
    } else if (timer == 0) {
        fartSound.play();
        timeout();
    }
    
    //update bottle pos when drank
    if (bird.hits(bottle)) {
        bottleLocation();
        blogeekSound.play();
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
    if (random(1) < 0.02) {
        monsters.push(new Monster(monster, 800, floor(random(height))));
        monsterSound.play();
    }

    for (m of monsters) {
        m.show();
        m.move();
        m.update(t);
        if (m.hits(bird)) {
            deadSound.play();
            gameover();
        }
    }
    // clouds 

    t = t + 0.01;
} 

function keyPressed(){
    switch(keyCode) {
        case LEFT_ARROW:
            console.log('left');
            bird.moveLeft();
            break;
        case RIGHT_ARROW: 
            console.log('right');
            bird.moveRight();
            break;
        case UP_ARROW:
            console.log('up');
            bird.moveUp();
            break;
        case DOWN_ARROW:
            console.log('down');
            bird.moveDown();
            break;
        case 82:
            reset();
            loop(); 
            break;
    }   
}