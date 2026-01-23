import { useEffect, useRef } from 'react';
import type { Bullet, Enemy, Tree, Building, Stair, Plaza } from './types';
import { drawPlayer, drawEnemy, drawTree, drawBuilding, drawStairs, drawBullet, drawCrosshair } from './renderers';

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
    let playerHealth = 100;
    let playerKills = 0;
    let mouseX = canvas.width / 2;
    let mouseY = canvas.height / 2;

    const keys: { [key: string]: boolean } = {};

    const bullets: Bullet[] = [];

    const enemies: Enemy[] = [];

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

    const trees: Tree[] = [];

    for (let i = 0; i < 80; i++) {
      trees.push({
        x: (Math.random() - 0.5) * 2500,
        z: (Math.random() - 0.5) * 2500,
        type: Math.floor(Math.random() * 3)
      });
    }

    const buildings: Building[] = [];

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

    const stairs: Stair[] = [
      { x: -100, z: 0, width: 60, steps: 8 },
      { x: 100, z: 0, width: 60, steps: 8 },
      { x: 0, z: -100, width: 60, steps: 8 },
      { x: 0, z: 100, width: 60, steps: 8 }
    ];

    const plaza: Plaza = {
      x: 0,
      z: 0,
      size: 200
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

      buildings.forEach(building => drawBuilding(ctx, canvas, building, playerX, playerZ, playerAngle));
      stairs.forEach(stair => drawStairs(ctx, canvas, stair, playerX, playerZ, playerAngle));
      trees.forEach(tree => drawTree(ctx, canvas, tree, playerX, playerZ, playerAngle));

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
              onKillsChange(playerKills);
              
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

        drawBullet(ctx, canvas, bullet, playerX, playerZ, playerAngle);
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
              onHealthChange(playerHealth);
              enemy.shootCooldown = 60;

              if (playerHealth <= 0) {
                onGameOver();
                return;
              }
            }
          }
        } else {
          enemy.state = 'idle';
        }

        drawEnemy(ctx, canvas, enemy, playerX, playerZ, playerAngle);
      });

      drawPlayer(ctx, canvas, playerAngle, playerHealth);
      drawCrosshair(ctx, mouseX, mouseY);

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
  }, [onKillsChange, onHealthChange, onGameOver]);

  return (
    <canvas 
      ref={canvasRef} 
      className="w-full max-w-6xl rounded-lg border-4 border-accent shadow-2xl cursor-crosshair"
    />
  );
}
