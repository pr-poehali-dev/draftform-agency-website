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
      type: 'normal' | 'tower' | 'asian' | 'ruins';
      roofColor?: string;
    }> = [];

    buildings.push({
      x: 0,
      z: 0,
      width: 40,
      depth: 40,
      height: 350,
      type: 'tower',
      roofColor: '#8b4513'
    });

    buildings.push(
      { x: -200, z: -150, width: 120, depth: 100, height: 80, type: 'asian', roofColor: '#d2691e' },
      { x: 200, z: -150, width: 100, depth: 90, height: 70, type: 'asian', roofColor: '#cd853f' },
      { x: -180, z: 180, width: 90, depth: 80, height: 60, type: 'normal', roofColor: '#a0522d' },
      { x: 180, z: 200, width: 110, depth: 95, height: 75, type: 'normal', roofColor: '#8b4513' },
      { x: 350, z: 50, width: 80, depth: 70, height: 50, type: 'ruins', roofColor: '#b8860b' },
      { x: -350, z: 80, width: 85, depth: 75, height: 55, type: 'ruins', roofColor: '#cd853f' },
      { x: 100, z: 300, width: 70, depth: 65, height: 45, type: 'normal', roofColor: '#a0522d' },
      { x: -100, z: -300, width: 75, depth: 70, height: 48, type: 'normal', roofColor: '#d2691e' }
    );

    const stairs: Array<{
      x: number;
      z: number;
      width: number;
      steps: number;
    }> = [
      { x: -100, z: 0, width: 60, steps: 8 },
      { x: 100, z: 0, width: 60, steps: 8 },
      { x: 0, z: -100, width: 60, steps: 8 },
      { x: 0, z: 100, width: 60, steps: 8 }
    ];

    const plaza = {
      x: 0,
      z: 0,
      size: 200
    };

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

    const drawStairs = (stair: typeof stairs[0]) => {
      const dx = stair.x - playerX;
      const dz = stair.z - playerZ;
      const distance = Math.sqrt(dx * dx + dz * dz);

      if (distance > 500) return;

      const angleToStair = Math.atan2(dz, dx);
      const relativeAngle = angleToStair - playerAngle;

      const screenX = canvas.width / 2 + Math.sin(relativeAngle) * distance * 0.5;
      const screenY = canvas.height / 2;

      const width = (stair.width / distance) * 300;
      const stepHeight = 5;

      for (let i = 0; i < stair.steps; i++) {
        ctx.fillStyle = `rgba(169, 169, 169, ${1 - distance / 500})`;
        ctx.fillRect(
          screenX - width / 2,
          screenY - i * stepHeight - 10,
          width,
          stepHeight
        );
      }
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

      if (screenX < -300 || screenX > canvas.width + 300) return;

      const width = (building.width / distance) * 500;
      const height = (building.height / distance) * 500;

      if (building.type === 'tower') {
        ctx.fillStyle = '#d3d3d3';
        ctx.fillRect(screenX - width / 2, screenY - height, width, height);

        ctx.fillStyle = '#a9a9a9';
        ctx.fillRect(screenX, screenY - height, width * 0.3, height);

        ctx.fillStyle = building.roofColor || '#8b4513';
        ctx.beginPath();
        ctx.moveTo(screenX, screenY - height - 30);
        ctx.lineTo(screenX - width / 2 - 10, screenY - height);
        ctx.lineTo(screenX + width / 2 + 10, screenY - height);
        ctx.closePath();
        ctx.fill();

        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;
        ctx.strokeRect(screenX - width / 4, screenY - height + 50, width / 2, 30);

        const windowSize = width * 0.15;
        for (let y = screenY - height + 100; y < screenY - 80; y += windowSize * 3) {
          ctx.fillStyle = '#87CEEB';
          ctx.fillRect(screenX - windowSize / 2, y, windowSize, windowSize);
        }
      } else if (building.type === 'asian') {
        ctx.fillStyle = '#f5deb3';
        ctx.fillRect(screenX - width / 2, screenY - height, width, height);

        ctx.fillStyle = building.roofColor || '#d2691e';
        ctx.beginPath();
        ctx.moveTo(screenX, screenY - height - 20);
        ctx.lineTo(screenX - width / 2 - 15, screenY - height + 10);
        ctx.lineTo(screenX - width / 2, screenY - height);
        ctx.lineTo(screenX + width / 2, screenY - height);
        ctx.lineTo(screenX + width / 2 + 15, screenY - height + 10);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = '#8b4513';
        const columns = 4;
        for (let i = 0; i < columns; i++) {
          const colX = screenX - width / 2 + (width / columns) * i + width / (columns * 2);
          ctx.fillRect(colX - 2, screenY - height, 4, height);
        }
      } else if (building.type === 'ruins') {
        ctx.fillStyle = '#a9a9a9';
        ctx.fillRect(screenX - width / 2, screenY - height, width, height * 0.7);

        ctx.fillStyle = '#808080';
        ctx.fillRect(screenX - width / 3, screenY - height * 0.7, width / 3, height * 0.7);

        ctx.fillStyle = building.roofColor || '#b8860b';
        ctx.fillRect(screenX - width / 2 - 5, screenY - height * 0.7, width + 10, 8);
      } else {
        ctx.fillStyle = '#e8d4b0';
        ctx.fillRect(screenX - width / 2, screenY - height, width, height);

        ctx.fillStyle = building.roofColor || '#a0522d';
        ctx.beginPath();
        ctx.moveTo(screenX - width / 2 - 5, screenY - height);
        ctx.lineTo(screenX, screenY - height - 15);
        ctx.lineTo(screenX + width / 2 + 5, screenY - height);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = '#654321';
        ctx.fillRect(screenX - width / 3, screenY - height * 0.3, width / 4, height * 0.3);

        const windowSize = width * 0.12;
        for (let y = screenY - height + 15; y < screenY - height * 0.4; y += windowSize * 2) {
          for (let x = screenX - width / 2 + 10; x < screenX + width / 2 - 10; x += windowSize * 2) {
            ctx.fillStyle = '#87CEEB';
            ctx.fillRect(x, y, windowSize, windowSize * 1.2);
          }
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
      const skyGradient = ctx.createLinearGradient(0, 0, 0, canvas.height / 2);
      skyGradient.addColorStop(0, '#87CEEB');
      skyGradient.addColorStop(1, '#b0d4e8');
      ctx.fillStyle = skyGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const groundGradient = ctx.createLinearGradient(0, canvas.height / 2, 0, canvas.height);
      groundGradient.addColorStop(0, '#8fbc8f');
      groundGradient.addColorStop(1, '#6b8e23');
      ctx.fillStyle = groundGradient;
      ctx.fillRect(0, canvas.height / 2, canvas.width, canvas.height / 2);

      const plazaDist = Math.sqrt(playerX * playerX + playerZ * playerZ);
      if (plazaDist < plaza.size * 2) {
        ctx.fillStyle = '#d3d3d3';
        ctx.fillRect(
          canvas.width / 2 - plaza.size,
          canvas.height / 2 - 20,
          plaza.size * 2,
          40
        );
      }

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
      stairs.forEach(drawStairs);
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