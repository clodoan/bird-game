'use client';

import { useEffect, useState } from 'react';
import Game from '@/components/Game';

export default function Home() {
  const [key, setKey] = useState(0);

  // Force re-render of game component on page load
  useEffect(() => {
    setKey(prev => prev + 1);
  }, []);

  return (
    <main className="h-screen w-screen max-h-screen overflow-hidden bg-sky-300 flex flex-col items-center justify-center font-mono gap-8">
      <div className="w-[800px] text-center text-blue-900 mx-auto">
        <h1 className="text-4xl font-bold">Getting through it</h1>
        <h3 className="text-xl mt-4">
          Play using ←↑↓→ <br />
          Drink as much wine as you can while avoiding monsters.
        </h3>
      </div> 
      <Game key={key} />
      <footer className="mt-auto text-xs text-center text-blue-900 flex-0 flex justify-end w-full px-5">
        <p>Created by <a href="https://claudio.land" target="_blank" className="underline">Claudio Angrigiani</a></p>
      </footer>
    </main>
  );
}