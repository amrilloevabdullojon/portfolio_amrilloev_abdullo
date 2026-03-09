import { useEffect, useRef, useState } from 'react';

const MAX_TRAIL = 6;
const TRAIL_TTL = 220; // ms

export default function Cursor() {
  const dotRef = useRef(null);
  const glowRef = useRef(null);
  const pos = useRef({ x: -200, y: -200 });
  const glowPos = useRef({ x: -200, y: -200 });
  const rafRef = useRef(null);
  const trailRef = useRef([]);
  const idRef = useRef(0);
  // Trail rendered via state, but only updated from rAF (not mousemove) to avoid excessive re-renders
  const [trail, setTrail] = useState([]);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      // Accumulate trail in ref only — setState happens in rAF
      const newDot = { id: idRef.current++, x: e.clientX, y: e.clientY, born: Date.now() };
      trailRef.current = [...trailRef.current.slice(-(MAX_TRAIL - 1)), newDot];
    };

    const animate = () => {
      // Move main dot
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x - 4}px, ${pos.current.y - 4}px)`;
      }
      // Lerp glow ring
      glowPos.current.x += (pos.current.x - glowPos.current.x) * 0.12;
      glowPos.current.y += (pos.current.y - glowPos.current.y) * 0.12;
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${glowPos.current.x - 20}px, ${glowPos.current.y - 20}px)`;
      }
      // Expire old trail dots and sync state once per frame
      const now = Date.now();
      const alive = trailRef.current.filter((d) => now - d.born < TRAIL_TTL);
      if (alive.length !== trailRef.current.length || alive.length > 0) {
        trailRef.current = alive;
        setTrail([...alive]);
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    const onEnterLink = () => {
      if (dotRef.current) dotRef.current.style.opacity = '0';
      if (glowRef.current) {
        glowRef.current.style.width = '50px';
        glowRef.current.style.height = '50px';
        glowRef.current.style.opacity = '0.6';
      }
    };
    const onLeaveLink = () => {
      if (dotRef.current) dotRef.current.style.opacity = '1';
      if (glowRef.current) {
        glowRef.current.style.width = '40px';
        glowRef.current.style.height = '40px';
        glowRef.current.style.opacity = '0.35';
      }
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    rafRef.current = requestAnimationFrame(animate);

    const links = document.querySelectorAll('a, button, [role="button"]');
    links.forEach((el) => {
      el.addEventListener('mouseenter', onEnterLink);
      el.addEventListener('mouseleave', onLeaveLink);
    });

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafRef.current);
      links.forEach((el) => {
        el.removeEventListener('mouseenter', onEnterLink);
        el.removeEventListener('mouseleave', onLeaveLink);
      });
    };
  }, []);

  return (
    <>
      <style>{`*, *::before, *::after { cursor: none !important; }`}</style>

      {/* Trail dots — rendered from state synced in rAF */}
      {trail.map((dot, i) => {
        const age = (Date.now() - dot.born) / TRAIL_TTL;
        const opacity = Math.max(0, (1 - age) * 0.4);
        const scale = Math.max(0, 1 - age * 0.55);
        const size = 5 + (MAX_TRAIL - i) * 0.3;
        return (
          <div
            key={dot.id}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: `${size}px`,
              height: `${size}px`,
              borderRadius: '50%',
              background: `rgba(99,102,241,${opacity.toFixed(2)})`,
              transform: `translate(${dot.x - size / 2}px, ${dot.y - size / 2}px) scale(${scale.toFixed(3)})`,
              pointerEvents: 'none',
              zIndex: 99995,
              willChange: 'transform',
            }}
          />
        );
      })}

      {/* Sharp dot */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed', top: 0, left: 0,
          width: '8px', height: '8px', borderRadius: '50%',
          background: '#a5b4fc', pointerEvents: 'none',
          zIndex: 99999, willChange: 'transform',
          transition: 'opacity 0.15s ease', mixBlendMode: 'difference',
        }}
      />
      {/* Lagging glow ring */}
      <div
        ref={glowRef}
        style={{
          position: 'fixed', top: 0, left: 0,
          width: '40px', height: '40px', borderRadius: '50%',
          border: '1px solid rgba(99,102,241,0.6)',
          pointerEvents: 'none', zIndex: 99998,
          willChange: 'transform', opacity: 0.35,
          transition: 'width 0.2s ease, height 0.2s ease, opacity 0.2s ease',
        }}
      />
    </>
  );
}
