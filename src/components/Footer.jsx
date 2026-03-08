import { personalInfo } from '../data/portfolio';

export default function Footer() {
  const year = new Date().getFullYear();

  const handleNavClick = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        borderTop: '1px solid rgba(255,255,255,0.06)',
        padding: '40px 24px',
        textAlign: 'center',
        background: '#080810',
      }}
    >
      <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
        {/* Logo */}
        <div
          style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontWeight: 600,
            fontSize: '1.2rem',
            background: 'linear-gradient(135deg, #6366f1, #a78bfa)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          {'<PF />'}
        </div>

        {/* Nav links */}
        <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {['#hero', '#about', '#skills', '#projects', '#contact'].map((href) => (
            <button
              key={href}
              onClick={() => handleNavClick(href)}
              style={{
                background: 'none',
                border: 'none',
                color: '#475569',
                fontSize: '0.85rem',
                cursor: 'pointer',
                padding: '0',
                transition: 'color 0.2s ease',
                fontFamily: '"Inter", sans-serif',
              }}
              onMouseEnter={(e) => (e.target.style.color = '#94a3b8')}
              onMouseLeave={(e) => (e.target.style.color = '#475569')}
            >
              {href.replace('#', '').charAt(0).toUpperCase() + href.replace('#', '').slice(1)}
            </button>
          ))}
        </div>

        {/* Social */}
        <div style={{ display: 'flex', gap: '16px' }}>
          {[
            { label: 'GitHub', href: personalInfo.github },
            { label: 'LinkedIn', href: personalInfo.linkedin },
            { label: 'Telegram', href: personalInfo.telegram },
          ].map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: '#475569',
                textDecoration: 'none',
                fontSize: '0.8rem',
                transition: 'color 0.2s ease',
                fontFamily: '"JetBrains Mono", monospace',
              }}
              onMouseEnter={(e) => (e.target.style.color = '#a5b4fc')}
              onMouseLeave={(e) => (e.target.style.color = '#475569')}
            >
              {s.label}
            </a>
          ))}
        </div>

        {/* Copyright */}
        <p style={{ color: '#334155', fontSize: '0.78rem' }}>
          © {year} {personalInfo.name}. Built with React + Vite.
        </p>
      </div>
    </footer>
  );
}
