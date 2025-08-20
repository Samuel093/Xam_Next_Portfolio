'use client';

import SafeHydrate from '@/app/clients/components/safeHydrate';
import { useCanvas } from '@/hooks/useCanvas';
import { useCallback, useRef, useEffect, useState } from 'react';

class Particle {
  x: number;
  y: number;
  velocity: { x: number; y: number };
  radius: number;
  color: string;

  constructor(ctx: CanvasRenderingContext2D) {
    this.x = Math.random() * ctx.canvas.width;
    this.y = Math.random() * ctx.canvas.height;
    this.velocity = {
      x: (Math.random() - 0.5) * 2,
      y: (Math.random() - 0.5) * 2,
    };
    this.radius = Math.random() * 1.5 + 0.5;
    this.color = `rgba(${Math.random() * 100 + 155}, ${Math.random() * 100 + 155}, ${
      Math.random() * 100 + 155
    }, 0.1)`;
  }

  update(ctx: CanvasRenderingContext2D) {
    this.x += this.velocity.x;
    this.y += this.velocity.y;

    if (this.x < 0 || this.x > ctx.canvas.width) this.velocity.x *= -1;
    if (this.y < 0 || this.y > ctx.canvas.height) this.velocity.y *= -1;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

export function ParticleCanvas() {
  const particles = useRef<Particle[]>([]);
  const [mounted, setMounted] = useState(false);

  const draw = useCallback((ctx: CanvasRenderingContext2D) => {
    if (particles.current.length === 0) {
      particles.current = Array.from({ length: 50 }, () => new Particle(ctx));
    }

    ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    particles.current.forEach((particle) => {
      particle.update(ctx);
      particle.draw(ctx);
    });

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.02)';
    for (let i = 0; i < particles.current.length; i++) {
      for (let j = i; j < particles.current.length; j++) {
        const dx = particles.current[i].x - particles.current[j].x;
        const dy = particles.current[i].y - particles.current[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 100) {
          ctx.beginPath();
          ctx.moveTo(particles.current[i].x, particles.current[i].y);
          ctx.lineTo(particles.current[j].x, particles.current[j].y);
          ctx.stroke();
        }
      }
    }
  }, []);

  const canvasRef = useCanvas(draw);

  // ✅ Wait until component mounts on client
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <SafeHydrate>
    <canvas
      ref={canvasRef}
      className='absolute inset-0 w-full h-full pointer-events-none opacity-20'/>
    </SafeHydrate>
  );
}
