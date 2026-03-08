import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLang } from '../context/LangContext';

const testimonials = [
  {
    id: 1,
    name: 'Alex Johnson',
    role: 'CTO, TechStart',
    avatar: '👨‍💼',
    text: 'Panda Fist delivered our platform ahead of schedule with exceptional code quality. His React expertise and attention to detail are outstanding.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Maria Santos',
    role: 'Product Manager, DevCorp',
    avatar: '👩‍💻',
    text: 'Working with him was a pleasure. He understood requirements instantly, communicated proactively, and the final product exceeded expectations.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Daniel Kim',
    role: 'Founder, Startup Hub',
    avatar: '🧑‍🚀',
    text: 'Incredible full-stack skills. Built our entire backend API in Node.js and PostgreSQL from scratch. Clean, documented, and scalable code.',
    rating: 5,
  },
];

function Stars({ count }) {
  return (
    <div style={{ display: 'flex', gap: '3px', marginBottom: '14px' }}>
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} style={{ color: '#f59e0b', fontSize: '0.9rem' }}>★</span>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const { t } = useLang();

  return (
    <section id="testimonials" className="section-padding" ref={ref}
      style={{ background: 'linear-gradient(180deg, #0a0a0f 0%, #0d0d18 50%, #0a0a0f 100%)' }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <motion.div
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2>{t.testimonials.title}</h2>
          <div className="title-line" />
          <p style={{ color: '#64748b', marginTop: '12px', fontSize: '0.95rem' }}>
            {t.testimonials.subtitle}
          </p>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px',
        }}>
          {testimonials.map((item, i) => (
            <motion.div
              key={item.id}
              className="glass-card"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              whileHover={{ y: -6, boxShadow: '0 0 30px rgba(99,102,241,0.2)' }}
              style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '0' }}
            >
              {/* Quote mark */}
              <div style={{ fontSize: '2.5rem', lineHeight: 1, color: 'rgba(99,102,241,0.3)', fontFamily: 'serif', marginBottom: '8px' }}>
                "
              </div>

              <Stars count={item.rating} />

              <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.75, flex: 1, marginBottom: '20px' }}>
                {item.text}
              </p>

              {/* Author */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{
                  width: '42px', height: '42px', borderRadius: '50%',
                  background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.25)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.3rem', flexShrink: 0,
                }}>
                  {item.avatar}
                </div>
                <div>
                  <div style={{ color: 'white', fontWeight: 600, fontSize: '0.9rem' }}>{item.name}</div>
                  <div style={{ color: '#6366f1', fontSize: '0.75rem', marginTop: '2px' }}>{item.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
