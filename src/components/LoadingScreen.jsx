import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setDone(true), 1800);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5, ease: 'easeInOut' } }}
          style={{
            position: 'fixed',
            inset: 0,
            background: '#0a0a0f',
            zIndex: 99999,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '32px',
          }}
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontWeight: 700,
              fontSize: '2.5rem',
              background: 'linear-gradient(135deg, #6366f1, #a78bfa)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {'<PF />'}
          </motion.div>

          {/* Progress bar */}
          <div
            style={{
              width: '180px',
              height: '2px',
              background: 'rgba(255,255,255,0.08)',
              borderRadius: '2px',
              overflow: 'hidden',
            }}
          >
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.4, ease: 'easeInOut' }}
              style={{
                height: '100%',
                background: 'linear-gradient(90deg, #6366f1, #a78bfa)',
                transformOrigin: 'left',
              }}
            />
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            style={{
              color: '#475569',
              fontSize: '0.75rem',
              fontFamily: '"JetBrains Mono", monospace',
              letterSpacing: '0.15em',
            }}
          >
            LOADING...
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
