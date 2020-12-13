function timeout() {
    console.log("timeout");
    fill(255,0,0);
    text('life is over', width/2, height/2, 200);
    image(fart, bird.x, bird.y, 128, 128);
    bird.remove();
    noLoop();
}


function gameover() {
    console.log("game over");
    gameOver.resize(600,600);
    imageMode(CENTER);
    image(gameOver, bird.x, bird.y);
    fill(111111);
    let w = textWidth('Relapse. Press "r" to continue with life   ');
    rect(24, height/2, w, 48*2);
    fill(255,0,0);
    text('Relapse. Press "r" to continue with your life', 32, height/2, 600);
    // bird.remove();
    noLoop();
}


function reset() {
    // clear();
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