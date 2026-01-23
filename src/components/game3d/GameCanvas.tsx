import { useEffect, useRef } from 'react';
import type { Grass, Cloud } from './types';
import { drawGrass, drawCloud } from './renderers';

interface GameCanvasProps {
  onKillsChange: (kills: number) => void;
  onHealthChange: (health: number) => void;
  onGameOver: () => void;
}

export default function GameCanvas({ onKillsChange, onHealthChange, onGameOver }: GameCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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
    let time = 0;

    const keys: { [key: string]: boolean } = {};

    const grasses: Grass[] = [];
    for (let i = 0; i < 500; i++) {
      grasses.push({
        x: (Math.random() - 0.5) * 3000,
        z: (Math.random() - 0.5) * 3000,
        type: Math.floor(Math.random() * 5),
        size: 15 + Math.random() * 20,
        swayOffset: Math.random() * Math.PI * 2
      });
    }

    const clouds: Cloud[] = [];
    for (let i = 0; i < 15; i++) {
      clouds.push({
        x: Math.random() * canvas.width * 2,
        y: Math.random() * 150 + 20,
        size: 30 + Math.random() * 40,
        speed: 0.1 + Math.random() * 0.3
      });
    }

    const gameLoop = () => {
      time++;

      const skyGradient = ctx.createLinearGradient(0, 0, 0, canvas.height / 2);
      skyGradient.addColorStop(0, '#87CEEB');
      skyGradient.addColorStop(0.6, '#a8d8f0');
      skyGradient.addColorStop(1, '#c5e6f7');
      ctx.fillStyle = skyGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      clouds.forEach(cloud => {
        cloud.x += cloud.speed;
        if (cloud.x > canvas.width + cloud.size * 2) {
          cloud.x = -cloud.size * 2;
          cloud.y = Math.random() * 150 + 20;
        }
        drawCloud(ctx, cloud);
      });

      const groundGradient = ctx.createLinearGradient(0, canvas.height / 2, 0, canvas.height);
      groundGradient.addColorStop(0, '#7cb342');
      groundGradient.addColorStop(0.3, '#689f38');
      groundGradient.addColorStop(0.6, '#558b2f');
      groundGradient.addColorStop(1, '#33691e');
      ctx.fillStyle = groundGradient;
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

      grasses.sort((a, b) => {
        const distA = Math.sqrt((a.x - playerX) ** 2 + (a.z - playerZ) ** 2);
        const distB = Math.sqrt((b.x - playerX) ** 2 + (b.z - playerZ) ** 2);
        return distB - distA;
      });

      grasses.forEach(grass => {
        drawGrass(ctx, canvas, grass, playerX, playerZ, playerAngle, time);
      });

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
  }, [onKillsChange, onHealthChange, onGameOver]);

  return (
    <canvas 
      ref={canvasRef} 
      className="w-full max-w-6xl rounded-lg border-4 border-accent shadow-2xl cursor-crosshair"
    />
  );
}
