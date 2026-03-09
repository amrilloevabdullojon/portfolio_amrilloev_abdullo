import { useRef, useState, useMemo } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLang } from '../context/LangContext';
import { useTheme } from '../context/ThemeContext';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, Keyboard } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { projects } from '../data/portfolio';

/* ─── Tech usage counts (computed once at module level) ─── */
const TECH_COUNTS = (() => {
  const counts = {};
  projects.forEach((p) => p.tech.forEach((t) => { counts[t] = (counts[t] || 0) + 1; }));
  return counts;
})();

/* ─── GitHub icon ─── */
const GitHubIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

const ExternalIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
  </svg>
);

/* ─── Project Card ─── */
function ProjectCard({ project, tComingSoon, isLight }) {
  const cardRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rx = (-y / rect.height) * 8;
    const ry = (x / rect.width) * 8;
    el.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.02)`;
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    }
    setHovered(false);
  };

  const hasGithub = project.github && project.github !== '#';
  const hasLive = project.live && project.live !== '#';
  const isComingSoon = !hasGithub && !hasLive;

  const textPrimary = isLight ? '#1e293b' : '#f1f5f9';
  const textSecondary = isLight ? '#475569' : '#94a3b8';
  const tagBg = isLight ? 'rgba(99,102,241,0.08)' : 'rgba(99,102,241,0.12)';
  const tagBorder = isLight ? 'rgba(99,102,241,0.2)' : 'rgba(99,102,241,0.25)';
  const tagColor = isLight ? '#4f46e5' : '#a5b4fc';
  const linkColor = isLight ? '#64748b' : '#64748b';
  const linkHover = isLight ? '#4f46e5' : '#a5b4fc';

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="glass-card"
      style={{
        transition: 'transform 0.15s ease, box-shadow 0.3s ease',
        transformStyle: 'preserve-3d',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        boxShadow: hovered
          ? isLight
            ? '0 20px 40px rgba(99,102,241,0.2)'
            : '0 20px 40px rgba(0,0,0,0.4), 0 0 30px rgba(99,102,241,0.2)'
          : 'none',
      }}
    >
      {/* Banner */}
      <div
        style={{
          height: '180px',
          background: project.gradient,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Mesh pattern overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.08) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.06) 0%, transparent 40%)',
        }} />
        <span style={{
          fontSize: '3.8rem',
          filter: 'drop-shadow(0 6px 16px rgba(0,0,0,0.35))',
          position: 'relative', zIndex: 1,
          transform: hovered ? 'scale(1.12) translateY(-4px)' : 'scale(1)',
          transition: 'transform 0.3s ease',
          display: 'block',
        }}>
          {project.emoji}
        </span>
        {/* Index badge */}
        <div style={{
          position: 'absolute', top: '12px', right: '12px',
          background: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(8px)',
          borderRadius: '6px', padding: '2px 8px',
          fontSize: '0.7rem', fontWeight: 700, color: 'rgba(255,255,255,0.7)',
          fontFamily: '"JetBrains Mono", monospace',
        }}>
          {project.id}
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: '22px 24px 24px', flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <h3 style={{ color: textPrimary, fontSize: '1.1rem', fontWeight: 700, margin: 0, lineHeight: 1.3 }}>
          {project.title}
        </h3>

        <p style={{ color: textSecondary, fontSize: '0.875rem', lineHeight: 1.7, margin: 0, flex: 1 }}>
          {project.description}
        </p>

        {/* Tech Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {project.tech.map((tech) => (
            <span
              key={tech}
              title={`Used in ${TECH_COUNTS[tech] || 1} project${(TECH_COUNTS[tech] || 1) > 1 ? 's' : ''}`}
              style={{
                padding: '3px 9px',
                borderRadius: '4px',
                background: tagBg,
                border: `1px solid ${tagBorder}`,
                color: tagColor,
                fontSize: '0.7rem',
                fontFamily: '"JetBrains Mono", monospace',
                fontWeight: 600,
                cursor: 'default',
              }}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Divider */}
        <div style={{ height: '1px', background: isLight ? 'rgba(99,102,241,0.1)' : 'rgba(255,255,255,0.06)' }} />

        {/* Links */}
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          {hasGithub && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} on GitHub`}
              style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                color: linkColor, textDecoration: 'none',
                fontSize: '0.82rem', fontWeight: 600,
                transition: 'color 0.2s, transform 0.2s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = linkHover; e.currentTarget.style.transform = 'translateY(-1px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = linkColor; e.currentTarget.style.transform = 'none'; }}
            >
              <GitHubIcon />
              GitHub
            </a>
          )}
          {hasLive && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} live demo`}
              style={{
                display: 'flex', alignItems: 'center', gap: '5px',
                color: linkColor, textDecoration: 'none',
                fontSize: '0.82rem', fontWeight: 600,
                transition: 'color 0.2s, transform 0.2s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = '#c4b5fd'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = linkColor; e.currentTarget.style.transform = 'none'; }}
            >
              <ExternalIcon />
              Live Demo
            </a>
          )}
          {isComingSoon && (
            <span style={{
              display: 'flex', alignItems: 'center', gap: '5px',
              padding: '4px 12px', borderRadius: '50px',
              background: isLight ? 'rgba(99,102,241,0.06)' : 'rgba(255,255,255,0.04)',
              border: `1px solid ${isLight ? 'rgba(99,102,241,0.15)' : 'rgba(255,255,255,0.08)'}`,
              color: isLight ? '#64748b' : '#475569',
              fontSize: '0.75rem', fontFamily: '"JetBrains Mono", monospace',
            }}>
              {tComingSoon}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Tech list computed once ─── */
const TECH_LIST = (() => {
  const set = new Set();
  projects.forEach((p) => p.tech.forEach((tech) => set.add(tech)));
  return Array.from(set);
})();

/* ─── Nav Arrow ─── */
function NavArrow({ dir, isLight }) {
  const [hov, setHov] = useState(false);
  const className = dir === 'prev' ? 'proj-prev' : 'proj-next';
  return (
    <button
      className={className}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      aria-label={dir === 'prev' ? 'Previous' : 'Next'}
      style={{
        width: '40px', height: '40px', borderRadius: '50%',
        border: `1px solid ${hov ? 'rgba(99,102,241,0.7)' : isLight ? 'rgba(99,102,241,0.2)' : 'rgba(255,255,255,0.12)'}`,
        background: hov ? 'rgba(99,102,241,0.18)' : isLight ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.04)',
        color: hov ? '#a5b4fc' : isLight ? '#475569' : '#64748b',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', transition: 'all 0.2s ease',
        boxShadow: hov ? '0 0 16px rgba(99,102,241,0.3)' : 'none',
        flexShrink: 0,
      }}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        {dir === 'prev'
          ? <path d="M15 18l-6-6 6-6" />
          : <path d="M9 18l6-6-6-6" />}
      </svg>
    </button>
  );
}

/* ─── Main Component ─── */
export default function Projects() {
  const ref = useRef(null);
  const swiperRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const { t } = useLang();
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const [techFilter, setTechFilter] = useState(null);
  const [slideIndex, setSlideIndex] = useState(0);

  const allTechs = useMemo(() => [t.projects.filter_all, ...TECH_LIST], [t.projects.filter_all]);
  const filtered = useMemo(
    () => techFilter === null ? projects : projects.filter((p) => p.tech.includes(techFilter)),
    [techFilter]
  );
  const activeFilter = techFilter === null ? t.projects.filter_all : techFilter;

  const filterBtnBase = {
    padding: '6px 16px', borderRadius: '50px',
    fontSize: '0.8rem', fontFamily: '"JetBrains Mono", monospace',
    fontWeight: 600, transition: 'all 0.2s ease', cursor: 'pointer',
  };

  return (
    <section id="projects" className="section-padding" ref={ref}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Title */}
        <motion.div
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2>{t.projects.title}</h2>
          <div className="title-line" />
          <p style={{ color: '#64748b', marginTop: '12px', fontSize: '0.95rem' }}>
            {t.projects.subtitle}
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center', marginBottom: '40px' }}
        >
          {allTechs.map((tech) => {
            const active = activeFilter === tech;
            return (
              <motion.button
                key={tech}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => { setTechFilter(tech === t.projects.filter_all ? null : tech); setSlideIndex(0); }}
                style={{
                  ...filterBtnBase,
                  border: `1px solid ${active ? 'rgba(99,102,241,0.7)' : isLight ? 'rgba(99,102,241,0.2)' : 'rgba(255,255,255,0.1)'}`,
                  background: active ? 'rgba(99,102,241,0.2)' : isLight ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.04)',
                  color: active ? (isLight ? '#4f46e5' : '#a5b4fc') : isLight ? '#475569' : '#64748b',
                  boxShadow: active ? '0 0 12px rgba(99,102,241,0.25)' : 'none',
                }}
              >
                {tech}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Slider / Empty state */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {filtered.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{ textAlign: 'center', padding: '80px 20px' }}
            >
              <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🔍</div>
              <p style={{ color: '#64748b', fontSize: '1rem', marginBottom: '6px', fontFamily: '"JetBrains Mono", monospace' }}>
                {t.projects.no_results}{' '}
                <span style={{ color: '#a5b4fc' }}>{activeFilter}</span>
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setTechFilter(null)}
                style={{
                  marginTop: '16px', padding: '8px 20px', borderRadius: '50px',
                  border: '1px solid rgba(99,102,241,0.4)',
                  background: isLight ? 'rgba(99,102,241,0.08)' : 'rgba(99,102,241,0.1)',
                  color: isLight ? '#4f46e5' : '#a5b4fc',
                  fontSize: '0.85rem', fontFamily: '"JetBrains Mono", monospace',
                  fontWeight: 600, cursor: 'pointer',
                }}
              >
                {t.projects.reset_filter}
              </motion.button>
            </motion.div>
          ) : (
            <>
              {/* Nav row: arrows + counter */}
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'flex-end',
                gap: '12px', marginBottom: '16px', paddingRight: '4px',
              }}>
                <span style={{
                  fontSize: '0.78rem', fontFamily: '"JetBrains Mono", monospace',
                  color: isLight ? '#94a3b8' : '#475569', letterSpacing: '0.05em',
                }}>
                  {String(slideIndex + 1).padStart(2, '0')} / {String(filtered.length).padStart(2, '0')}
                </span>
                <NavArrow dir="prev" isLight={isLight} />
                <NavArrow dir="next" isLight={isLight} />
              </div>

              <Swiper
                key={activeFilter}
                onSwiper={(s) => { swiperRef.current = s; }}
                onSlideChange={(s) => setSlideIndex(s.realIndex)}
                modules={[Autoplay, Pagination, Navigation, Keyboard]}
                grabCursor
                style={{ cursor: 'grab' }}
                centeredSlides
                keyboard={{ enabled: true }}
                autoplay={{ delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: true }}
                pagination={{
                  clickable: true,
                  renderBullet: (_, cls) => `<span class="${cls} proj-bullet"></span>`,
                }}
                navigation={{ prevEl: '.proj-prev', nextEl: '.proj-next' }}
                loop={filtered.length > 2}
                breakpoints={{
                  0:    { slidesPerView: 1,   spaceBetween: 16 },
                  640:  { slidesPerView: 1.4, spaceBetween: 20 },
                  900:  { slidesPerView: 2.2, spaceBetween: 24 },
                  1200: { slidesPerView: 2.8, spaceBetween: 28 },
                  1400: { slidesPerView: 3.2, spaceBetween: 32 },
                }}
                style={{ paddingBottom: '52px', paddingTop: '8px' }}
              >
                {filtered.map((project) => (
                  <SwiperSlide key={project.id}>
                    <ProjectCard
                      project={project}
                      tComingSoon={t.projects.coming_soon}
                      isLight={isLight}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </>
          )}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          style={{ textAlign: 'center', marginTop: '8px' }}
        >
          <motion.a
            href="https://github.com/amrilloevabdullojon"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="btn-outline"
          >
            {t.projects.view_all}
          </motion.a>
        </motion.div>
      </div>

      {/* Swiper pagination bullet style */}
      <style>{`
        .proj-bullet {
          width: 6px !important;
          height: 6px !important;
          background: ${isLight ? 'rgba(99,102,241,0.25)' : 'rgba(255,255,255,0.2)'} !important;
          border-radius: 50% !important;
          opacity: 1 !important;
          transition: all 0.25s ease !important;
          display: inline-block;
          margin: 0 4px !important;
        }
        .proj-bullet.swiper-pagination-bullet-active {
          background: #6366f1 !important;
          width: 20px !important;
          border-radius: 3px !important;
          box-shadow: 0 0 8px rgba(99,102,241,0.6) !important;
        }
        .swiper-button-prev, .swiper-button-next { display: none !important; }
      `}</style>
    </section>
  );
}
