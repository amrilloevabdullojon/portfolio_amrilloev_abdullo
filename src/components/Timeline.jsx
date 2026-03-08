import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { timeline } from '../data/portfolio';

function TimelineItem({ item, index, isInView }) {
  const isLeft = index % 2 === 0;
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: isLeft ? 'flex-start' : 'flex-end',
        paddingLeft: isLeft ? 0 : '50%',
        paddingRight: isLeft ? '50%' : 0,
        position: 'relative',
        marginBottom: '32px',
      }}
      className="timeline-item"
    >
      {/* Dot on the center line */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '28px',
          transform: 'translateX(-50%)',
          width: '14px',
          height: '14px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
          border: '2px solid rgba(99,102,241,0.4)',
          boxShadow: '0 0 12px rgba(99,102,241,0.5)',
          zIndex: 2,
        }}
      />

      <motion.div
        initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        className="glass-card"
        style={{
          padding: '24px',
          maxWidth: '420px',
          width: '100%',
          marginLeft: isLeft ? 0 : '24px',
          marginRight: isLeft ? '24px' : 0,
          position: 'relative',
        }}
      >
        {/* Type badge */}
        <span
          style={{
            display: 'inline-block',
            padding: '2px 10px',
            borderRadius: '50px',
            fontSize: '0.7rem',
            fontWeight: 700,
            fontFamily: '"JetBrains Mono", monospace',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            marginBottom: '10px',
            background: item.type === 'work'
              ? 'rgba(99,102,241,0.15)'
              : 'rgba(139,92,246,0.15)',
            border: `1px solid ${item.type === 'work' ? 'rgba(99,102,241,0.35)' : 'rgba(139,92,246,0.35)'}`,
            color: item.type === 'work' ? '#a5b4fc' : '#c4b5fd',
          }}
        >
          {item.type === 'work' ? '💼 Work' : '🎓 Education'}
        </span>

        <div style={{ color: '#64748b', fontSize: '0.78rem', marginBottom: '6px', fontFamily: '"JetBrains Mono", monospace' }}>
          {item.period}
        </div>
        <h3 style={{ color: 'white', fontSize: '1.05rem', fontWeight: 700, marginBottom: '4px' }}>
          {item.title}
        </h3>
        <div style={{ color: '#8b5cf6', fontSize: '0.85rem', fontWeight: 600, marginBottom: '10px' }}>
          {item.company}
        </div>
        <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.65 }}>
          {item.description}
        </p>

        {item.skills && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '12px' }}>
            {item.skills.map((s) => (
              <span
                key={s}
                style={{
                  padding: '2px 8px',
                  borderRadius: '4px',
                  background: 'rgba(99,102,241,0.1)',
                  border: '1px solid rgba(99,102,241,0.2)',
                  color: '#a5b4fc',
                  fontSize: '0.7rem',
                  fontFamily: '"JetBrains Mono", monospace',
                }}
              >
                {s}
              </span>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default function Timeline() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="timeline" className="section-padding" ref={ref}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <motion.div
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2>Experience & Education</h2>
          <div className="title-line" />
          <p style={{ color: '#64748b', marginTop: '12px', fontSize: '0.95rem' }}>
            My journey so far
          </p>
        </motion.div>

        {/* Timeline wrapper */}
        <div style={{ position: 'relative' }}>
          {/* Center vertical line */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              left: '50%',
              top: 0,
              bottom: 0,
              width: '2px',
              background: 'linear-gradient(180deg, rgba(99,102,241,0.6) 0%, rgba(139,92,246,0.2) 100%)',
              transformOrigin: 'top',
              transform: 'translateX(-50%)',
            }}
          />

          {timeline.map((item, i) => (
            <TimelineItem key={item.id} item={item} index={i} isInView={isInView} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .timeline-item {
            padding-left: 32px !important;
            padding-right: 0 !important;
            justify-content: flex-start !important;
          }
          .timeline-item > div:last-child {
            margin-left: 16px !important;
            margin-right: 0 !important;
          }
        }
      `}</style>
    </section>
  );
}
