import type { Grass, Cloud } from './types';

export const drawGrass = (
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  grass: Grass,
  playerX: number,
  playerZ: number,
  playerAngle: number,
  time: number
) => {
  const dx = grass.x - playerX;
  const dz = grass.z - playerZ;
  const distance = Math.sqrt(dx * dx + dz * dz);

  if (distance > 1500) return;

  const angleToGrass = Math.atan2(dz, dx);
  const relativeAngle = angleToGrass - playerAngle;

  const screenX = canvas.width / 2 + Math.sin(relativeAngle) * distance * 0.5;
  const screenY = canvas.height / 2 + 50;

  if (screenX < -50 || screenX > canvas.width + 50) return;

  const size = Math.max(5, grass.size * (1000 / distance));
  const sway = Math.sin(time * 0.002 + grass.swayOffset) * (size * 0.2);

  const colors = [
    ['#2d5016', '#3d6b1a', '#4a7d1e'],
    ['#228b22', '#32a852', '#45c062'],
    ['#1e5631', '#2a6f41', '#36804d'],
    ['#6b8e23', '#7ba32d', '#8bb83a'],
    ['#4a7d1e', '#5a9425', '#6aaa30']
  ];

  const colorSet = colors[grass.type];
  const grassColor = colorSet[Math.floor(distance / 500) % colorSet.length];

  ctx.save();
  ctx.translate(screenX, screenY);

  if (grass.type === 0) {
    for (let i = 0; i < 3; i++) {
      ctx.fillStyle = grassColor;
      ctx.beginPath();
      ctx.moveTo(sway + i * 3 - 3, 0);
      ctx.lineTo(sway + i * 3 - 2 + Math.sin(time * 0.003 + i) * 2, -size);
      ctx.lineTo(sway + i * 3 + 2, -size);
      ctx.lineTo(sway + i * 3 + 3, 0);
      ctx.closePath();
      ctx.fill();
    }
  } else if (grass.type === 1) {
    ctx.fillStyle = grassColor;
    ctx.beginPath();
    ctx.moveTo(sway, 0);
    ctx.quadraticCurveTo(sway - size * 0.2, -size * 0.5, sway - size * 0.3, -size);
    ctx.lineTo(sway + size * 0.3, -size);
    ctx.quadraticCurveTo(sway + size * 0.2, -size * 0.5, sway, 0);
    ctx.closePath();
    ctx.fill();
  } else if (grass.type === 2) {
    for (let i = 0; i < 5; i++) {
      const angle = (i / 5) * Math.PI * 2;
      ctx.fillStyle = grassColor;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(
        Math.cos(angle) * size * 0.5 + sway * 0.3,
        -size + Math.sin(angle) * size * 0.3
      );
      ctx.lineTo(
        Math.cos(angle + 0.2) * size * 0.4 + sway * 0.3,
        -size * 0.8 + Math.sin(angle + 0.2) * size * 0.2
      );
      ctx.closePath();
      ctx.fill();
    }
  } else if (grass.type === 3) {
    ctx.strokeStyle = grassColor;
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    for (let i = 0; i < 4; i++) {
      ctx.beginPath();
      ctx.moveTo(i * 2 - 3, 0);
      ctx.quadraticCurveTo(
        i * 2 - 3 + sway * 0.5,
        -size * 0.5,
        i * 2 - 3 + sway + Math.sin(time * 0.004 + i) * 3,
        -size
      );
      ctx.stroke();
    }
  } else {
    ctx.fillStyle = grassColor;
    ctx.beginPath();
    ctx.ellipse(sway, -size * 0.5, size * 0.4, size, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = colors[4][1];
    for (let i = 0; i < 3; i++) {
      ctx.beginPath();
      ctx.arc(
        sway + Math.cos(i * Math.PI * 0.7) * size * 0.3,
        -size + Math.sin(i * Math.PI * 0.7) * size * 0.3,
        size * 0.15,
        0,
        Math.PI * 2
      );
      ctx.fill();
    }
  }

  ctx.restore();
};

export const drawCloud = (
  ctx: CanvasRenderingContext2D,
  cloud: Cloud
) => {
  ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';

  ctx.beginPath();
  ctx.arc(cloud.x, cloud.y, cloud.size, 0, Math.PI * 2);
  ctx.fill();

  ctx.beginPath();
  ctx.arc(cloud.x + cloud.size * 0.8, cloud.y, cloud.size * 0.8, 0, Math.PI * 2);
  ctx.fill();

  ctx.beginPath();
  ctx.arc(cloud.x + cloud.size * 1.5, cloud.y, cloud.size * 0.9, 0, Math.PI * 2);
  ctx.fill();

  ctx.beginPath();
  ctx.arc(cloud.x + cloud.size * 0.4, cloud.y - cloud.size * 0.3, cloud.size * 0.7, 0, Math.PI * 2);
  ctx.fill();

  ctx.beginPath();
  ctx.arc(cloud.x + cloud.size * 1.2, cloud.y - cloud.size * 0.4, cloud.size * 0.6, 0, Math.PI * 2);
  ctx.fill();
};
