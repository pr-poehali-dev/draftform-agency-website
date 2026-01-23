import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

export default function Game3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 1200;
    canvas.height = 800;

    let animationId: number;
    let playerX = 0;
    let playerZ = 0;
    let playerAngle = 0;

    const keys: { [key: string]: boolean } = {};

    const gameLoop = () => {
      ctx.fillStyle = '#87CEEB';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#228b22';
      ctx.fillRect(0, canvas.height / 2, canvas.width, canvas.height / 2);

      const speed = 5;
      if (keys['w'] || keys['W']) {
        playerX += Math.cos(playerAngle) * speed;
        playerZ += Math.sin(playerAngle) * speed;
      }
      if (keys['s'] || keys['S']) {
        playerX -= Math.cos(playerAngle) * speed;
        playerZ -= Math.sin(playerAngle) * speed;
      }
      if (keys['a'] || keys['A']) {
        playerX += Math.cos(playerAngle - Math.PI / 2) * speed;
        playerZ += Math.sin(playerAngle - Math.PI / 2) * speed;
      }
      if (keys['d'] || keys['D']) {
        playerX += Math.cos(playerAngle + Math.PI / 2) * speed;
        playerZ += Math.sin(playerAngle + Math.PI / 2) * speed;
      }

      ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
      ctx.font = 'bold 24px Arial';
      ctx.fillText(`🌍 X: ${Math.floor(playerX)} Z: ${Math.floor(playerZ)}`, 20, 40);
      ctx.fillText(`🧭 Угол: ${Math.floor((playerAngle * 180) / Math.PI)}°`, 20, 75);

      animationId = requestAnimationFrame(gameLoop);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      keys[e.key] = true;
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keys[e.key] = false;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const dx = mouseX - canvas.width / 2;
      const dy = mouseY - canvas.height / 2;
      playerAngle = Math.atan2(dy, dx) + Math.PI / 2;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    canvas.addEventListener('mousemove', handleMouseMove);

    gameLoop();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
      <div ref={containerRef} className="w-full max-w-7xl">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-white">🎮 3D ИГРА</h1>
          <Button
            onClick={toggleFullscreen}
            className="bg-accent hover:bg-accent/90 text-white font-bold"
            size="lg"
          >
            <Icon name={isFullscreen ? "Minimize" : "Maximize"} size={20} className="mr-2" />
            {isFullscreen ? "ВЫХОД" : "ПОЛНЫЙ ЭКРАН"}
          </Button>
        </div>
        
        <canvas 
          ref={canvasRef} 
          className="w-full rounded-lg border-4 border-accent shadow-2xl cursor-crosshair bg-black"
        />

        <div className="mt-4 text-white space-y-2">
          <p className="text-lg">⌨️ <span className="font-bold">W A S D</span> - Движение</p>
          <p className="text-lg">🖱️ <span className="font-bold">Мышь</span> - Поворот камеры</p>
        </div>
      </div>
    </div>
  );
}
