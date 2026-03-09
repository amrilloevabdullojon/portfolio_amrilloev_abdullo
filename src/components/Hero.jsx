import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiSend } from 'react-icons/fi';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ParticleCanvas from './ParticleCanvas';
import { personalInfo } from '../data/portfolio';
import { useLang } from '../context/LangContext';
import { useTheme } from '../context/ThemeContext';

gsap.registerPlugin(ScrollTrigger);

function useTypewriter(words, speed = 110, pauseMs = 1800) {
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const current = words[wordIndex % words.length];

    timeoutRef.current = setTimeout(() => {
      if (!isDeleting) {
        const next = current.slice(0, text.length + 1);
        setText(next);
        if (next === current) {
          setTimeout(() => setIsDeleting(true), pauseMs);
        }
      } else {
        const next = current.slice(0, text.length - 1);
        setText(next);
        if (next === '') {
          setIsDeleting(false);
          setWordIndex((i) => (i + 1) % words.length);
        }
      }
    }, isDeleting ? speed / 2 : speed);

    return () => clearTimeout(timeoutRef.current);
  }, [text, isDeleting, wordIndex, words, speed, pauseMs]);

  return text;
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.3 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const socialLinks = [
  { label: 'GitHub', icon: <FiGithub size={16} />, href: personalInfo.github },
  { label: 'LinkedIn', icon: <FiLinkedin size={16} />, href: personalInfo.linkedin },
  { label: 'Telegram', icon: <FiSend size={16} />, href: personalInfo.telegram },
];

export default function Hero() {
  const { t } = useLang();
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const typeText = useTypewriter(personalInfo.taglines);
  const blob1Ref = useRef(null);
  const blob2Ref = useRef(null);
  const blob3Ref = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      // Continuous idle float for each blob
      gsap.to(blob1Ref.current, {
        y: '+=22',
        x: '+=10',
        duration: 4.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
      gsap.to(blob2Ref.current, {
        y: '+=16',
        x: '-=13',
        duration: 5.1,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
      gsap.to(blob3Ref.current, {
        y: '+=28',
        x: '+=9',
        duration: 3.7,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // Scroll parallax
      gsap.to(blob1Ref.current, {
        y: '-=180',
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5,
        },
      });
      gsap.to(blob2Ref.current, {
        y: '-=100',
        x: '+=40',
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 2.5,
        },
      });
      gsap.to(blob3Ref.current, {
        y: '-=60',
        x: '-=30',
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll()
        .filter((st) => st.trigger === sectionRef.current)
        .forEach((st) => st.kill());
    };
  }, []);

  const handleNavClick = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Particle Background — reduced on mobile for performance */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <ParticleCanvas count={window.innerWidth < 768 ? 30 : 70} />
      </div>

      {/* Floating Blobs */}
      <div
        ref={blob1Ref}
        style={{
          position: 'absolute',
          top: '20%',
          left: '15%',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99,102,241,0.25) 0%, transparent 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      <div
        ref={blob2Ref}
        style={{
          position: 'absolute',
          top: '30%',
          right: '15%',
          width: '320px',
          height: '320px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(139,92,246,0.2) 0%, transparent 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      <div
        ref={blob3Ref}
        style={{
          position: 'absolute',
          bottom: '25%',
          left: '35%',
          width: '260px',
          height: '260px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(167,139,250,0.15) 0%, transparent 70%)',
          filter: 'blur(50px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Content — two-column on desktop */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{
          position: 'relative',
          zIndex: 10,
          padding: '0 32px',
          maxWidth: '1100px',
          margin: '0 auto',
          width: '100%',
          display: 'grid',
          gridTemplateColumns: 'minmax(0,1fr) auto',
          gap: '60px',
          alignItems: 'center',
        }}
        className="hero-grid"
      >
        {/* Left — Text content */}
        <div>
        {/* Available badge */}
        <motion.div variants={itemVariants}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 16px',
              borderRadius: '50px',
              background: isLight ? 'rgba(99,102,241,0.08)' : 'rgba(99,102,241,0.12)',
              border: '1px solid rgba(99,102,241,0.3)',
              color: isLight ? '#4f46e5' : '#a5b4fc',
              fontSize: '0.8rem',
              fontWeight: 500,
              marginBottom: '28px',
              fontFamily: '"JetBrains Mono", monospace',
            }}
          >
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#4ade80',
                display: 'inline-block',
                boxShadow: '0 0 8px rgba(74,222,128,0.6)',
                animation: 'pulse 2s infinite',
              }}
            />
            {t.hero.available}
          </span>
        </motion.div>

        {/* Greeting */}
        <motion.p
          variants={itemVariants}
          style={{
            fontFamily: '"JetBrains Mono", monospace',
            color: '#6366f1',
            fontSize: '1.1rem',
            marginBottom: '12px',
            letterSpacing: '0.05em',
          }}
        >
          {t.hero.greeting}
        </motion.p>

        {/* Name */}
        <motion.h1
          variants={itemVariants}
          style={{
            fontSize: 'clamp(2.8rem, 7vw, 5rem)',
            fontWeight: 800,
            lineHeight: 1.1,
            marginBottom: '20px',
            background: isLight
              ? 'linear-gradient(135deg, #1e293b 0%, #4f46e5 50%, #7c3aed 100%)'
              : 'linear-gradient(135deg, #fff 0%, #c7d2fe 50%, #a78bfa 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          {personalInfo.name}
        </motion.h1>

        {/* Typewriter */}
        <motion.div
          variants={itemVariants}
          style={{ marginBottom: '24px', minHeight: '2.5rem' }}
        >
          <span
            className="typewriter-cursor"
            style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: 'clamp(1.1rem, 3vw, 1.5rem)',
              fontWeight: 600,
              color: '#8b5cf6',
              textShadow: '0 0 20px rgba(139,92,246,0.5)',
            }}
          >
            {typeText}
          </span>
        </motion.div>

        {/* Bio */}
        <motion.p
          variants={itemVariants}
          style={{
            color: isLight ? '#475569' : '#94a3b8',
            fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
            lineHeight: 1.7,
            maxWidth: '540px',
            margin: '0 0 40px',
          }}
        >
          {personalInfo.bioShort}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          style={{ display: 'flex', gap: '16px', justifyContent: 'flex-start', flexWrap: 'wrap', marginBottom: '48px' }}
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="btn-primary"
            onClick={() => handleNavClick('#projects')}
          >
            {t.hero.cta_projects}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="btn-outline"
            onClick={() => handleNavClick('#contact')}
          >
            {t.hero.cta_contact}
          </motion.button>
          <motion.a
            href="/assets/cv.pdf"
            download
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 28px',
              borderRadius: '12px',
              border: isLight ? '1px solid rgba(99,102,241,0.25)' : '1px solid rgba(255,255,255,0.12)',
              color: isLight ? '#475569' : '#94a3b8',
              textDecoration: 'none',
              fontSize: '0.95rem',
              fontWeight: 600,
              transition: 'all 0.2s ease',
              background: isLight ? 'rgba(99,102,241,0.05)' : 'rgba(255,255,255,0.04)',
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
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
            </svg>
            {t.hero.cta_cv}
          </motion.a>
        </motion.div>

        {/* Social Links */}
        <motion.div
          variants={itemVariants}
          style={{ display: 'flex', gap: '12px', justifyContent: 'flex-start', flexWrap: 'wrap', marginBottom: '0' }}
        >
          {socialLinks.map((s) => (
            <motion.a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -3, scale: 1.1 }}
              title={s.label}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 16px',
                borderRadius: '8px',
                background: isLight ? 'rgba(99,102,241,0.06)' : 'rgba(255,255,255,0.05)',
                border: isLight ? '1px solid rgba(99,102,241,0.2)' : '1px solid rgba(255,255,255,0.1)',
                color: isLight ? '#475569' : '#94a3b8',
                textDecoration: 'none',
                fontSize: '0.8rem',
                fontFamily: '"JetBrains Mono", monospace',
                fontWeight: 600,
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = isLight ? '#4f46e5' : '#a5b4fc';
                e.currentTarget.style.borderColor = 'rgba(99,102,241,0.4)';
                e.currentTarget.style.background = 'rgba(99,102,241,0.12)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = isLight ? '#475569' : '#94a3b8';
                e.currentTarget.style.borderColor = isLight ? 'rgba(99,102,241,0.2)' : 'rgba(255,255,255,0.1)';
                e.currentTarget.style.background = isLight ? 'rgba(99,102,241,0.06)' : 'rgba(255,255,255,0.05)';
              }}
            >
              {s.icon}
              <span>{s.label}</span>
            </motion.a>
          ))}
        </motion.div>
        </div>{/* end left col */}

        {/* Right — Avatar */}
        <motion.div
          variants={itemVariants}
          className="hero-avatar-col"
          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
          <div style={{ position: 'relative' }}>
            {/* Outer glow ring */}
            <div style={{
              position: 'absolute', inset: '-12px', borderRadius: '50%',
              background: 'conic-gradient(from 0deg, #6366f1, #8b5cf6, #a78bfa, #6366f1)',
              opacity: 0.25, filter: 'blur(16px)', animation: 'spin 8s linear infinite',
            }} />
            <div style={{
              width: '280px', height: '280px', borderRadius: '50%', overflow: 'hidden',
              border: '3px solid rgba(99,102,241,0.5)',
              boxShadow: '0 0 50px rgba(99,102,241,0.4), 0 0 100px rgba(139,92,246,0.2)',
              position: 'relative', zIndex: 1,
            }}>
              <img
                src="/assets/avatar.jpg"
                alt="PANDA FIST"
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
              />
            </div>
            {/* GitHub stats badge */}
            <motion.a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2, type: 'spring' }}
              style={{
                position: 'absolute', bottom: '10px', right: '-20px',
                background: isLight ? 'rgba(255,255,255,0.95)' : 'rgba(10,10,15,0.9)', backdropFilter: 'blur(12px)',
                border: '1px solid rgba(99,102,241,0.3)', borderRadius: '12px',
                padding: '8px 14px', display: 'flex', alignItems: 'center', gap: '8px',
                textDecoration: 'none', color: isLight ? '#1e293b' : 'white', fontSize: '0.78rem', fontWeight: 600,
                boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
                zIndex: 2,
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#6366f1">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/>
              </svg>
              <span style={{ color: '#a5b4fc' }}>Open to Work</span>
            </motion.a>
          </div>
        </motion.div>

      </motion.div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; text-align: center; }
          .hero-avatar-col { display: none !important; }
        }
      `}</style>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        style={{
          position: 'absolute',
          bottom: '32px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          color: '#475569',
          zIndex: 10,
        }}
      >
        <span style={{ fontSize: '0.7rem', fontFamily: '"JetBrains Mono", monospace', letterSpacing: '0.1em' }}>
          SCROLL
        </span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </motion.div>
      </motion.div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.2); }
        }
      `}</style>
    </section>
  );
}
