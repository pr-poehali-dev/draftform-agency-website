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
    const bladeCount = 15 + Math.floor(Math.random() * 10);
    const baseColors = ['#2d5016', '#3d6b1a', '#4a7d1e', '#558b2f', '#6aaa30'];
    
    for (let i = 0; i < bladeCount; i++) {
      const bladeAngle = (Math.random() - 0.5) * Math.PI * 0.8;
      const bladeLength = size * (0.6 + Math.random() * 0.8);
      const bladeThickness = Math.max(0.5, size * 0.03 * (1 + Math.random() * 0.5));
      const bladeSway = Math.sin(time * 0.003 + grass.swayOffset + i * 0.5) * (bladeLength * 0.15);
      
      ctx.strokeStyle = baseColors[Math.floor(Math.random() * baseColors.length)];
      ctx.lineWidth = bladeThickness;
      ctx.lineCap = 'round';
      
      ctx.beginPath();
      ctx.moveTo(Math.sin(bladeAngle) * size * 0.1, 0);
      
      ctx.quadraticCurveTo(
        Math.sin(bladeAngle) * size * 0.15 + bladeSway * 0.5,
        -bladeLength * 0.4,
        Math.sin(bladeAngle) * size * 0.2 + bladeSway,
        -bladeLength * 0.7
      );
      
      ctx.quadraticCurveTo(
        Math.sin(bladeAngle) * size * 0.22 + bladeSway * 1.2,
        -bladeLength * 0.85,
        Math.sin(bladeAngle) * size * 0.25 + bladeSway * 1.5 + Math.sin(time * 0.005 + i) * 2,
        -bladeLength
      );
      
      ctx.stroke();
      
      if (Math.random() > 0.7) {
        ctx.lineWidth = bladeThickness * 0.7;
        ctx.beginPath();
        ctx.moveTo(
          Math.sin(bladeAngle) * size * 0.2 + bladeSway,
          -bladeLength * 0.7
        );
        ctx.lineTo(
          Math.sin(bladeAngle + 0.3) * size * 0.15 + bladeSway * 0.8,
          -bladeLength * 0.85
        );
        ctx.stroke();
      }
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

export const drawFirstPersonHands = (
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  walkCycle: number,
  isMoving: boolean
) => {
  const bobAmount = isMoving ? Math.sin(walkCycle * 0.15) * 15 : 0;
  const swayAmount = isMoving ? Math.cos(walkCycle * 0.1) * 8 : 0;

  ctx.save();

  const leftHandX = canvas.width * 0.15 - swayAmount;
  const leftHandY = canvas.height * 0.7 + bobAmount;
  ctx.fillStyle = '#fdd8b5';
  ctx.beginPath();
  ctx.ellipse(leftHandX, leftHandY, 60, 80, Math.PI * 0.1, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#4a7c59';
  ctx.beginPath();
  ctx.ellipse(leftHandX, leftHandY - 100, 55, 90, Math.PI * 0.05, 0, Math.PI * 2);
  ctx.fill();

  for (let i = 0; i < 4; i++) {
    ctx.fillStyle = '#f4c2a0';
    ctx.beginPath();
    ctx.ellipse(
      leftHandX - 30 + i * 15,
      leftHandY + 60,
      8,
      25,
      Math.PI * (0.15 - i * 0.05),
      0,
      Math.PI * 2
    );
    ctx.fill();
  }

  ctx.fillStyle = '#f4c2a0';
  ctx.beginPath();
  ctx.ellipse(leftHandX - 50, leftHandY + 30, 10, 30, -Math.PI * 0.3, 0, Math.PI * 2);
  ctx.fill();

  const rightHandX = canvas.width * 0.85 + swayAmount;
  const rightHandY = canvas.height * 0.7 - bobAmount;
  ctx.fillStyle = '#fdd8b5';
  ctx.beginPath();
  ctx.ellipse(rightHandX, rightHandY, 60, 80, -Math.PI * 0.1, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#4a7c59';
  ctx.beginPath();
  ctx.ellipse(rightHandX, rightHandY - 100, 55, 90, -Math.PI * 0.05, 0, Math.PI * 2);
  ctx.fill();

  for (let i = 0; i < 4; i++) {
    ctx.fillStyle = '#f4c2a0';
    ctx.beginPath();
    ctx.ellipse(
      rightHandX + 30 - i * 15,
      rightHandY + 60,
      8,
      25,
      -Math.PI * (0.15 - i * 0.05),
      0,
      Math.PI * 2
    );
    ctx.fill();
  }

  ctx.fillStyle = '#f4c2a0';
  ctx.beginPath();
  ctx.ellipse(rightHandX + 50, rightHandY + 30, 10, 30, Math.PI * 0.3, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
};