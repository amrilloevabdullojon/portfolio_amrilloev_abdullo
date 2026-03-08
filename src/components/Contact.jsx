import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { personalInfo } from '../data/portfolio';
import Toast from './Toast';

const socialLinks = [
  {
    label: 'GitHub',
    href: personalInfo.github,
    color: '#6e40c9',
    description: 'Check my code',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: personalInfo.linkedin,
    color: '#0077b5',
    description: "Let's connect",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: 'Telegram',
    href: personalInfo.telegram,
    color: '#229ed9',
    description: 'Message me',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
      </svg>
    ),
  },
  {
    label: 'Email',
    href: `mailto:${personalInfo.email}`,
    color: '#6366f1',
    description: 'Drop me a line',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
];

function validate(data) {
  const errors = {};
  if (!data.name.trim() || data.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters';
  }
  if (!data.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Enter a valid email address';
  }
  if (!data.message.trim() || data.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters';
  }
  return errors;
}

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [sending, setSending] = useState(false);
  const [toast, setToast] = useState({ visible: false, message: '', type: 'success' });

  const showToast = (message, type = 'success') => {
    setToast({ visible: true, message, type });
    setTimeout(() => setToast((t) => ({ ...t, visible: false })), 3500);
  };

  const handleBlur = (field) => {
    setTouched((t) => ({ ...t, [field]: true }));
    const errs = validate(formData);
    setErrors(errs);
  };

  const handleChange = (field, value) => {
    const next = { ...formData, [field]: value };
    setFormData(next);
    if (touched[field]) {
      setErrors(validate(next));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const allTouched = { name: true, email: true, message: true };
    setTouched(allTouched);
    const errs = validate(formData);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setSending(true);
    try {
      // EmailJS integration — fill in your credentials in .env
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      if (serviceId && templateId && publicKey) {
        const { default: emailjs } = await import('@emailjs/browser');
        await emailjs.send(
          serviceId,
          templateId,
          {
            from_name: formData.name,
            from_email: formData.email,
            message: formData.message,
          },
          publicKey
        );
      }

      showToast('Message sent successfully!', 'success');
      setFormData({ name: '', email: '', message: '' });
      setTouched({});
      setErrors({});
    } catch {
      showToast('Something went wrong. Try again.', 'error');
    } finally {
      setSending(false);
    }
  };

  const inputStyle = (field) => ({
    width: '100%',
    padding: '12px 16px',
    background: 'rgba(255,255,255,0.04)',
    border: `1px solid ${touched[field] && errors[field] ? 'rgba(239,68,68,0.6)' : 'rgba(255,255,255,0.1)'}`,
    borderRadius: '10px',
    color: 'white',
    fontSize: '0.9rem',
    outline: 'none',
    transition: 'border-color 0.2s ease',
    boxSizing: 'border-box',
    fontFamily: 'inherit',
  });

  return (
    <section
      id="contact"
      className="section-padding"
      ref={ref}
      style={{ background: 'linear-gradient(180deg, #0a0a0f 0%, #0d0d18 50%, #0a0a0f 100%)' }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Title */}
        <motion.div
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2>Get In Touch</h2>
          <div className="title-line" />
          <p style={{ color: '#64748b', marginTop: '12px', fontSize: '0.95rem' }}>
            Have a project in mind? Let&apos;s talk.
          </p>
        </motion.div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '48px',
            alignItems: 'start',
          }}
        >
          {/* Left — Social Links */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <h3 style={{ color: 'white', fontSize: '1.3rem', fontWeight: 700, marginBottom: '8px' }}>
              Let&apos;s Connect
            </h3>
            <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '28px', lineHeight: 1.6 }}>
              I&apos;m always open to new opportunities and interesting conversations.
              Feel free to reach out through any of these channels.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {socialLinks.map((link, idx) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 + idx * 0.08 }}
                  whileHover={{ scale: 1.04, boxShadow: `0 0 24px ${link.color}44`, borderColor: `${link.color}66` }}
                  className="glass-card"
                  style={{
                    padding: '20px 16px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '10px',
                    textDecoration: 'none',
                    textAlign: 'center',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <div style={{ color: link.color }}>{link.icon}</div>
                  <div>
                    <div style={{ color: 'white', fontWeight: 600, fontSize: '0.9rem' }}>{link.label}</div>
                    <div style={{ color: '#64748b', fontSize: '0.75rem', marginTop: '2px' }}>{link.description}</div>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Email display */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="glass-card"
              style={{ marginTop: '20px', padding: '18px 20px', display: 'flex', alignItems: 'center', gap: '12px' }}
            >
              <div
                style={{
                  width: '36px', height: '36px', borderRadius: '8px',
                  background: 'rgba(99,102,241,0.15)', display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                  color: '#6366f1', flexShrink: 0,
                }}
              >
                @
              </div>
              <div>
                <div style={{ color: '#64748b', fontSize: '0.75rem', marginBottom: '2px' }}>Email</div>
                <a
                  href={`mailto:${personalInfo.email}`}
                  style={{ color: '#a5b4fc', fontSize: '0.9rem', textDecoration: 'none', fontFamily: '"JetBrains Mono", monospace' }}
                >
                  {personalInfo.email}
                </a>
              </div>
            </motion.div>
          </motion.div>

          {/* Right — Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="glass-card"
            style={{ padding: '36px' }}
          >
            <h3 style={{ color: 'white', fontSize: '1.2rem', fontWeight: 700, marginBottom: '24px' }}>
              Send a Message
            </h3>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }} noValidate>
              {/* Name */}
              <div>
                <label style={{ color: '#94a3b8', fontSize: '0.8rem', display: 'block', marginBottom: '6px' }}>
                  Your Name
                </label>
                <input
                  type="text"
                  style={inputStyle('name')}
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  onBlur={() => handleBlur('name')}
                  onFocus={(e) => { e.target.style.borderColor = 'rgba(99,102,241,0.5)'; }}
                />
                {touched.name && errors.name && (
                  <p style={{ color: '#f87171', fontSize: '0.75rem', marginTop: '4px' }}>{errors.name}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label style={{ color: '#94a3b8', fontSize: '0.8rem', display: 'block', marginBottom: '6px' }}>
                  Email Address
                </label>
                <input
                  type="email"
                  style={inputStyle('email')}
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  onBlur={() => handleBlur('email')}
                  onFocus={(e) => { e.target.style.borderColor = 'rgba(99,102,241,0.5)'; }}
                />
                {touched.email && errors.email && (
                  <p style={{ color: '#f87171', fontSize: '0.75rem', marginTop: '4px' }}>{errors.email}</p>
                )}
              </div>

              {/* Message */}
              <div>
                <label style={{ color: '#94a3b8', fontSize: '0.8rem', display: 'block', marginBottom: '6px' }}>
                  Message
                </label>
                <textarea
                  style={{ ...inputStyle('message'), resize: 'vertical', minHeight: '120px' }}
                  placeholder="Tell me about your project..."
                  rows={5}
                  value={formData.message}
                  onChange={(e) => handleChange('message', e.target.value)}
                  onBlur={() => handleBlur('message')}
                  onFocus={(e) => { e.target.style.borderColor = 'rgba(99,102,241,0.5)'; }}
                />
                {touched.message && errors.message && (
                  <p style={{ color: '#f87171', fontSize: '0.75rem', marginTop: '4px' }}>{errors.message}</p>
                )}
              </div>

              <motion.button
                type="submit"
                disabled={sending}
                whileHover={{ scale: sending ? 1 : 1.03 }}
                whileTap={{ scale: sending ? 1 : 0.97 }}
                className="btn-primary"
                style={{ justifyContent: 'center', marginTop: '8px', opacity: sending ? 0.7 : 1 }}
              >
                {sending ? 'Sending…' : 'Send Message →'}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>

      <Toast message={toast.message} type={toast.type} visible={toast.visible} />
    </section>
  );
}
