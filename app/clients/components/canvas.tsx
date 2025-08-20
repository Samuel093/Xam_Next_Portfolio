// components/ParticleCanvas.tsx
'use client';

import { useEffect, useState } from 'react';
import { useCanvas } from '@/hooks/useCanvas';

function draw(ctx: CanvasRenderingContext2D) {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
  ctx.beginPath();
  ctx.arc(Math.random() * ctx.canvas.width, Math.random() * ctx.canvas.height, 2, 0, 2 * Math.PI);
  ctx.fill();
}

export default function ParticleCanvas() {
  const [isMounted, setIsMounted] = useState(false);
  const canvasRef = useCanvas(draw);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <canvas
      ref={canvasRef}
      className='absolute inset-0 w-full h-full pointer-events-none opacity-20'/>
  );
}
