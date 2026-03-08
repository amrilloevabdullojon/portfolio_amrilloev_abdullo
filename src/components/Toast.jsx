import { AnimatePresence, motion } from 'framer-motion';

export default function Toast({ message, type = 'success', visible }) {
  const isSuccess = type === 'success';
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.88 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 60, scale: 0.88 }}
          transition={{ type: 'spring', damping: 22, stiffness: 320 }}
          style={{
            position: 'fixed',
            bottom: '32px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 9999,
            padding: '14px 28px',
            borderRadius: '12px',
            background: isSuccess
              ? 'rgba(16,185,129,0.12)'
              : 'rgba(239,68,68,0.12)',
            border: `1px solid ${isSuccess ? 'rgba(16,185,129,0.4)' : 'rgba(239,68,68,0.4)'}`,
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            color: isSuccess ? '#34d399' : '#f87171',
            fontWeight: 600,
            fontSize: '0.9rem',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            whiteSpace: 'nowrap',
            boxShadow: '0 8px 40px rgba(0,0,0,0.5)',
          }}
        >
          <span style={{ fontSize: '1.1rem' }}>{isSuccess ? '✓' : '✕'}</span>
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
