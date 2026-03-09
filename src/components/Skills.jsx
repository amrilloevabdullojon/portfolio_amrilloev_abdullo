import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { skills } from '../data/portfolio';
import { useLang } from '../context/LangContext';
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis,
  ResponsiveContainer, Tooltip,
} from 'recharts';

const allSkillItems = skills.flatMap((cat) => cat.items);

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const { t } = useLang();

  const radarData = [
    { subject: 'Frontend', value: 90 },
    { subject: 'Backend', value: 80 },
    { subject: 'Database', value: 78 },
    { subject: 'DevOps', value: 62 },
    { subject: 'TypeScript', value: 78 },
    { subject: 'API Design', value: 80 },
  ];

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
          <h2>{t.skills.title}</h2>
          <div className="title-line" />
          <p style={{ color: '#64748b', marginTop: '12px', fontSize: '0.95rem' }}>{t.skills.subtitle}</p>
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

            {/* Radar Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="glass-card"
              style={{ marginTop: '40px', padding: '24px' }}
            >
              <p style={{ color: '#64748b', fontSize: '0.8rem', fontFamily: '"JetBrains Mono", monospace', marginBottom: '8px' }}>
                // skill radar
              </p>
              <ResponsiveContainer width="100%" height={260}>
                {isInView ? (
                  <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                    <PolarGrid stroke="rgba(255,255,255,0.08)" />
                    <PolarAngleAxis
                      dataKey="subject"
                      tick={{ fill: '#64748b', fontSize: 11, fontFamily: '"JetBrains Mono", monospace' }}
                    />
                    <Radar
                      name="Skills"
                      dataKey="value"
                      stroke="#6366f1"
                      fill="#6366f1"
                      fillOpacity={0.2}
                      strokeWidth={2}
                    />
                    <Tooltip
                      formatter={(v) => [`${v}%`, 'Level']}
                      contentStyle={{
                        background: '#13131f',
                        border: '1px solid rgba(99,102,241,0.3)',
                        borderRadius: '8px',
                        color: '#a5b4fc',
                        fontSize: '0.8rem',
                        fontFamily: '"JetBrains Mono", monospace',
                      }}
                    />
                  </RadarChart>
                ) : <g />}
              </ResponsiveContainer>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
