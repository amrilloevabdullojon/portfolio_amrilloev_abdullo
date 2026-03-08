export const personalInfo = {
  name: 'Amrilloev Abdullo',
  title: 'Full Stack Developer',
  taglines: [
    'Full Stack Developer',
    'React Specialist',
    'Node.js Engineer',
    'Python Developer',
    'Problem Solver',
  ],
  bio: `Passionate Full Stack Developer with expertise in building scalable web applications.
I specialise in React ecosystems and Node.js backends, crafting seamless user experiences
from database to UI. I love turning complex problems into elegant, efficient solutions.`,
  bioShort: 'Building scalable web apps with modern technologies — from beautiful UIs to robust backends.',
  email: 'abdullo@example.com',
  github: 'https://github.com/amrilloevabdullojon',
  linkedin: 'https://linkedin.com/in/amrilloev-abdullo',
  telegram: 'https://t.me/amrilloev_abdullo',
  location: 'Uzbekistan',
  available: true,
  stats: [
    { label: 'Years Exp.', value: '3+' },
    { label: 'Projects', value: '20+' },
    { label: 'Clients', value: '10+' },
  ],
};

export const skills = [
  {
    category: 'Frontend',
    icon: '🌐',
    items: [
      { name: 'React / Next.js', level: 90, icon: '⚛️' },
      { name: 'HTML / CSS / JS', level: 95, icon: '🌐' },
      { name: 'TypeScript', level: 78, icon: '📘' },
      { name: 'Tailwind CSS', level: 88, icon: '🎨' },
    ],
  },
  {
    category: 'Backend',
    icon: '⚙️',
    items: [
      { name: 'Node.js / Express', level: 85, icon: '🟢' },
      { name: 'Python / Django', level: 75, icon: '🐍' },
      { name: 'REST API / GraphQL', level: 80, icon: '🔌' },
    ],
  },
  {
    category: 'Database',
    icon: '🗄️',
    items: [
      { name: 'PostgreSQL', level: 80, icon: '🐘' },
      { name: 'MongoDB', level: 78, icon: '🍃' },
      { name: 'Redis', level: 60, icon: '🔴' },
    ],
  },
  {
    category: 'Tools & DevOps',
    icon: '🔧',
    items: [
      { name: 'Git / GitHub', level: 92, icon: '🔧' },
      { name: 'Docker', level: 65, icon: '🐳' },
      { name: 'Linux / Bash', level: 70, icon: '🖥️' },
    ],
  },
];

export const projects = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    description:
      'Full-featured e-commerce app with authentication, product catalog, shopping cart, payment integration and admin dashboard.',
    tech: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
    github: '#',
    live: '#',
    gradient: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    emoji: '🛍️',
  },
  {
    id: 2,
    title: 'Task Management App',
    description:
      'Collaborative project management tool with real-time updates, drag-and-drop boards, team workspaces and progress tracking.',
    tech: ['React', 'Socket.io', 'MongoDB', 'Express'],
    github: '#',
    live: '#',
    gradient: 'linear-gradient(135deg, #06b6d4 0%, #6366f1 100%)',
    emoji: '📋',
  },
  {
    id: 3,
    title: 'Blog CMS Platform',
    description:
      'Content management system with rich text editor, SEO optimisation, media uploads, multi-author support and analytics.',
    tech: ['Next.js', 'Django', 'PostgreSQL', 'AWS S3'],
    github: '#',
    live: '#',
    gradient: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
    emoji: '✍️',
  },
  {
    id: 4,
    title: 'Real-Time Chat App',
    description:
      'Messenger with end-to-end encryption, group chats, file sharing, voice messages and online status indicators.',
    tech: ['React', 'Node.js', 'Socket.io', 'Redis'],
    github: '#',
    live: '#',
    gradient: 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)',
    emoji: '💬',
  },
  {
    id: 5,
    title: 'Analytics Dashboard',
    description:
      'Business intelligence dashboard with interactive charts, custom reports, data export and real-time KPI monitoring.',
    tech: ['React', 'Python', 'FastAPI', 'PostgreSQL'],
    github: '#',
    live: '#',
    gradient: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
    emoji: '📊',
  },
  {
    id: 6,
    title: 'Fitness Tracker API',
    description:
      'RESTful API for fitness tracking with workout logging, progress analytics, nutrition tracking and social features.',
    tech: ['Django', 'PostgreSQL', 'Redis', 'Docker'],
    github: '#',
    live: '#',
    gradient: 'linear-gradient(135deg, #f97316 0%, #eab308 100%)',
    emoji: '💪',
  },
];
