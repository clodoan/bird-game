'use client';

import { useEffect, useRef, useState } from 'react';
import Game from '@/components/Game';

export default function Home() {
  return (
    <main className="min-h-screen bg-sky-300 flex flex-col items-center justify-center font-mono">
      <div className="rules absolute top-0 left-1/2 transform -translate-x-1/2 translate-y-12 w-[800px] text-center text-blue-900">
        <h1 className="text-4xl font-bold">Getting through it</h1>
        <h3 className="text-xl mt-4">
          Play using ←↑↓→ <br />
          Drink as much wine as you can, avoid your dark thoughts, stay alive.
        </h3>
      </div>
      
      <Game />
      
      <footer className="absolute bottom-10 left-1/2 transform -translate-x-1/2 translate-y-12 text-center text-blue-900">
        <p>Created by <a href="https://claudio.land" target="_blank" className="underline">Claudio Angrigiani</a></p>
      </footer>
      
      <audio 
        id="backgroundAudio" 
        autoPlay 
        controls 
        loop 
        className="absolute bottom-10 right-10"
        style={{ volume: 0.1 }}
      >
        <source src="/assets/sounds/background.wav" type="audio/wav" />
        Your browser does not support the audio element.
      </audio>
    </main>
  );
}