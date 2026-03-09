import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLang } from '../context/LangContext';
import { useTheme } from '../context/ThemeContext';

const navKeys = ['home', 'about', 'skills', 'timeline', 'projects', 'contact'];
const navHrefs = ['#hero', '#about', '#skills', '#timeline', '#projects', '#contact'];

const LANGS = [
  { code: 'en', label: 'EN' },
  { code: 'ru', label: 'RU' },
  { code: 'uz', label: 'UZ' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');
  const { lang, switchLang, t } = useLang();
  const { theme, toggleTheme } = useTheme();

  const navLinks = navKeys.map((key, i) => ({ label: t.nav[key], href: navHrefs[i] }));

  useEffect(() => {
    const handler = () => {
      setScrolled(window.scrollY > 50);
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? window.scrollY / total : 0);
    };
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  // Track active section via IntersectionObserver
  // Use navHrefs (module-level constant) to avoid stale closure on lang switch
  useEffect(() => {
    const sectionIds = navHrefs.map((h) => h.slice(1));
    const observers = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { threshold: 0.35 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: scrolled ? '12px 32px' : '20px 32px',
        background: scrolled ? 'rgba(10,10,15,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.08)' : 'none',
        boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.3)' : 'none',
        transition: 'all 0.4s ease',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Logo */}
        <a href="#hero" onClick={(e) => handleNavClick(e, '#hero')} style={{ textDecoration: 'none' }}>
          <motion.div
            whileHover={{ scale: 1.05 }}
            style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontWeight: 600,
              fontSize: '1.25rem',
              background: 'linear-gradient(135deg, #6366f1, #a78bfa)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {'<PF />'}
          </motion.div>
        </a>

        {/* Desktop Links */}
        <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }} className="desktop-nav">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.slice(1);
            return (
              <motion.a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                aria-current={isActive ? 'page' : undefined}
                aria-label={link.label}
                whileHover={{ y: -2 }}
                style={{
                  position: 'relative',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  color: isActive ? '#a5b4fc' : '#94a3b8',
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  fontWeight: isActive ? 600 : 500,
                  background: isActive ? 'rgba(99,102,241,0.1)' : 'transparent',
                  transition: 'color 0.2s ease, background 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = '#a5b4fc';
                    e.currentTarget.style.background = 'rgba(99,102,241,0.07)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = '#94a3b8';
                    e.currentTarget.style.background = 'transparent';
                  }
                }}
              >
                {link.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-indicator"
                    style={{
                      position: 'absolute',
                      bottom: '4px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '4px',
                      height: '4px',
                      borderRadius: '50%',
                      background: '#6366f1',
                      display: 'block',
                      boxShadow: '0 0 6px rgba(99,102,241,0.8)',
                    }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </motion.a>
            );
          })}
          {/* Language Switcher */}
          <div style={{ display: 'flex', gap: '2px', marginLeft: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', padding: '3px', border: '1px solid rgba(255,255,255,0.08)' }}>
            {LANGS.map(({ code, label }) => (
              <button
                key={code}
                onClick={() => switchLang(code)}
                style={{
                  padding: '4px 10px',
                  borderRadius: '6px',
                  border: 'none',
                  background: lang === code ? 'rgba(99,102,241,0.3)' : 'transparent',
                  color: lang === code ? '#a5b4fc' : '#64748b',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  fontFamily: '"JetBrains Mono", monospace',
                  transition: 'all 0.2s ease',
                }}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Theme Toggle */}
          <motion.button
            whileHover={{ scale: 1.1, rotate: 15 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            style={{
              width: '34px', height: '34px', borderRadius: '8px',
              border: '1px solid rgba(255,255,255,0.1)',
              background: 'rgba(255,255,255,0.05)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1rem', marginLeft: '4px',
            }}
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </motion.button>

          <motion.a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="btn-primary"
            style={{ padding: '8px 22px', fontSize: '0.875rem', marginLeft: '8px' }}
          >
            {t.nav.hire}
          </motion.a>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          style={{
            background: 'none',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '8px',
            padding: '8px',
            cursor: 'pointer',
            color: '#94a3b8',
            display: 'none',
          }}
          className="mobile-menu-btn"
          aria-label="Toggle menu"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {menuOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              background: 'rgba(10,10,15,0.97)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              borderBottom: '1px solid rgba(255,255,255,0.08)',
              padding: '16px 32px 24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
            }}
          >
            {navLinks.map((link, i) => {
              const isActive = activeSection === link.href.slice(1);
              return (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  style={{
                    padding: '12px 16px',
                    borderRadius: '8px',
                    color: isActive ? '#a5b4fc' : '#94a3b8',
                    textDecoration: 'none',
                    fontSize: '1rem',
                    fontWeight: isActive ? 600 : 500,
                    background: isActive ? 'rgba(99,102,241,0.1)' : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    transition: 'color 0.2s, background 0.2s',
                  }}
                >
                  {isActive && (
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#6366f1', flexShrink: 0 }} />
                  )}
                  {link.label}
                </motion.a>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll Progress Bar */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '2px', background: 'rgba(255,255,255,0.06)' }}>
        <motion.div
          style={{
            height: '100%',
            background: 'linear-gradient(90deg, #6366f1, #8b5cf6)',
            transformOrigin: 'left',
            scaleX: progress,
          }}
        />
      </div>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </motion.nav>
  );
}
