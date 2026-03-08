import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { skills } from '../data/portfolio';

const allSkillItems = skills.flatMap((cat) => cat.items);

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="skills"
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
          <h2>Skills & Technologies</h2>
          <div className="title-line" />
        </motion.div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '48px',
          }}
        >
          {/* Left — Progress Bars by Category */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '36px' }}>
            {skills.map((category, catIdx) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: catIdx * 0.1 }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '16px',
                  }}
                >
                  <span style={{ fontSize: '1.1rem' }}>{category.icon}</span>
                  <h3
                    style={{
                      color: '#e2e8f0',
                      fontSize: '1rem',
                      fontWeight: 600,
                      fontFamily: '"JetBrains Mono", monospace',
                    }}
                  >
                    {category.category}
                  </h3>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {category.items.map((skill, skillIdx) => (
                    <div key={skill.name}>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          marginBottom: '6px',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span style={{ fontSize: '0.9rem' }}>{skill.icon}</span>
                          <span style={{ color: '#cbd5e1', fontSize: '0.9rem' }}>{skill.name}</span>
                        </div>
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={isInView ? { opacity: 1 } : {}}
                          transition={{ delay: catIdx * 0.1 + skillIdx * 0.05 + 0.4 }}
                          style={{
                            color: '#6366f1',
                            fontSize: '0.8rem',
                            fontFamily: '"JetBrains Mono", monospace',
                            fontWeight: 600,
                          }}
                        >
                          {skill.level}%
                        </motion.span>
                      </div>
                      {/* Track */}
                      <div
                        style={{
                          height: '6px',
                          background: 'rgba(255,255,255,0.08)',
                          borderRadius: '3px',
                          overflow: 'hidden',
                        }}
                      >
                        <motion.div
                          initial={{ width: 0 }}
                          animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                          transition={{
                            duration: 1.2,
                            ease: 'easeOut',
                            delay: catIdx * 0.1 + skillIdx * 0.06 + 0.2,
                          }}
                          style={{
                            height: '100%',
                            borderRadius: '3px',
                            background: 'linear-gradient(90deg, #6366f1, #8b5cf6)',
                            boxShadow: '0 0 8px rgba(99,102,241,0.5)',
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right — Skill Bubbles Grid */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              style={{
                color: '#6366f1',
                fontSize: '0.8rem',
                fontFamily: '"JetBrains Mono", monospace',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                marginBottom: '20px',
              }}
            >
              // tech stack
            </motion.p>

            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '12px',
              }}
            >
              {allSkillItems.map((skill, idx) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: idx * 0.04 }}
                  whileHover={{
                    scale: 1.1,
                    boxShadow: '0 0 24px rgba(99,102,241,0.4)',
                    borderColor: 'rgba(99,102,241,0.6)',
                  }}
                  className="glass-card"
                  style={{
                    padding: '10px 18px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    cursor: 'default',
                    transition: 'all 0.25s ease',
                  }}
                >
                  <span style={{ fontSize: '1rem' }}>{skill.icon}</span>
                  <span style={{ color: '#cbd5e1', fontSize: '0.85rem', fontWeight: 500, whiteSpace: 'nowrap' }}>
                    {skill.name}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Experience bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="glass-card"
              style={{ marginTop: '40px', padding: '24px' }}
            >
              <p
                style={{
                  color: '#64748b',
                  fontSize: '0.8rem',
                  fontFamily: '"JetBrains Mono", monospace',
                  marginBottom: '16px',
                }}
              >
                // overall experience
              </p>
              {[
                { label: 'Frontend Development', pct: 90 },
                { label: 'Backend Development', pct: 80 },
                { label: 'Database Design', pct: 78 },
                { label: 'DevOps / CI/CD', pct: 62 },
              ].map((item, i) => (
                <div key={item.label} style={{ marginBottom: i < 3 ? '12px' : 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span style={{ color: '#94a3b8', fontSize: '0.8rem' }}>{item.label}</span>
                    <span style={{ color: '#6366f1', fontSize: '0.75rem', fontFamily: '"JetBrains Mono", monospace' }}>
                      {item.pct}%
                    </span>
                  </div>
                  <div style={{ height: '4px', background: 'rgba(255,255,255,0.06)', borderRadius: '2px', overflow: 'hidden' }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${item.pct}%` } : {}}
                      transition={{ duration: 1.3, ease: 'easeOut', delay: 0.7 + i * 0.08 }}
                      style={{
                        height: '100%',
                        borderRadius: '2px',
                        background: 'linear-gradient(90deg, #6366f1, #a78bfa)',
                      }}
                    />
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
