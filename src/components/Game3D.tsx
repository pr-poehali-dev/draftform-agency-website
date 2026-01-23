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

    const particles: Array<{
      x: number;
      y: number;
      z: number;
      vx: number;
      vy: number;
      vz: number;
    }> = [];

    for (let i = 0; i < 200; i++) {
      particles.push({
        x: Math.random() * canvas.width - canvas.width / 2,
        y: Math.random() * canvas.height - canvas.height / 2,
        z: Math.random() * 1500,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        vz: Math.random() * 3 + 1
      });
    }

    const grass: Array<{
      x: number;
      z: number;
      height: number;
      sway: number;
    }> = [];

    for (let i = 0; i < 300; i++) {
      grass.push({
        x: Math.random() * canvas.width - canvas.width / 2,
        z: Math.random() * 1500,
        height: Math.random() * 30 + 20,
        sway: Math.random() * Math.PI * 2
      });
    }

    const trees: Array<{
      x: number;
      z: number;
      height: number;
    }> = [];

    for (let i = 0; i < 30; i++) {
      trees.push({
        x: Math.random() * canvas.width - canvas.width / 2,
        z: Math.random() * 1500 + 500,
        height: Math.random() * 100 + 80
      });
    }

    const characters: Array<{
      x: number;
      z: number;
      type: number;
      walkCycle: number;
    }> = [];

    for (let i = 0; i < 15; i++) {
      characters.push({
        x: Math.random() * canvas.width - canvas.width / 2,
        z: Math.random() * 1500 + 200,
        type: Math.floor(Math.random() * 3),
        walkCycle: Math.random() * Math.PI * 2
      });
    }

    const drawGrass = () => {
      grass.sort((a, b) => b.z - a.z);

      grass.forEach(g => {
        g.z -= 2;
        if (g.z < 1) {
          g.z = 1500;
          g.x = Math.random() * canvas.width - canvas.width / 2;
        }

        const scale = 600 / g.z;
        const x2d = g.x * scale + canvas.width / 2;
        const y2d = canvas.height * 0.7 + (g.z / 1500) * 100;
        const height = g.height * scale;
        const width = 3 * scale;

        const swayOffset = Math.sin(time * 3 + g.sway) * 5 * scale;

        const alpha = 1 - g.z / 1500;
        ctx.strokeStyle = `hsla(110, 60%, 40%, ${alpha})`;
        ctx.lineWidth = width;
        ctx.lineCap = 'round';
        
        ctx.beginPath();
        ctx.moveTo(x2d, y2d);
        ctx.quadraticCurveTo(
          x2d + swayOffset / 2, 
          y2d - height / 2, 
          x2d + swayOffset, 
          y2d - height
        );
        ctx.stroke();
      });
    };

    const drawTree = (x: number, y: number, height: number, scale: number, alpha: number) => {
      ctx.fillStyle = `hsla(30, 40%, 30%, ${alpha})`;
      ctx.fillRect(x - 5 * scale, y - height * 0.3, 10 * scale, height * 0.3);
      
      ctx.fillStyle = `hsla(120, 50%, 30%, ${alpha})`;
      ctx.beginPath();
      ctx.moveTo(x, y - height);
      ctx.lineTo(x - 30 * scale, y - height * 0.6);
      ctx.lineTo(x + 30 * scale, y - height * 0.6);
      ctx.closePath();
      ctx.fill();
      
      ctx.beginPath();
      ctx.moveTo(x, y - height * 0.8);
      ctx.lineTo(x - 25 * scale, y - height * 0.5);
      ctx.lineTo(x + 25 * scale, y - height * 0.5);
      ctx.closePath();
      ctx.fill();
      
      ctx.fillStyle = `hsla(120, 60%, 35%, ${alpha})`;
      ctx.beginPath();
      ctx.moveTo(x, y - height * 0.65);
      ctx.lineTo(x - 20 * scale, y - height * 0.4);
      ctx.lineTo(x + 20 * scale, y - height * 0.4);
      ctx.closePath();
      ctx.fill();
    };

    const drawCharacter = (x: number, y: number, scale: number, alpha: number, type: number, walkCycle: number) => {
      const colors = [
        { body: '#3b82f6', accent: '#60a5fa' },
        { body: '#ef4444', accent: '#f87171' },
        { body: '#22c55e', accent: '#4ade80' }
      ];
      const color = colors[type];
      
      const bounce = Math.sin(walkCycle) * 3 * scale;
      
      ctx.fillStyle = `${color.body}${Math.floor(alpha * 255).toString(16).padStart(2, '0')}`;
      ctx.beginPath();
      ctx.arc(x, y - 35 * scale + bounce, 12 * scale, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.fillStyle = `${color.body}${Math.floor(alpha * 255).toString(16).padStart(2, '0')}`;
      ctx.fillRect(x - 8 * scale, y - 25 * scale + bounce, 16 * scale, 20 * scale);
      
      const legOffset = Math.sin(walkCycle) * 5 * scale;
      ctx.fillStyle = `${color.accent}${Math.floor(alpha * 255).toString(16).padStart(2, '0')}`;
      ctx.fillRect(x - 7 * scale + legOffset, y - 8 * scale, 5 * scale, 8 * scale);
      ctx.fillRect(x + 2 * scale - legOffset, y - 8 * scale, 5 * scale, 8 * scale);
      
      const armOffset = Math.sin(walkCycle + Math.PI) * 8 * scale;
      ctx.fillRect(x - 10 * scale, y - 22 * scale + bounce + armOffset, 4 * scale, 12 * scale);
      ctx.fillRect(x + 6 * scale, y - 22 * scale + bounce - armOffset, 4 * scale, 12 * scale);
    };

    const draw3D = () => {
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#0f172a');
      gradient.addColorStop(0.6, '#1e3a5f');
      gradient.addColorStop(1, '#2d5016');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      time += 0.015;

      const allObjects = [
        ...trees.map(t => ({ ...t, type: 'tree' as const })),
        ...characters.map(c => ({ ...c, type: 'character' as const }))
      ];
      allObjects.sort((a, b) => b.z - a.z);

      allObjects.forEach(obj => {
        if (obj.type === 'tree') {
          obj.z -= 1.5;
          if (obj.z < 1) {
            obj.z = 1500;
            obj.x = Math.random() * canvas.width - canvas.width / 2;
          }

          const scale = 600 / obj.z;
          const x2d = obj.x * scale + canvas.width / 2;
          const y2d = canvas.height * 0.7 + (obj.z / 1500) * 100;
          const alpha = 1 - obj.z / 1500;
          
          drawTree(x2d, y2d, obj.height * scale, scale, alpha);
        } else {
          obj.z -= 2;
          obj.walkCycle += 0.15;
          if (obj.z < 1) {
            obj.z = 1500;
            obj.x = Math.random() * canvas.width - canvas.width / 2;
          }

          const scale = 600 / obj.z;
          const x2d = obj.x * scale + canvas.width / 2;
          const y2d = canvas.height * 0.7 + (obj.z / 1500) * 100;
          const alpha = 1 - obj.z / 1500;
          
          drawCharacter(x2d, y2d, scale, alpha, obj.type, obj.walkCycle);
        }
      });

      drawGrass();

      particles.forEach(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.z -= particle.vz;

        if (particle.z < 1) {
          particle.z = 1500;
          particle.x = Math.random() * canvas.width - canvas.width / 2;
          particle.y = Math.random() * canvas.height - canvas.height / 2;
        }

        const scale = 600 / particle.z;
        const x2d = particle.x * scale + canvas.width / 2;
        const y2d = particle.y * scale + canvas.height / 2;
        const size = scale * 4;

        const hue = (particle.z / 1500) * 280 + time * 60;
        const alpha = 1 - particle.z / 1500;
        
        ctx.shadowBlur = 15;
        ctx.shadowColor = `hsla(${hue}, 80%, 60%, ${alpha})`;
        
        ctx.fillStyle = `hsla(${hue}, 80%, 65%, ${alpha})`;
        ctx.beginPath();
        ctx.arc(x2d, y2d, size, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = `hsla(${hue}, 80%, 70%, ${alpha * 0.4})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(x2d, y2d);
        ctx.lineTo(x2d + particle.vx * 20, y2d + particle.vy * 20);
        ctx.stroke();
      });

      ctx.shadowBlur = 0;
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
    <div ref={containerRef} className="w-full flex flex-col items-center space-y-4 relative">
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
    </div>
  );
}