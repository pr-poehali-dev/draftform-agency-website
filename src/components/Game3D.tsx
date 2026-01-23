import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

export default function Game3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (!gameStarted || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 800;
    canvas.height = 600;

    let animationId: number;
    let playerX = 400;
    let playerY = 500;
    const playerSize = 30;
    let enemies: Array<{ x: number; y: number; z: number; speed: number }> = [];
    const keys: { [key: string]: boolean } = {};
    let currentScore = 0;
    let isGameOver = false;

    const createEnemy = () => {
      enemies.push({
        x: Math.random() * 700 + 50,
        y: -50,
        z: Math.random() * 5 + 1,
        speed: Math.random() * 2 + 1
      });
    };

    const drawPlayer = () => {
      ctx.save();
      ctx.translate(playerX, playerY);
      
      ctx.fillStyle = '#3b82f6';
      ctx.beginPath();
      ctx.moveTo(0, -playerSize);
      ctx.lineTo(-playerSize * 0.6, playerSize);
      ctx.lineTo(playerSize * 0.6, playerSize);
      ctx.closePath();
      ctx.fill();
      
      ctx.fillStyle = '#60a5fa';
      ctx.fillRect(-5, 0, 10, 15);
      
      ctx.restore();
    };

    const drawEnemy = (enemy: { x: number; y: number; z: number }) => {
      const size = 20 + enemy.z * 5;
      
      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.arc(enemy.x, enemy.y, size, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.arc(enemy.x - size * 0.3, enemy.y - size * 0.2, size * 0.2, 0, Math.PI * 2);
      ctx.arc(enemy.x + size * 0.3, enemy.y - size * 0.2, size * 0.2, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.fillStyle = '#000';
      ctx.beginPath();
      ctx.arc(enemy.x - size * 0.3, enemy.y - size * 0.2, size * 0.1, 0, Math.PI * 2);
      ctx.arc(enemy.x + size * 0.3, enemy.y - size * 0.2, size * 0.1, 0, Math.PI * 2);
      ctx.fill();
    };

    const checkCollision = (enemy: { x: number; y: number; z: number }) => {
      const size = 20 + enemy.z * 5;
      const dx = playerX - enemy.x;
      const dy = playerY - enemy.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      return distance < playerSize + size;
    };

    const gameLoop = () => {
      if (isGameOver) return;

      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#1e293b';
      for (let i = 0; i < 20; i++) {
        ctx.fillRect(i * 40, (Date.now() * 0.1) % 40 - 40, 2, 20);
      }

      if (keys['ArrowLeft'] && playerX > playerSize) playerX -= 5;
      if (keys['ArrowRight'] && playerX < canvas.width - playerSize) playerX += 5;
      if (keys['ArrowUp'] && playerY > playerSize) playerY -= 5;
      if (keys['ArrowDown'] && playerY < canvas.height - playerSize) playerY += 5;

      if (Math.random() < 0.02) createEnemy();

      enemies = enemies.filter(enemy => {
        enemy.y += enemy.speed * enemy.z;
        
        if (checkCollision(enemy)) {
          isGameOver = true;
          setGameOver(true);
          setGameStarted(false);
          return false;
        }
        
        if (enemy.y > canvas.height) {
          currentScore += 10;
          setScore(currentScore);
          return false;
        }
        
        drawEnemy(enemy);
        return true;
      });

      drawPlayer();

      ctx.fillStyle = '#fff';
      ctx.font = 'bold 24px Arial';
      ctx.fillText(`СЧЁТ: ${currentScore}`, 20, 40);

      animationId = requestAnimationFrame(gameLoop);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      keys[e.key] = true;
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keys[e.key] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    gameLoop();

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      cancelAnimationFrame(animationId);
    };
  }, [gameStarted]);

  const startGame = () => {
    setScore(0);
    setGameOver(false);
    setGameStarted(true);
  };

  return (
    <div className="flex flex-col items-center space-y-6">
      {!gameStarted && !gameOver && (
        <div className="text-center space-y-4">
          <h3 className="text-3xl font-bold text-accent">🚀 КОСМИЧЕСКИЙ РЕЙСЕР 🚀</h3>
          <p className="text-lg text-foreground">Уворачивайся от врагов и набирай очки!</p>
          <div className="space-y-2 text-foreground">
            <p>⬅️ ➡️ ⬆️ ⬇️ - Управление</p>
            <p>🎯 Цель: избегай красных врагов</p>
          </div>
          <Button 
            size="lg" 
            className="bg-accent hover:bg-accent/90 text-white font-bold text-xl px-12 py-6"
            onClick={startGame}
          >
            <Icon name="Play" size={24} className="mr-2" />
            НАЧАТЬ ИГРУ
          </Button>
        </div>
      )}

      {gameOver && (
        <div className="text-center space-y-4">
          <h3 className="text-3xl font-bold text-destructive">💥 ИГРА ОКОНЧЕНА 💥</h3>
          <p className="text-2xl text-accent">Ваш счёт: {score}</p>
          <Button 
            size="lg" 
            className="bg-accent hover:bg-accent/90 text-white font-bold text-xl px-12 py-6"
            onClick={startGame}
          >
            <Icon name="RotateCcw" size={24} className="mr-2" />
            ИГРАТЬ СНОВА
          </Button>
        </div>
      )}

      {gameStarted && (
        <div className="relative">
          <canvas 
            ref={canvasRef} 
            className="border-4 border-accent rounded-lg shadow-2xl"
          />
          <div className="absolute top-4 right-4 bg-background/80 px-4 py-2 rounded-lg">
            <p className="text-accent font-bold text-xl">⭐ {score}</p>
          </div>
        </div>
      )}
    </div>
  );
}
