import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

export default function Game3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [kills, setKills] = useState(0);
  const [health, setHealth] = useState(100);
  const [gameOver, setGameOver] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (!gameStarted || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 1200;
    canvas.height = 800;

    let animationId: number;
    let playerX = 0;
    let playerZ = 0;
    let playerAngle = 0;
    let playerHealth = 100;
    let playerKills = 0;
    let mouseX = canvas.width / 2;
    let mouseY = canvas.height / 2;

    const keys: { [key: string]: boolean } = {};

    const bullets: Array<{
      x: number;
      z: number;
      angle: number;
      speed: number;
    }> = [];

    const enemies: Array<{
      x: number;
      z: number;
      health: number;
      angle: number;
      state: 'idle' | 'chase' | 'shoot';
      shootCooldown: number;
    }> = [];

    for (let i = 0; i < 10; i++) {
      enemies.push({
        x: (Math.random() - 0.5) * 2000,
        z: (Math.random() - 0.5) * 2000,
        health: 100,
        angle: Math.random() * Math.PI * 2,
        state: 'idle',
        shootCooldown: 0
      });
    }

    const trees: Array<{
      x: number;
      z: number;
      type: number;
    }> = [];

    for (let i = 0; i < 80; i++) {
      trees.push({
        x: (Math.random() - 0.5) * 2500,
        z: (Math.random() - 0.5) * 2500,
        type: Math.floor(Math.random() * 3)
      });
    }

    const buildings: Array<{
      x: number;
      z: number;
      width: number;
      depth: number;
      height: number;
    }> = [];

    for (let i = 0; i < 15; i++) {
      buildings.push({
        x: (Math.random() - 0.5) * 2000,
        z: (Math.random() - 0.5) * 2000,
        width: Math.random() * 80 + 60,
        depth: Math.random() * 80 + 60,
        height: Math.random() * 100 + 80
      });
    }

    const drawPlayer = () => {
      const centerX = canvas.width / 2;
      const centerY = canvas.height - 150;

      ctx.fillStyle = '#3b82f6';
      ctx.beginPath();
      ctx.arc(centerX, centerY, 15, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = '#60a5fa';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(centerX + Math.cos(playerAngle - Math.PI / 2) * 25, centerY + Math.sin(playerAngle - Math.PI / 2) * 25);
      ctx.stroke();

      ctx.fillStyle = '#ef4444';
      ctx.fillRect(centerX - 50, centerY + 40, 100, 10);
      ctx.fillStyle = '#22c55e';
      ctx.fillRect(centerX - 50, centerY + 40, playerHealth, 10);
    };

    const drawEnemy = (enemy: typeof enemies[0]) => {
      const dx = enemy.x - playerX;
      const dz = enemy.z - playerZ;
      const distance = Math.sqrt(dx * dx + dz * dz);

      if (distance > 1000) return;

      const angleToEnemy = Math.atan2(dz, dx);
      const relativeAngle = angleToEnemy - playerAngle;

      const screenX = canvas.width / 2 + Math.sin(relativeAngle) * distance * 0.5;
      const screenY = canvas.height / 2 - 50;

      if (screenX < -100 || screenX > canvas.width + 100) return;

      const size = Math.max(20, 1000 / distance);

      ctx.fillStyle = enemy.state === 'shoot' ? '#ef4444' : '#f59e0b';
      ctx.beginPath();
      ctx.arc(screenX, screenY, size, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#000';
      ctx.beginPath();
      ctx.arc(screenX - size * 0.3, screenY - size * 0.2, size * 0.2, 0, Math.PI * 2);
      ctx.arc(screenX + size * 0.3, screenY - size * 0.2, size * 0.2, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#dc2626';
      ctx.fillRect(screenX - size, screenY - size - 15, size * 2, 5);
      ctx.fillStyle = '#22c55e';
      ctx.fillRect(screenX - size, screenY - size - 15, (enemy.health / 100) * size * 2, 5);
    };

    const drawTree = (tree: typeof trees[0]) => {
      const dx = tree.x - playerX;
      const dz = tree.z - playerZ;
      const distance = Math.sqrt(dx * dx + dz * dz);

      if (distance > 800) return;

      const angleToTree = Math.atan2(dz, dx);
      const relativeAngle = angleToTree - playerAngle;

      const screenX = canvas.width / 2 + Math.sin(relativeAngle) * distance * 0.5;
      const screenY = canvas.height / 2;

      if (screenX < -100 || screenX > canvas.width + 100) return;

      const size = Math.max(30, 1500 / distance);

      ctx.fillStyle = '#654321';
      ctx.fillRect(screenX - size * 0.15, screenY, size * 0.3, size * 0.8);

      ctx.fillStyle = tree.type === 0 ? '#228b22' : tree.type === 1 ? '#2d5016' : '#1e5631';
      ctx.beginPath();
      ctx.arc(screenX, screenY - size * 0.3, size * 0.5, 0, Math.PI * 2);
      ctx.fill();
    };

    const drawBuilding = (building: typeof buildings[0]) => {
      const dx = building.x - playerX;
      const dz = building.z - playerZ;
      const distance = Math.sqrt(dx * dx + dz * dz);

      if (distance > 1000) return;

      const angleToBuilding = Math.atan2(dz, dx);
      const relativeAngle = angleToBuilding - playerAngle;

      const screenX = canvas.width / 2 + Math.sin(relativeAngle) * distance * 0.5;
      const screenY = canvas.height / 2 - 50;

      if (screenX < -200 || screenX > canvas.width + 200) return;

      const size = Math.max(50, 2000 / distance);
      const width = (building.width / distance) * 500;
      const height = (building.height / distance) * 500;

      ctx.fillStyle = '#4a5568';
      ctx.fillRect(screenX - width / 2, screenY - height, width, height);

      ctx.fillStyle = '#2d3748';
      ctx.fillRect(screenX, screenY - height, width * 0.4, height);

      ctx.fillStyle = '#fbbf24';
      const windowSize = size * 0.15;
      for (let y = screenY - height + 20; y < screenY - 20; y += windowSize * 2) {
        for (let x = screenX - width / 2 + 10; x < screenX + width / 2 - 10; x += windowSize * 2) {
          ctx.fillRect(x, y, windowSize, windowSize);
        }
      }
    };

    const drawBullet = (bullet: typeof bullets[0]) => {
      const dx = bullet.x - playerX;
      const dz = bullet.z - playerZ;
      const distance = Math.sqrt(dx * dx + dz * dz);

      const angleToTarget = Math.atan2(dz, dx);
      const relativeAngle = angleToTarget - playerAngle;

      const screenX = canvas.width / 2 + Math.sin(relativeAngle) * distance * 0.5;
      const screenY = canvas.height / 2;

      ctx.fillStyle = '#fbbf24';
      ctx.beginPath();
      ctx.arc(screenX, screenY, 3, 0, Math.PI * 2);
      ctx.fill();
    };

    const drawCrosshair = () => {
      const size = 20;
      ctx.strokeStyle = '#22c55e';
      ctx.lineWidth = 2;

      ctx.beginPath();
      ctx.moveTo(mouseX - size, mouseY);
      ctx.lineTo(mouseX + size, mouseY);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(mouseX, mouseY - size);
      ctx.lineTo(mouseX, mouseY + size);
      ctx.stroke();

      ctx.strokeStyle = '#ef4444';
      ctx.beginPath();
      ctx.arc(mouseX, mouseY, size / 2, 0, Math.PI * 2);
      ctx.stroke();
    };

    const gameLoop = () => {
      ctx.fillStyle = '#87CEEB';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#90EE90';
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

      buildings.forEach(drawBuilding);
      trees.forEach(drawTree);

      bullets.forEach((bullet, index) => {
        bullet.x += Math.cos(bullet.angle) * bullet.speed;
        bullet.z += Math.sin(bullet.angle) * bullet.speed;

        const bulletDist = Math.sqrt(bullet.x * bullet.x + bullet.z * bullet.z);
        if (bulletDist > 2000) {
          bullets.splice(index, 1);
          return;
        }

        enemies.forEach((enemy, enemyIndex) => {
          const dx = bullet.x - enemy.x;
          const dz = bullet.z - enemy.z;
          const dist = Math.sqrt(dx * dx + dz * dz);

          if (dist < 20) {
            enemy.health -= 50;
            bullets.splice(index, 1);

            if (enemy.health <= 0) {
              enemies.splice(enemyIndex, 1);
              playerKills++;
              setKills(playerKills);
              
              enemies.push({
                x: (Math.random() - 0.5) * 2000,
                z: (Math.random() - 0.5) * 2000,
                health: 100,
                angle: Math.random() * Math.PI * 2,
                state: 'idle',
                shootCooldown: 0
              });
            }
          }
        });

        drawBullet(bullet);
      });

      enemies.forEach(enemy => {
        const dx = playerX - enemy.x;
        const dz = playerZ - enemy.z;
        const dist = Math.sqrt(dx * dx + dz * dz);

        if (dist < 500) {
          enemy.state = 'chase';
          enemy.angle = Math.atan2(dz, dx);
          enemy.x += Math.cos(enemy.angle) * 2;
          enemy.z += Math.sin(enemy.angle) * 2;

          if (dist < 300) {
            enemy.state = 'shoot';
            enemy.shootCooldown--;

            if (enemy.shootCooldown <= 0) {
              playerHealth -= 10;
              setHealth(playerHealth);
              enemy.shootCooldown = 60;

              if (playerHealth <= 0) {
                setGameOver(true);
                setGameStarted(false);
              }
            }
          }
        } else {
          enemy.state = 'idle';
        }

        drawEnemy(enemy);
      });

      drawPlayer();
      drawCrosshair();

      ctx.fillStyle = '#000';
      ctx.font = 'bold 24px Arial';
      ctx.fillText(`💀 УБИЙСТВ: ${playerKills}`, 20, 40);
      ctx.fillText(`❤️ ЗДОРОВЬЕ: ${playerHealth}`, 20, 75);
      ctx.fillText(`👥 ВРАГОВ: ${enemies.length}`, 20, 110);

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
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;

      const dx = mouseX - canvas.width / 2;
      const dy = mouseY - canvas.height / 2;
      playerAngle = Math.atan2(dy, dx) + Math.PI / 2;
    };

    const handleClick = () => {
      bullets.push({
        x: playerX,
        z: playerZ,
        angle: playerAngle,
        speed: 15
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('click', handleClick);

    gameLoop();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('click', handleClick);
    };
  }, [gameStarted]);

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
          <h3 className="text-4xl font-bold text-accent">🔫 BATTLE ROYALE 🔫</h3>
          <p className="text-xl text-white">Королевская битва как в Free Fire!</p>
          <div className="space-y-2 text-white text-lg">
            <p>⌨️ W A S D - Движение</p>
            <p>🖱️ Мышь - Прицеливание</p>
            <p>🔫 Клик - Стрельба</p>
            <p>🎯 Цель: Уничтожить всех врагов!</p>
          </div>
          <Button 
            size="lg" 
            className="bg-accent hover:bg-accent/90 text-white font-bold text-2xl px-16 py-8 mt-6"
            onClick={startGame}
          >
            <Icon name="Play" size={32} className="mr-3" />
            НАЧАТЬ БИТВУ
          </Button>
        </div>
      )}

      {gameOver && (
        <div className="text-center space-y-4 py-12">
          <h3 className="text-4xl font-bold text-destructive">💀 ВЫ ПОГИБЛИ 💀</h3>
          <p className="text-2xl text-accent">Убито врагов: {kills}</p>
          <Button 
            size="lg" 
            className="bg-accent hover:bg-accent/90 text-white font-bold text-2xl px-16 py-8"
            onClick={startGame}
          >
            <Icon name="RotateCcw" size={32} className="mr-3" />
            ИГРАТЬ СНОВА
          </Button>
        </div>
      )}

      {gameStarted && (
        <>
          <canvas 
            ref={canvasRef} 
            className="w-full max-w-6xl rounded-lg border-4 border-accent shadow-2xl cursor-crosshair"
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
