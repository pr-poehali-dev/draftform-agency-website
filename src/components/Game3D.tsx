import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

export default function Game3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 1200;
    canvas.height = 800;

    let animationId: number;
    let time = 0;
    let cameraZ = 0;

    const mountains: Array<{
      x: number;
      z: number;
      height: number;
      width: number;
    }> = [];

    for (let i = 0; i < 8; i++) {
      mountains.push({
        x: (Math.random() - 0.5) * 2000,
        z: Math.random() * 3000 + 2000,
        height: Math.random() * 300 + 200,
        width: Math.random() * 400 + 300
      });
    }

    const buildings: Array<{
      x: number;
      z: number;
      height: number;
      width: number;
      depth: number;
      color: string;
    }> = [];

    for (let i = 0; i < 20; i++) {
      buildings.push({
        x: (Math.random() - 0.5) * 1500,
        z: Math.random() * 2000 + 500,
        height: Math.random() * 150 + 80,
        width: Math.random() * 60 + 40,
        depth: Math.random() * 60 + 40,
        color: ['#4a5568', '#718096', '#2d3748'][Math.floor(Math.random() * 3)]
      });
    }

    const trees: Array<{
      x: number;
      z: number;
      height: number;
    }> = [];

    for (let i = 0; i < 50; i++) {
      trees.push({
        x: (Math.random() - 0.5) * 2000,
        z: Math.random() * 2500 + 300,
        height: Math.random() * 80 + 60
      });
    }

    const grass: Array<{
      x: number;
      z: number;
      sway: number;
    }> = [];

    for (let i = 0; i < 400; i++) {
      grass.push({
        x: (Math.random() - 0.5) * 2500,
        z: Math.random() * 2000 + 100,
        sway: Math.random() * Math.PI * 2
      });
    }

    const roadSegments: Array<{
      z: number;
      curve: number;
    }> = [];

    for (let i = 0; i < 100; i++) {
      roadSegments.push({
        z: i * 50,
        curve: Math.sin(i * 0.3) * 200
      });
    }

    const drawMountain = (x: number, y: number, width: number, height: number, alpha: number) => {
      const gradient = ctx.createLinearGradient(x, y - height, x, y);
      gradient.addColorStop(0, `rgba(139, 147, 163, ${alpha})`);
      gradient.addColorStop(0.7, `rgba(100, 116, 139, ${alpha})`);
      gradient.addColorStop(1, `rgba(71, 85, 105, ${alpha})`);
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.moveTo(x - width / 2, y);
      ctx.lineTo(x - width / 3, y - height * 0.5);
      ctx.lineTo(x, y - height);
      ctx.lineTo(x + width / 3, y - height * 0.6);
      ctx.lineTo(x + width / 2, y);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.8})`;
      ctx.beginPath();
      ctx.moveTo(x - 10, y - height);
      ctx.lineTo(x, y - height + 15);
      ctx.lineTo(x + 10, y - height);
      ctx.closePath();
      ctx.fill();
    };

    const drawBuilding = (x: number, y: number, width: number, height: number, depth: number, scale: number, alpha: number, color: string) => {
      ctx.fillStyle = color.replace(')', `, ${alpha})`).replace('rgb', 'rgba');
      ctx.fillRect(x - width / 2, y - height, width, height);

      const darkerColor = color.replace(')', `, ${alpha * 0.7})`).replace('rgb', 'rgba');
      ctx.fillStyle = darkerColor;
      ctx.beginPath();
      ctx.moveTo(x + width / 2, y - height);
      ctx.lineTo(x + width / 2 + depth * 0.5, y - height + depth * 0.5);
      ctx.lineTo(x + width / 2 + depth * 0.5, y + depth * 0.5);
      ctx.lineTo(x + width / 2, y);
      ctx.closePath();
      ctx.fill();

      ctx.strokeStyle = `rgba(30, 41, 59, ${alpha})`;
      ctx.lineWidth = 2;
      ctx.strokeRect(x - width / 2, y - height, width, height);

      const windowSize = 8 * scale;
      const windowSpacing = 15 * scale;
      ctx.fillStyle = `rgba(255, 255, 150, ${alpha * 0.6})`;
      for (let wy = y - height + 20; wy < y - 10; wy += windowSpacing) {
        for (let wx = x - width / 2 + 10; wx < x + width / 2 - 10; wx += windowSpacing) {
          ctx.fillRect(wx, wy, windowSize, windowSize);
        }
      }
    };

    const drawTree = (x: number, y: number, height: number, scale: number, alpha: number) => {
      ctx.fillStyle = `rgba(101, 67, 33, ${alpha})`;
      ctx.fillRect(x - 4 * scale, y - height * 0.3, 8 * scale, height * 0.3);

      ctx.fillStyle = `rgba(34, 139, 34, ${alpha})`;
      ctx.beginPath();
      ctx.arc(x, y - height * 0.7, 20 * scale, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.arc(x - 15 * scale, y - height * 0.6, 15 * scale, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.arc(x + 15 * scale, y - height * 0.6, 15 * scale, 0, Math.PI * 2);
      ctx.fill();
    };

    const drawGrass = (x: number, y: number, scale: number, alpha: number, sway: number) => {
      const swayOffset = Math.sin(time * 2 + sway) * 3 * scale;
      ctx.strokeStyle = `rgba(50, 150, 50, ${alpha})`;
      ctx.lineWidth = 2 * scale;
      ctx.lineCap = 'round';

      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + swayOffset, y - 15 * scale);
      ctx.stroke();
    };

    const drawRoad = () => {
      const roadWidth = 300;
      
      for (let i = 0; i < roadSegments.length - 1; i++) {
        const seg = roadSegments[i];
        const nextSeg = roadSegments[i + 1];
        
        const z1 = seg.z - cameraZ;
        const z2 = nextSeg.z - cameraZ;
        
        if (z1 < 1 || z1 > 3000) continue;

        const scale1 = 800 / z1;
        const scale2 = 800 / z2;

        const x1 = seg.curve * scale1 + canvas.width / 2;
        const x2 = nextSeg.curve * scale2 + canvas.width / 2;
        const y1 = canvas.height * 0.75;
        const y2 = canvas.height * 0.75;

        const w1 = roadWidth * scale1;
        const w2 = roadWidth * scale2;

        const gradient = ctx.createLinearGradient(x1, y1, x2, y2);
        gradient.addColorStop(0, '#2c3e50');
        gradient.addColorStop(1, '#34495e');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.moveTo(x1 - w1 / 2, y1);
        ctx.lineTo(x1 + w1 / 2, y1);
        ctx.lineTo(x2 + w2 / 2, y2);
        ctx.lineTo(x2 - w2 / 2, y2);
        ctx.closePath();
        ctx.fill();

        if (i % 3 === 0) {
          ctx.strokeStyle = '#f1c40f';
          ctx.lineWidth = 3 * scale1;
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.stroke();
        }
      }
    };

    const draw3D = () => {
      const skyGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      skyGradient.addColorStop(0, '#87CEEB');
      skyGradient.addColorStop(0.5, '#B0E0E6');
      skyGradient.addColorStop(1, '#90EE90');
      ctx.fillStyle = skyGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      time += 0.02;
      cameraZ += 2;

      roadSegments.forEach(seg => {
        if (seg.z - cameraZ < -100) {
          seg.z += 5000;
        }
      });

      mountains.sort((a, b) => b.z - a.z);
      mountains.forEach(m => {
        const z = m.z - cameraZ;
        if (z < 1 || z > 5000) return;

        const scale = 800 / z;
        const x2d = m.x * scale + canvas.width / 2;
        const y2d = canvas.height * 0.7;
        const alpha = Math.min(1, 3000 / z);

        drawMountain(x2d, y2d, m.width * scale, m.height * scale, alpha * 0.6);
      });

      drawRoad();

      const allObjects = [
        ...buildings.map(b => ({ ...b, type: 'building' as const })),
        ...trees.map(t => ({ ...t, type: 'tree' as const })),
        ...grass.map(g => ({ ...g, type: 'grass' as const }))
      ];

      allObjects.sort((a, b) => b.z - a.z);

      allObjects.forEach(obj => {
        const z = obj.z - cameraZ;
        if (z < 1 || z > 3000) return;

        const scale = 800 / z;
        const x2d = obj.x * scale + canvas.width / 2;
        const y2d = canvas.height * 0.75;
        const alpha = Math.min(1, 2000 / z);

        if (obj.type === 'building') {
          drawBuilding(x2d, y2d, obj.width * scale, obj.height * scale, obj.depth * scale, scale, alpha, obj.color);
        } else if (obj.type === 'tree') {
          drawTree(x2d, y2d, obj.height * scale, scale, alpha);
        } else if (obj.type === 'grass') {
          drawGrass(x2d, y2d, scale, alpha, obj.sway);
        }
      });

      animationId = requestAnimationFrame(draw3D);
    };

    draw3D();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

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

  return (
    <div ref={containerRef} className="w-full flex flex-col items-center space-y-4 relative bg-black p-4 rounded-lg">
      <canvas 
        ref={canvasRef} 
        className="w-full max-w-6xl rounded-lg border-4 border-accent shadow-2xl"
      />
      <Button
        onClick={toggleFullscreen}
        className="bg-accent hover:bg-accent/90 text-white font-bold"
        size="lg"
      >
        <Icon name={isFullscreen ? "Minimize" : "Maximize"} size={20} className="mr-2" />
        {isFullscreen ? "ВЫЙТИ ИЗ ПОЛНОГО ЭКРАНА" : "НА ВЕСЬ ЭКРАН"}
      </Button>
      <div className="text-white text-center text-sm">
        <p>🏔️ Горы • 🏢 Здания • 🌳 Деревья • 🌾 Трава • 🛣️ Дорога</p>
      </div>
    </div>
  );
}
