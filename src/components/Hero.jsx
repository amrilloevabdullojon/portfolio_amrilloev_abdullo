import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiSend } from 'react-icons/fi';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ParticleCanvas from './ParticleCanvas';
import { personalInfo } from '../data/portfolio';

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

    return () => ctx.revert();
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
      {/* Particle Background */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <ParticleCanvas count={70} />
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

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{
          position: 'relative',
          zIndex: 10,
          textAlign: 'center',
          padding: '0 24px',
          maxWidth: '860px',
          margin: '0 auto',
        }}
      >
        {/* Available badge */}
        <motion.div variants={itemVariants}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 16px',
              borderRadius: '50px',
              background: 'rgba(99,102,241,0.12)',
              border: '1px solid rgba(99,102,241,0.3)',
              color: '#a5b4fc',
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
            Available for work
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
          Hello, I&apos;m
        </motion.p>

        {/* Name */}
        <motion.h1
          variants={itemVariants}
          style={{
            fontSize: 'clamp(2.8rem, 7vw, 5rem)',
            fontWeight: 800,
            lineHeight: 1.1,
            marginBottom: '20px',
            background: 'linear-gradient(135deg, #fff 0%, #c7d2fe 50%, #a78bfa 100%)',
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
            color: '#94a3b8',
            fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
            lineHeight: 1.7,
            maxWidth: '600px',
            margin: '0 auto 40px',
          }}
        >
          {personalInfo.bioShort}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '60px' }}
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="btn-primary"
            onClick={() => handleNavClick('#projects')}
          >
            View Projects →
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="btn-outline"
            onClick={() => handleNavClick('#contact')}
          >
            Contact Me
          </motion.button>
        </motion.div>

        {/* Social Links */}
        <motion.div
          variants={itemVariants}
          style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginBottom: '60px' }}
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
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#94a3b8',
                textDecoration: 'none',
                fontSize: '0.8rem',
                fontFamily: '"JetBrains Mono", monospace',
                fontWeight: 600,
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#a5b4fc';
                e.currentTarget.style.borderColor = 'rgba(99,102,241,0.4)';
                e.currentTarget.style.background = 'rgba(99,102,241,0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#94a3b8';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
              }}
            >
              {s.icon}
              <span>{s.label}</span>
            </motion.a>
          ))}
        </motion.div>
      </motion.div>

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
