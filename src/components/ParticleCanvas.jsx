import { useEffect, useRef } from 'react';

const COLORS = ['#6366f1', '#8b5cf6', '#a78bfa', '#c4b5fd'];
const LINK_DISTANCE = 140;
const REPULSE_RADIUS = 90;
const REPULSE_FORCE = 3.5;

function randomBetween(a, b) {
  return a + Math.random() * (b - a);
}

function createParticle(w, h) {
  const speed = randomBetween(0.25, 0.75);
  const angle = Math.random() * Math.PI * 2;
  return {
    x: Math.random() * w,
    y: Math.random() * h,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    size: randomBetween(1, 2.5),
    opacity: randomBetween(0.2, 0.55),
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
  };
}

export default function ParticleCanvas({ count = 70 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animId;
    let particles = [];
    let mouse = { x: -9999, y: -9999 };

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      // Recreate particles on resize to fill new dimensions
      particles = Array.from({ length: count }, () =>
        createParticle(canvas.width, canvas.height)
      );
    };

    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const onMouseLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      // Update positions
      for (const p of particles) {
        // Repulse from mouse
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < REPULSE_RADIUS && dist > 0) {
          const force = (REPULSE_RADIUS - dist) / REPULSE_RADIUS;
          p.vx += (dx / dist) * force * REPULSE_FORCE * 0.05;
          p.vy += (dy / dist) * force * REPULSE_FORCE * 0.05;
          // Clamp velocity
          const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
          if (speed > 3) {
            p.vx = (p.vx / speed) * 3;
            p.vy = (p.vy / speed) * 3;
          }
        } else {
          // Gradually return to base speed
          const targetSpeed = randomBetween(0.25, 0.75);
          const curSpeed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
          if (curSpeed > targetSpeed) {
            p.vx *= 0.99;
            p.vy *= 0.99;
          }
        }

        p.x += p.vx;
        p.y += p.vy;

        // Bounce off edges
        if (p.x <= 0 || p.x >= w) p.vx *= -1;
        if (p.y <= 0 || p.y >= h) p.vy *= -1;
        p.x = Math.max(0, Math.min(w, p.x));
        p.y = Math.max(0, Math.min(h, p.y));
      }

      // Draw links
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < LINK_DISTANCE) {
            const alpha = (1 - d / LINK_DISTANCE) * 0.18;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(99,102,241,${alpha})`;
            ctx.lineWidth = 1;
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // Draw particles
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        // Parse hex color and apply opacity
        ctx.fillStyle = p.color + Math.round(p.opacity * 255).toString(16).padStart(2, '0');
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener('resize', resize);
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseleave', onMouseLeave);
    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [count]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'auto',
      }}
    />
  );
}
