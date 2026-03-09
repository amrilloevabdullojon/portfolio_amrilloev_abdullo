import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLang } from '../context/LangContext';
import { useTheme } from '../context/ThemeContext';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { testimonials } from '../data/portfolio';

function Stars({ count }) {
  return (
    <div style={{ display: 'flex', gap: '3px', marginBottom: '14px' }}>
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} style={{ color: '#f59e0b', fontSize: '0.9rem' }}>★</span>
      ))}
    </div>
  );
}

function TestimonialCard({ item, isLight }) {
  return (
    <div
      className="glass-card"
      style={{ padding: '28px', display: 'flex', flexDirection: 'column', height: '100%' }}
    >
      <div style={{ fontSize: '2.5rem', lineHeight: 1, color: 'rgba(99,102,241,0.3)', fontFamily: 'serif', marginBottom: '8px' }}>"</div>
      <Stars count={item.rating} />
      <p style={{ color: isLight ? '#475569' : '#94a3b8', fontSize: '0.9rem', lineHeight: 1.75, flex: 1, marginBottom: '20px' }}>{item.text}</p>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingTop: '16px', borderTop: isLight ? '1px solid rgba(99,102,241,0.12)' : '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{
          width: '42px', height: '42px', borderRadius: '50%',
          background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.25)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1.3rem', flexShrink: 0,
        }}>{item.avatar}</div>
        <div>
          <div style={{ color: isLight ? '#1e293b' : 'white', fontWeight: 600, fontSize: '0.9rem' }}>{item.name}</div>
          <div style={{ color: '#6366f1', fontSize: '0.75rem', marginTop: '2px' }}>{item.role}</div>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const { t } = useLang();
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    setIsMobile(mq.matches);
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return (
    <section id="testimonials" className="section-padding" ref={ref}
      style={{ background: isLight ? 'linear-gradient(180deg, #eef2ff 0%, #f1f5fb 50%, #eef2ff 100%)' : 'linear-gradient(180deg, #0a0a0f 0%, #0d0d18 50%, #0a0a0f 100%)' }}
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

        {isMobile ? (
          /* Mobile: Swiper carousel */
          <Swiper
            modules={[Autoplay, Pagination]}
            slidesPerView={1}
            spaceBetween={16}
            grabCursor
            pagination={{ clickable: true }}
            autoplay={{ delay: 4000, pauseOnMouseEnter: true, disableOnInteraction: false }}
            style={{ paddingBottom: '40px' }}
          >
            {testimonials.map((item) => (
              <SwiperSlide key={item.id}>
                <TestimonialCard item={item} isLight={isLight} />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          /* Desktop: grid */
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px',
          }}>
            {testimonials.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                whileHover={{ y: -6, boxShadow: '0 0 30px rgba(99,102,241,0.2)' }}
              >
                <TestimonialCard item={item} isLight={isLight} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
