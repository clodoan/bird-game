# React Bird Game

This is a React/Next.js version of the original p5.js bird survival game "Getting through it".

## Game Description

- **Objective**: Survive as long as possible while collecting wine bottles
- **Controls**: Use arrow keys (←↑↓→) to move the bird
- **Gameplay**: 
  - Collect wine bottles to increase your score
  - Avoid dark thoughts (monsters) that move across the screen
  - You have 78 seconds to collect as much wine as possible
  - If you get caught by a monster, it's game over ("Relapse")
  - If time runs out, "life is over"
- **Restart**: Press 'R' to restart the game when it's over

## Running the Game

1. Navigate to the React project directory:
   ```bash
   cd react-bird-game/react-bird-game
   ```

2. Install dependencies (if not already done):
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and go to `http://localhost:3000` (or the port shown in the terminal)

## Technical Implementation

The React version maintains the same game mechanics as the original p5.js version:

- **Canvas-based rendering** using HTML5 Canvas API
- **Sprite animations** extracted from sprite sheets
- **Collision detection** between game objects
- **Sound effects** for game events
- **Responsive controls** with keyboard input
- **Game states** (playing, game over, timeout)

## Project Structure

```
react-bird-game/
├── src/
│   ├── app/
│   │   ├── page.tsx          # Main game page
│   │   ├── layout.tsx        # App layout
│   │   └── globals.css       # Global styles
│   ├── components/
│   │   └── Game.tsx          # Main game component
│   └── types/
│       └── game.ts           # Game classes (Sprite, Monster, Cloud)
└── public/
    └── assets/               # Game assets (sprites, sounds, images)
        ├── sprites/
        ├── sounds/
        └── images/
```

## Features

- ✅ Same gameplay mechanics as original p5.js version
- ✅ Animated sprites for bird and bottle
- ✅ Moving clouds in background
- ✅ Monster enemies with sine wave movement
- ✅ Collision detection
- ✅ Score and timer display
- ✅ Sound effects
- ✅ Game over and timeout states
- ✅ Restart functionality
- ✅ Responsive design with Tailwind CSS
- ✅ TypeScript for type safety

## Controls

- **Arrow Keys**: Move the bird
- **R Key**: Restart game (when game over)

The game runs at 60 FPS and includes all the original sound effects and visual elements from the p5.js version.