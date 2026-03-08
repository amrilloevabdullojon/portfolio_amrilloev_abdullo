import { useEffect, useRef } from 'react';

export default function Cursor() {
  const dotRef = useRef(null);
  const glowRef = useRef(null);
  const pos = useRef({ x: -100, y: -100 });
  const glowPos = useRef({ x: -100, y: -100 });
  const rafRef = useRef(null);

  useEffect(() => {
    // Hide on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      // Dot follows instantly
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x - 4}px, ${pos.current.y - 4}px)`;
      }
      // Glow lags behind (lerp)
      glowPos.current.x += (pos.current.x - glowPos.current.x) * 0.12;
      glowPos.current.y += (pos.current.y - glowPos.current.y) * 0.12;
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${glowPos.current.x - 20}px, ${glowPos.current.y - 20}px)`;
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

    window.addEventListener('mousemove', onMove);
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
      <style>{`
        *, *::before, *::after { cursor: none !important; }
      `}</style>
      {/* Small sharp dot */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          background: '#a5b4fc',
          pointerEvents: 'none',
          zIndex: 99999,
          willChange: 'transform',
          transition: 'opacity 0.15s ease',
          mixBlendMode: 'difference',
        }}
      />
      {/* Lagging glow ring */}
      <div
        ref={glowRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          border: '1px solid rgba(99,102,241,0.6)',
          pointerEvents: 'none',
          zIndex: 99998,
          willChange: 'transform',
          opacity: 0.35,
          transition: 'width 0.2s ease, height 0.2s ease, opacity 0.2s ease',
        }}
      />
    </>
  );
}
