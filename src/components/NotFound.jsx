import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#0a0a0f',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '40px 24px',
      }}
    >
      {/* Glowing 404 */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, type: 'spring' }}
        style={{
          fontSize: 'clamp(6rem, 20vw, 12rem)',
          fontWeight: 900,
          lineHeight: 1,
          background: 'linear-gradient(135deg, #6366f1 0%, #a78bfa 50%, #8b5cf6 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          filter: 'drop-shadow(0 0 40px rgba(99,102,241,0.5))',
          marginBottom: '24px',
          fontFamily: '"JetBrains Mono", monospace',
        }}
      >
        404
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        style={{ color: '#94a3b8', fontSize: '1.2rem', marginBottom: '8px', fontWeight: 500 }}
      >
        Page not found
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        style={{ color: '#475569', fontSize: '0.9rem', marginBottom: '40px', maxWidth: '380px', lineHeight: 1.6 }}
      >
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </motion.p>

      <motion.a
        href="/#/"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        className="btn-primary"
        style={{ textDecoration: 'none' }}
      >
        ← Back to Home
      </motion.a>

      {/* Background grid */}
      <div
        style={{
          position: 'fixed', inset: 0, zIndex: -1, pointerEvents: 'none',
          backgroundImage: 'linear-gradient(rgba(99,102,241,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.04) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />
    </div>
  );
}
