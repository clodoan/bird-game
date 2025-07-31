'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { Sprite } from '@/types/game';
import { Monster } from '@/types/game';
import { Cloud } from '@/types/game';

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;
const FRAME_SIZE = 128;

export default function Game() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const [gameState, setGameState] = useState<'playing' | 'gameover' | 'timeout'>('playing');
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(78);
  
  // Game objects
  const gameObjects = useRef({
    bird: null as Sprite | null,
    bottle: null as Sprite | null,
    monsters: [] as Monster[],
    clouds: [] as Cloud[],
    t: 0,
    frameCount: 0,
    images: {} as Record<string, HTMLImageElement>,
    sounds: {} as Record<string, HTMLAudioElement>,
    walkAnimation: [] as HTMLImageElement[],
    bottleAnimation: [] as HTMLImageElement[]
  });

  // Load images
  const loadImage = (src: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  };

  // Load sounds
  const loadSound = (src: string): HTMLAudioElement => {
    const audio = new Audio(src);
    audio.preload = 'auto';
    return audio;
  };

  // Extract frames from sprite sheet
  const extractFrames = (spriteSheet: HTMLImageElement, frameWidth: number): HTMLImageElement[] => {
    const frames: HTMLImageElement[] = [];
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;
    canvas.width = frameWidth;
    canvas.height = frameWidth;

    for (let i = 0; i * frameWidth < spriteSheet.width; i++) {
      ctx.clearRect(0, 0, frameWidth, frameWidth);
      ctx.drawImage(spriteSheet, i * frameWidth, 0, frameWidth, frameWidth, 0, 0, frameWidth, frameWidth);
      
      const frameImg = new Image();
      frameImg.src = canvas.toDataURL();
      frames.push(frameImg);
    }
    
    return frames;
  };

  // Initialize game
  const initGame = useCallback(async () => {
    try {
      // Load images
      const [walkSprite, bottleSprite, monsterImg, cloudsImg, gameOverImg, birdJumpImg] = await Promise.all([
        loadImage('/assets/sprites/walk-sprite-128.png'),
        loadImage('/assets/sprites/bottle-sprite-128.png'),
        loadImage('/assets/images/monster.png'),
        loadImage('/assets/images/clouds.png'),
        loadImage('/assets/images/game-over.png'),
        loadImage('/assets/images/bird-jump-128.png')
      ]);

      gameObjects.current.images = {
        walkSprite,
        bottleSprite,
        monster: monsterImg,
        clouds: cloudsImg,
        gameOver: gameOverImg,
        birdJump: birdJumpImg
      };

      // Load sounds
      gameObjects.current.sounds = {
        wohoo: loadSound('/assets/sounds/wohoo.mp4'),
        dead: loadSound('/assets/sounds/dead.mp4'),
        monsterAppear: loadSound('/assets/sounds/monster-appear.mp4'),
        fart: loadSound('/assets/sounds/fart.mp4'),
        blogeek: loadSound('/assets/sounds/blogeek.mp4')
      };

      // Extract animations
      gameObjects.current.walkAnimation = extractFrames(walkSprite, FRAME_SIZE);
      gameObjects.current.bottleAnimation = extractFrames(bottleSprite, FRAME_SIZE);

      // Create game objects
      gameObjects.current.bird = new Sprite(gameObjects.current.walkAnimation, 100, 100, 0.2);
      gameObjects.current.bottle = new Sprite(gameObjects.current.bottleAnimation, 200, 200, 0.4);
      
      resetGame();
    } catch (error) {
      console.error('Failed to load game assets:', error);
    }
  }, []);

  // Reset game
  const resetGame = () => {
    setScore(0);
    setTimer(78);
    setGameState('playing');
    gameObjects.current.monsters = [];
    gameObjects.current.clouds = [];
    gameObjects.current.t = 0;
    gameObjects.current.frameCount = 0;
    
    if (gameObjects.current.bottle) {
      gameObjects.current.bottle.x = Math.floor(Math.random() * (CANVAS_WIDTH - 128));
      gameObjects.current.bottle.y = Math.floor(Math.random() * (CANVAS_HEIGHT - 128));
    }
  };

  // Handle keyboard input
  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (!gameObjects.current.bird) return;

    switch (event.code) {
      case 'ArrowLeft':
        gameObjects.current.bird.moveLeft();
        break;
      case 'ArrowRight':
        gameObjects.current.bird.moveRight();
        break;
      case 'ArrowUp':
        gameObjects.current.bird.moveUp();
        break;
      case 'ArrowDown':
        gameObjects.current.bird.moveDown();
        break;
      case 'KeyR':
        if (gameState !== 'playing') {
          resetGame();
        }
        break;
    }
  }, [gameState]);

  // Game loop
  const gameLoop = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || gameState !== 'playing') return;

    const ctx = canvas.getContext('2d')!;
    const { bird, bottle, monsters, clouds, images, sounds } = gameObjects.current;

    if (!bird || !bottle) return;

    // Clear canvas
    ctx.fillStyle = '#64C0FF';
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Add clouds randomly
    if (Math.random() < 0.005) {
      clouds.push(new Cloud(images.clouds, CANVAS_WIDTH, Math.floor(Math.random() * CANVAS_HEIGHT)));
    }

    // Update and draw clouds
    for (let i = clouds.length - 1; i >= 0; i--) {
      const cloud = clouds[i];
      cloud.move();
      cloud.show(ctx);
      
      if (cloud.x < -200) {
        clouds.splice(i, 1);
      }
    }

    // Timer countdown
    gameObjects.current.frameCount++;
    if (gameObjects.current.frameCount % 40 === 0 && timer > 0) {
      setTimer(prev => prev - 1);
    } else if (timer <= 0) {
      sounds.fart?.play();
      setGameState('timeout');
      return;
    }

    // Check bottle collision
    if (bird.hits(bottle)) {
      bottle.x = Math.floor(Math.random() * (CANVAS_WIDTH - 128));
      bottle.y = Math.floor(Math.random() * (CANVAS_HEIGHT - 128));
      sounds.blogeek?.play();
      setScore(prev => prev + 1);
    }

    // Spawn monsters
    if (Math.random() < 0.02) {
      monsters.push(new Monster(images.monster, CANVAS_WIDTH, Math.floor(Math.random() * CANVAS_HEIGHT)));
      sounds.monsterAppear?.play();
    }

    // Update and draw monsters
    for (let i = monsters.length - 1; i >= 0; i--) {
      const monster = monsters[i];
      monster.move();
      monster.update(gameObjects.current.t);
      monster.show(ctx);
      
      if (monster.hits(bird)) {
        sounds.dead?.play();
        setGameState('gameover');
        return;
      }
      
      if (monster.x < -64) {
        monsters.splice(i, 1);
      }
    }

    // Update and draw bottle
    bottle.show(ctx);
    bottle.animate();

    // Update and draw bird
    bird.show(ctx);
    bird.animate();
    bird.update();

    // Draw UI
    ctx.fillStyle = '#FF0000';
    ctx.font = '40px VT323, monospace';
    ctx.fillText(`Score: ${score}`, 24, 40);
    ctx.fillText(`Time: ${timer}`, 480, 40);

    gameObjects.current.t += 0.01;
    animationRef.current = requestAnimationFrame(gameLoop);
  }, [gameState, score, timer]);

  // Initialize game on mount
  useEffect(() => {
    initGame();
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [initGame]);

  // Start game loop when game state changes
  useEffect(() => {
    if (gameState === 'playing') {
      animationRef.current = requestAnimationFrame(gameLoop);
    } else {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [gameState, gameLoop]);

  // Add keyboard listeners
  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  // Render game over screen
  const renderGameOver = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d')!;
    
    if (gameState === 'gameover') {
      const gameOverImg = gameObjects.current.images.gameOver;
      if (gameOverImg && gameObjects.current.bird) {
        ctx.drawImage(gameOverImg, gameObjects.current.bird.x - 300, gameObjects.current.bird.y - 300, 600, 600);
      }
      
      ctx.fillStyle = '#777777';
      ctx.fillRect(24, CANVAS_HEIGHT/2 - 24, 600, 96);
      ctx.fillStyle = '#FF0000';
      ctx.font = '40px VT323, monospace';
      ctx.fillText('Relapse. Press "r" to continue with your life', 32, CANVAS_HEIGHT/2 + 20);
    } else if (gameState === 'timeout') {
      ctx.fillStyle = '#FF0000';
      ctx.font = '40px VT323, monospace';
      ctx.fillText('life is over', CANVAS_WIDTH/2 - 100, CANVAS_HEIGHT/2);
      
      const birdJumpImg = gameObjects.current.images.birdJump;
      if (birdJumpImg && gameObjects.current.bird) {
        ctx.drawImage(birdJumpImg, gameObjects.current.bird.x, gameObjects.current.bird.y, 128, 128);
      }
    }
  };

  useEffect(() => {
    if (gameState !== 'playing') {
      renderGameOver();
    }
  }, [gameState]);

  return (
    <div className="flex flex-col items-center">
      <canvas
        ref={canvasRef}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        className="border-4 border-black bg-sky-300"
      />
    </div>
  );
}