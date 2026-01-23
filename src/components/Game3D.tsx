import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import GameCanvas from './game3d/GameCanvas';

export default function Game3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [kills, setKills] = useState(0);
  const [health, setHealth] = useState(100);
  const [gameOver, setGameOver] = useState(false);
  const { toast } = useToast();

  const toggleFullscreen = () => {
    if (!containerRef.current) return;

    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const startGame = () => {
    setGameStarted(true);
    setGameOver(false);
    setKills(0);
    setHealth(100);
    toast({
      title: "🎮 Игра началась!",
      description: "WASD - движение, Мышь - прицел, Клик - выстрел",
    });
  };

  const handleGameOver = () => {
    setGameOver(true);
    setGameStarted(false);
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full flex flex-col items-center space-y-4 relative bg-black p-4 rounded-lg">
      {!gameStarted && !gameOver && (
        <div className="text-center space-y-4 py-12">
          <h3 className="text-4xl font-bold text-accent">🌿 ПРОГУЛКА ПО ЛУГУ 🌿</h3>
          <p className="text-xl text-white">Исследуй красивый мир природы!</p>
          <div className="space-y-2 text-white text-lg">
            <p>⌨️ W A S D - Движение</p>
            <p>🖱️ Мышь - Поворот камеры</p>
            <p>🌱 Наслаждайся природой</p>
          </div>
          <Button 
            size="lg" 
            className="bg-accent hover:bg-accent/90 text-white font-bold text-2xl px-16 py-8 mt-6"
            onClick={startGame}
          >
            <Icon name="Play" size={32} className="mr-3" />
            НАЧАТЬ ПРОГУЛКУ
          </Button>
        </div>
      )}



      {gameStarted && (
        <>
          <GameCanvas 
            onKillsChange={setKills}
            onHealthChange={setHealth}
            onGameOver={handleGameOver}
          />
          <div className="flex gap-4">
            <Button
              onClick={toggleFullscreen}
              className="bg-accent hover:bg-accent/90 text-white font-bold"
              size="lg"
            >
              <Icon name={isFullscreen ? "Minimize" : "Maximize"} size={20} className="mr-2" />
              {isFullscreen ? "ВЫХОД" : "ПОЛНЫЙ ЭКРАН"}
            </Button>
          </div>
        </>
      )}
    </div>
  );
}