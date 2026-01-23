import type { Enemy, Tree, Building, Stair, Bullet } from './types';

export const drawPlayer = (
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  playerAngle: number,
  playerHealth: number
) => {
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

export const drawEnemy = (
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  enemy: Enemy,
  playerX: number,
  playerZ: number,
  playerAngle: number
) => {
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

export const drawTree = (
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  tree: Tree,
  playerX: number,
  playerZ: number,
  playerAngle: number
) => {
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

export const drawStairs = (
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  stair: Stair,
  playerX: number,
  playerZ: number,
  playerAngle: number
) => {
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

export const drawBuilding = (
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  building: Building,
  playerX: number,
  playerZ: number,
  playerAngle: number
) => {
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

export const drawBullet = (
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  bullet: Bullet,
  playerX: number,
  playerZ: number,
  playerAngle: number
) => {
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

export const drawCrosshair = (
  ctx: CanvasRenderingContext2D,
  mouseX: number,
  mouseY: number
) => {
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
