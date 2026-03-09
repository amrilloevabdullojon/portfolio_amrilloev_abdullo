import { useRef, useEffect, useState, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import { personalInfo } from '../data/portfolio';
import { useLang } from '../context/LangContext';
import { useTheme } from '../context/ThemeContext';

function GitHubStatsImage({ src, isLight }) {
  const [loaded, setLoaded] = useState(false);
  const [gone, setGone] = useState(false);
  const handleLoad = useCallback(() => setLoaded(true), []);
  const handleError = useCallback(() => setGone(true), []);

  // If image never fires load/error (network blocked), give up after 5s
  useEffect(() => {
    if (loaded) return;
    const t = setTimeout(() => setGone(true), 5000);
    return () => clearTimeout(t);
  }, [loaded]);

  if (gone) return null;
  return (
    <div style={{ width: '100%' }}>
      {!loaded && (
        <div style={{
          width: '100%',
          height: '130px',
          borderRadius: '8px',
          background: isLight
            ? 'linear-gradient(90deg, #e8eaf6 25%, #c5cae9 50%, #e8eaf6 75%)'
            : 'linear-gradient(90deg, #1a1a2e 25%, #252540 50%, #1a1a2e 75%)',
          backgroundSize: '200% 100%',
          animation: 'shimmer 1.5s infinite',
        }} />
      )}
      <img
        src={src}
        alt="GitHub Stats"
        loading="lazy"
        style={{ width: '100%', display: loaded ? 'block' : 'none' }}
        onLoad={handleLoad}
        onError={handleError}
      />
      <style>{`@keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }`}</style>
    </div>
  );
}

function useCounter(target, active, duration = 1200) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    const num = parseInt(target, 10);
    if (isNaN(num)) return;
    let start = 0;
    const step = Math.ceil(num / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= num) { setCount(num); clearInterval(timer); }
      else setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [active, target, duration]);
  return count;
}

const fadeLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

const fadeRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

const staggerChildren = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const traitIcons = ['🚀', '🎨', '🤝', '📚'];

function StatCard({ stat, isInView, isLight }) {
  const suffix = stat.value.replace(/[0-9]/g, '');
  const count = useCounter(stat.value, isInView);
  return (
    <motion.div
      whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(99,102,241,0.3)' }}
      className="glass-card"
      style={{ padding: '16px 8px', textAlign: 'center', cursor: 'default', transition: 'box-shadow 0.3s ease' }}
    >
      <div style={{ fontSize: '1.5rem', fontWeight: 800, color: isLight ? '#4f46e5' : '#a5b4fc' }}>
        {count}{suffix}
      </div>
      <div style={{ color: '#64748b', fontSize: '0.7rem', marginTop: '4px' }}>{stat.label}</div>
    </motion.div>
  );
}

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { t } = useLang();
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const avatarRef = useRef(null);

  const handleAvatarMove = (e) => {
    const el = avatarRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rx = (-y / rect.height) * 12;
    const ry = (x / rect.width) * 12;
    el.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.03)`;
  };

  const handleAvatarLeave = () => {
    if (avatarRef.current) avatarRef.current.style.transform = 'perspective(800px) rotateX(0) rotateY(0) scale(1)';
  };

  return (
    <section id="about" className="section-padding" ref={ref}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Title */}
        <motion.div
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2>{t.about.title}</h2>
          <div className="title-line" />
        </motion.div>

        {/* Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '64px',
            alignItems: 'center',
          }}
        >
          {/* Left — Photo & Stats */}
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '32px' }}
          >
            {/* Avatar Card */}
            <div
              ref={avatarRef}
              onMouseMove={handleAvatarMove}
              onMouseLeave={handleAvatarLeave}
              className="glass-card"
              style={{
                padding: '40px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '20px',
                width: '100%',
                maxWidth: '340px',
                position: 'relative',
                overflow: 'hidden',
                transition: 'transform 0.15s ease',
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Glow accent */}
              <div
                style={{
                  position: 'absolute',
                  top: '-40px',
                  right: '-40px',
                  width: '160px',
                  height: '160px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(99,102,241,0.2) 0%, transparent 70%)',
                  filter: 'blur(30px)',
                  pointerEvents: 'none',
                }}
              />

              {/* Avatar Image */}
              <div
                style={{
                  width: '160px',
                  height: '160px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  border: '3px solid rgba(99,102,241,0.45)',
                  boxShadow: '0 0 40px rgba(99,102,241,0.35), 0 0 80px rgba(139,92,246,0.15)',
                  flexShrink: 0,
                }}
              >
                <img
                  src="/assets/avatar.jpg"
                  alt="PANDA FIST"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
                />
              </div>

              <div style={{ textAlign: 'center' }}>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: isLight ? '#1e293b' : 'white', marginBottom: '4px' }}>
                  {personalInfo.name}
                </h3>
                <p style={{ color: '#8b5cf6', fontSize: '0.9rem', fontFamily: '"JetBrains Mono", monospace' }}>
                  {personalInfo.title}
                </p>
              </div>

              {/* Location badge */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: '#64748b',
                  fontSize: '0.85rem',
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                {personalInfo.location}
              </div>
            </div>

            {/* Stats */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '12px',
                width: '100%',
                maxWidth: '340px',
              }}
            >
              {personalInfo.stats.map((stat) => (
                <StatCard key={stat.label} stat={stat} isInView={isInView} isLight={isLight} />
              ))}
            </div>

            {/* GitHub Stats */}
            <motion.a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              style={{
                display: 'block',
                width: '100%',
                maxWidth: '340px',
                borderRadius: '12px',
                overflow: 'hidden',
                border: '1px solid rgba(99,102,241,0.2)',
                textDecoration: 'none',
                transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(99,102,241,0.5)';
                e.currentTarget.style.boxShadow = '0 0 20px rgba(99,102,241,0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(99,102,241,0.2)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <GitHubStatsImage
                isLight={isLight}
                src={`https://github-readme-stats.vercel.app/api?username=amrilloevabdullojon&show_icons=true&hide_border=true&${isLight ? 'bg_color=f8faff&title_color=4f46e5&icon_color=6366f1&text_color=475569' : 'theme=tokyonight&bg_color=0d0d18&title_color=a78bfa&icon_color=6366f1&text_color=94a3b8'}`}
              />
            </motion.a>
          </motion.div>

          {/* Right — Text */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
          >
            <div>
              <p
                style={{
                  fontSize: '0.875rem',
                  color: '#6366f1',
                  fontFamily: '"JetBrains Mono", monospace',
                  marginBottom: '8px',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                }}
              >
                {t.about.tag}
              </p>
              <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 700, color: isLight ? '#1e293b' : 'white', lineHeight: 1.2 }}>
                {t.about.heading}{' '}
                <span style={{ color: '#8b5cf6' }}>{t.about.heading2}</span>{' '}
                {t.about.heading3}
              </h2>
            </div>

            <p style={{ color: isLight ? '#475569' : '#94a3b8', lineHeight: 1.8, fontSize: '1rem' }}>
              {personalInfo.bio}
            </p>

            {/* Traits */}
            <motion.div
              variants={staggerChildren}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
            >
              {t.about.traits.map((label, i) => (
                <motion.div
                  key={label}
                  variants={fadeUp}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px 16px',
                    borderRadius: '10px',
                    background: 'rgba(99,102,241,0.05)',
                    border: '1px solid rgba(99,102,241,0.15)',
                  }}
                >
                  <span style={{ fontSize: '1.2rem' }}>{traitIcons[i]}</span>
                  <span style={{ color: isLight ? '#475569' : '#cbd5e1', fontSize: '0.95rem' }}>{label}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA */}
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginTop: '8px' }}>
              <motion.a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="btn-primary"
              >
                {t.about.cta_github}
              </motion.a>
              <motion.a
                href={`mailto:${personalInfo.email}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="btn-outline"
              >
                {t.about.cta_contact}
              </motion.a>
              <motion.a
                href="/assets/cv.pdf"
                download
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 24px',
                  borderRadius: '12px',
                  border: isLight ? '1px solid rgba(99,102,241,0.25)' : '1px solid rgba(255,255,255,0.12)',
                  color: isLight ? '#475569' : '#94a3b8',
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  background: isLight ? 'rgba(99,102,241,0.05)' : 'rgba(255,255,255,0.04)',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(99,102,241,0.5)';
                  e.currentTarget.style.color = isLight ? '#4f46e5' : '#a5b4fc';
                  e.currentTarget.style.background = 'rgba(99,102,241,0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = isLight ? 'rgba(99,102,241,0.25)' : 'rgba(255,255,255,0.12)';
                  e.currentTarget.style.color = isLight ? '#475569' : '#94a3b8';
                  e.currentTarget.style.background = isLight ? 'rgba(99,102,241,0.05)' : 'rgba(255,255,255,0.04)';
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
                </svg>
                {t.about.cta_cv}
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
