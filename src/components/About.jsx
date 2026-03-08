import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { personalInfo } from '../data/portfolio';

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

const traits = [
  { icon: '🚀', label: 'Performance-focused development' },
  { icon: '🎨', label: 'Clean, maintainable code' },
  { icon: '🤝', label: 'Team collaboration & communication' },
  { icon: '📚', label: 'Continuous learning mindset' },
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

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
          <h2>About Me</h2>
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
                  alt="Amrilloev Abdullo"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
                />
              </div>

              <div style={{ textAlign: 'center' }}>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'white', marginBottom: '4px' }}>
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
                <motion.div
                  key={stat.label}
                  whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(99,102,241,0.3)' }}
                  className="glass-card"
                  style={{
                    padding: '16px 8px',
                    textAlign: 'center',
                    cursor: 'default',
                    transition: 'box-shadow 0.3s ease',
                  }}
                >
                  <div
                    style={{
                      fontSize: '1.5rem',
                      fontWeight: 800,
                      background: 'linear-gradient(135deg, #6366f1, #a78bfa)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    {stat.value}
                  </div>
                  <div style={{ color: '#64748b', fontSize: '0.7rem', marginTop: '4px' }}>{stat.label}</div>
                </motion.div>
              ))}
            </div>
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
                // about me
              </p>
              <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 700, color: 'white', lineHeight: 1.2 }}>
                Crafting Digital{' '}
                <span style={{ color: '#8b5cf6' }}>Experiences</span>{' '}
                That Matter
              </h2>
            </div>

            <p style={{ color: '#94a3b8', lineHeight: 1.8, fontSize: '1rem' }}>
              {personalInfo.bio}
            </p>

            {/* Traits */}
            <motion.div
              variants={staggerChildren}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
            >
              {traits.map((trait) => (
                <motion.div
                  key={trait.label}
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
                  <span style={{ fontSize: '1.2rem' }}>{trait.icon}</span>
                  <span style={{ color: '#cbd5e1', fontSize: '0.95rem' }}>{trait.label}</span>
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
                GitHub Profile →
              </motion.a>
              <motion.a
                href={`mailto:${personalInfo.email}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="btn-outline"
              >
                Get in Touch
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
