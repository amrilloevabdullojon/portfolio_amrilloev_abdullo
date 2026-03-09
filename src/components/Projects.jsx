import { useRef, useState, useMemo } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useLang } from '../context/LangContext';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';
import { projects } from '../data/portfolio';

function ProjectCard({ project, tComingSoon = '🔒 Coming Soon' }) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateX = (-y / rect.height) * 12;
    const rotateY = (x / rect.width) * 12;
    el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform =
      'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="glass-card"
      style={{
        transition: 'transform 0.15s ease, box-shadow 0.3s ease',
        transformStyle: 'preserve-3d',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        cursor: 'default',
      }}
    >
      {/* Banner */}
      <div
        style={{
          height: '160px',
          background: project.gradient,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <span style={{ fontSize: '3.5rem', filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.3))' }}>
          {project.emoji}
        </span>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(0,0,0,0.15)',
          }}
        />
      </div>

      {/* Body */}
      <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ color: 'white', fontSize: '1.15rem', fontWeight: 700, marginBottom: '10px' }}>
          {project.title}
        </h3>
        <p style={{ color: '#94a3b8', fontSize: '0.875rem', lineHeight: 1.7, flex: 1 }}>
          {project.description}
        </p>

        {/* Tech Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '16px' }}>
          {project.tech.map((t) => (
            <span
              key={t}
              style={{
                padding: '3px 10px',
                borderRadius: '4px',
                background: 'rgba(99,102,241,0.12)',
                border: '1px solid rgba(99,102,241,0.25)',
                color: '#a5b4fc',
                fontSize: '0.72rem',
                fontFamily: '"JetBrains Mono", monospace',
                fontWeight: 600,
              }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* Links */}
        <div style={{ display: 'flex', gap: '12px', marginTop: '20px', flexWrap: 'wrap', alignItems: 'center' }}>
          {project.github && project.github !== '#' ? (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${project.title} on GitHub`}
              style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                color: '#64748b', textDecoration: 'none', fontSize: '0.85rem',
                fontWeight: 500, transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#a5b4fc')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#64748b')}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              GitHub
            </a>
          ) : null}

          {project.live && project.live !== '#' ? (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Live demo of ${project.title}`}
              style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                color: '#64748b', textDecoration: 'none', fontSize: '0.85rem',
                fontWeight: 500, transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#c4b5fd')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#64748b')}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
              </svg>
              Live Demo
            </a>
          ) : null}

          {(project.github === '#' || !project.github) && (project.live === '#' || !project.live) && (
            <span
              style={{
                padding: '3px 10px', borderRadius: '50px',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#475569', fontSize: '0.75rem',
                fontFamily: '"JetBrains Mono", monospace',
              }}
            >
              {tComingSoon}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

// Tech list is static — compute once outside component
const TECH_LIST = (() => {
  const set = new Set();
  projects.forEach((p) => p.tech.forEach((tech) => set.add(tech)));
  return Array.from(set);
})();

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const { t } = useLang();
  // Internal filter state uses tech string directly (not translated "All")
  const [techFilter, setTechFilter] = useState(null); // null = show all

  const allTechs = useMemo(() => [t.projects.filter_all, ...TECH_LIST], [t.projects.filter_all]);

  const filtered = useMemo(() =>
    techFilter === null ? projects : projects.filter((p) => p.tech.includes(techFilter)),
    [techFilter]
  );

  // activeFilter for button highlight
  const activeFilter = techFilter === null ? t.projects.filter_all : techFilter;

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
          style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center', marginBottom: '32px' }}
        >
          {allTechs.map((tech) => (
            <motion.button
              key={tech}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setTechFilter(tech === t.projects.filter_all ? null : tech)}
              style={{
                padding: '6px 16px',
                borderRadius: '50px',
                border: `1px solid ${activeFilter === tech ? 'rgba(99,102,241,0.7)' : 'rgba(255,255,255,0.1)'}`,
                background: activeFilter === tech ? 'rgba(99,102,241,0.2)' : 'rgba(255,255,255,0.04)',
                color: activeFilter === tech ? '#a5b4fc' : '#64748b',
                fontSize: '0.8rem',
                fontFamily: '"JetBrains Mono", monospace',
                fontWeight: 600,
                transition: 'all 0.2s ease',
              }}
            >
              {tech}
            </motion.button>
          ))}
        </motion.div>

        {/* Empty state or Swiper */}
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
                  border: '1px solid rgba(99,102,241,0.4)', background: 'rgba(99,102,241,0.1)',
                  color: '#a5b4fc', fontSize: '0.85rem', fontFamily: '"JetBrains Mono", monospace',
                  fontWeight: 600,
                }}
              >
                {t.projects.reset_filter}
              </motion.button>
            </motion.div>
          ) : (
            <Swiper
              key={activeFilter}
              modules={[Autoplay, Pagination, Navigation, EffectCoverflow]}
              effect="coverflow"
              grabCursor={true}
              centeredSlides={true}
              slidesPerView="auto"
              coverflowEffect={{ rotate: 20, stretch: 0, depth: 80, modifier: 1.2, slideShadows: false }}
              autoplay={{ delay: 3500, disableOnInteraction: false, pauseOnMouseEnter: true }}
              pagination={{ clickable: true }}
              navigation={true}
              loop={true}
              style={{ paddingBottom: '50px', paddingTop: '20px' }}
            >
              {filtered.map((project) => (
                <SwiperSlide key={project.id} style={{ width: '360px', height: 'auto' }}>
                  <ProjectCard project={project} tComingSoon={t.projects.coming_soon} />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          style={{ textAlign: 'center', marginTop: '16px' }}
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
    </section>
  );
}
