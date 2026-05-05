import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useSpring, useInView } from 'framer-motion';
import './App.css';

/* ── Icons ── */
const GithubIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.03c3.15-.38 6.5-1.4 6.5-7.17A5.1 5.1 0 0 0 19 4.3a5.2 5.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a11.5 11.5 0 0 0-6 0C7.1 1.1 6 1.1 6 1.1a5.2 5.2 0 0 0-.1 3.2A5.1 5.1 0 0 0 4 7.8c0 5.76 3.35 6.78 6.5 7.17A4.8 4.8 0 0 0 9.5 18v4" /><path d="M9 20a5.5 5.5 0 0 1-5-2.5" /></svg>);
const LinkedinIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>);
const MailIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>);
const ExternalIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>);
const StarIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>);

/* ── Fade-in section wrapper ── */
function FadeIn({ children, delay = 0, className = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: '-80px' });
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, delay: inView ? delay : 0, ease: [0.25, 0.46, 0.45, 0.94] }}
    >{children}</motion.div>
  );
}

/* ── Data ── */
const SKILLS = {
  'Languages': ['Python', 'Java', 'Bash', 'JavaScript', 'TypeScript'],
  'Frontend': ['HTML', 'CSS', 'React', 'Vite'],
  'Tools & Frameworks': ['Git', 'GitHub', 'Render', 'Metasploit', 'Supabase'],
  'Core Skills': ['OS', 'DBMS', 'Machine Learning', 'Cybersecurity', 'UI/UX'],
  'Databases': ['MySQL', 'Supabase'],
};

const PROJECTS = [
  {
    name: 'PhishGuard',
    description: 'An intelligent browser extension that detects phishing URLs in real-time using ML models (RandomForest). Achieved 85–90% detection accuracy on test datasets and reduced manual verification effort by ~60% through automated risk scoring.',
    tags: ['JavaScript', 'Machine Learning', 'Browser Extension', 'Cybersecurity'],
    github: 'https://girinadh007.github.io/PG_WEB',
    stars: 8,
    featured: true,
  },
  {
    name: 'EMS – Employee Management System',
    description: 'Full-stack Employee Management System built with React + TypeScript frontend and Supabase backend. Features real-time data sync, role-based access, and a clean dashboard for managing employees, departments, and attendance.',
    tags: ['TypeScript', 'React', 'Supabase', 'Full Stack'],
    github: 'https://github.com/Girinadh007/EMS',
    stars: 10,
    featured: true,
  },
  {
    name: 'Digital Forensics Tools Documentation',
    description: 'Drafted structured documentation for 10+ forensic tools. Simplified complex command-line workflows for easier understanding and enhanced accessibility by creating a centralized learning repository.',
    tags: ['Digital Forensics', 'Documentation', 'Cybersecurity'],
    github: 'https://github.com/Girinadh007/Digital-Forensics-Tools',
    stars: 57,
    featured: true,
  },
  {
    name: 'EvalPro',
    description: 'A full-stack evaluation and assessment platform built with TypeScript. Provides structured workflows for exam creation, student evaluation, and result analytics.',
    tags: ['TypeScript', 'React', 'Full Stack'],
    github: 'https://github.com/Girinadh007/EvalPro',
    stars: 2,
    featured: false,
  },
  {
    name: 'Key Logger',
    description: 'A Python-based keystroke logging program developed for controlled environments. Captured 1000+ input events with reliable logging performance and maintained system efficiency with <5% performance impact.',
    tags: ['Python', 'Cybersecurity', 'System Programming'],
    github: 'https://github.com/Girinadh007/Key_Logger',
    stars: 6,
    featured: false,
  },
  {
    name: 'Password Strength Checker',
    description: 'A JavaScript web app that evaluates password strength in real-time, providing instant visual feedback and actionable recommendations to encourage secure credential practices.',
    tags: ['JavaScript', 'HTML', 'CSS', 'Security'],
    github: 'https://github.com/Girinadh007/Password-Strength-Checker',
    stars: 6,
    featured: false,
  },
  {
    name: 'GSEA – Girinadh Study & Exam App',
    description: 'A responsive HTML/CSS/JS study and exam web application with interactive question banks, score tracking, and a clean user interface for self-assessment.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    github: 'https://github.com/Girinadh007/GSEA',
    stars: 5,
    featured: false,
  },
  {
    name: 'PhishGuard Website (PG_WEB)',
    description: 'Official landing page for PhishGuard — showcases the browser extension, explains its features, and provides download instructions. Deployed via GitHub Pages.',
    tags: ['CSS', 'HTML', 'GitHub Pages'],
    github: 'https://github.com/Girinadh007/PG_WEB',
    stars: 1,
    featured: false,
  },
];

const EDUCATION = [
  {
    degree: 'B.Tech in Computer Science and Engineering',
    institution: 'Kalasalingam Academy of Research and Education (KARE)',
    period: '2023 – 2027',
    location: 'Krishnan Koil, TN',
    detail: 'CGPA: 8.77',
  },
  {
    degree: 'Higher Secondary Education (12th)',
    institution: 'Narayana Junior College',
    period: '2021 – 2023',
    location: 'Guntur, AP',
    detail: 'Percentage: 89/100',
  },
  {
    degree: 'SSC (10th)',
    institution: 'Siddhartha High School',
    period: '2020 – 2021',
    location: 'Guntur, AP',
    detail: 'GPA: 10/10',
  },
];

const ACHIEVEMENTS = [
  'Secured 3rd rank in academics at KARE',
  'Vice President in KARE Open Source Society',
  'Organised multiple co-curricular and technical events such as hackathons, workshops and webinars as a part of KAREOSS',
  'Participated in Visa AI Hackathon as Team LuFfY organised by IIT Madras, Chennai - Represented KARE and gained hands-on experience applying software systems to enhance the use of visa cards.',
];

const CERTIFICATIONS = [
  'SoftSkills by NPTEL (Online)',
  'Oracle Certified Foundations Associate Certificate of Recognition by Oracle University',
  'SQL issued by CodeChef',
  'Design and Analysis by Codechef',
];

/* ── Main App ── */
export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const [activeNav, setActiveNav] = useState('home');

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) setActiveNav(e.target.id); });
    }, { threshold: 0.4 });
    sections.forEach(s => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'education', label: 'Education' },
    { id: 'achievements', label: 'Achievements' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <>
      {/* Progress bar */}
      <motion.div className="progress-bar" style={{ scaleX }} />

      {/* Background */}
      <div className="bg-grid" />

      {/* Nav */}
      <nav className="nav-header">
        <div className="logo">GIRI<span>NADH</span></div>
        <ul className="nav-links">
          {navLinks.map(l => (
            <li key={l.id}>
              <a href={`#${l.id}`} className={activeNav === l.id ? 'active' : ''}>{l.label}</a>
            </li>
          ))}
        </ul>
        <a href="mailto:pedapudigirinadh@gmail.com" className="btn-talk">Let's Talk</a>
      </nav>

      {/* ── HERO ── */}
      <section id="home" className="hero-section">
        <div className="hero-bg-glow" />
        <motion.div className="hero-content"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
        >

          <h1 className="hero-title">
            Venkata<br /><span className="highlight">Girinadh</span><br />Pedapudi
          </h1>
          <p className="hero-subtitle">
            Computer Science Student · Cybersecurity Enthusiast · <br />
            Building real-world solutions such as phishing detectors, event management systems, etc.
          </p>
          <div className="hero-cta-row">
            <a href="#projects" className="btn-primary">View My Work</a>
            <a href="https://github.com/Girinadh007" target="_blank" rel="noreferrer" className="btn-outline">
              <GithubIcon /> GitHub
            </a>
          </div>
          <div className="hero-stats">
            <div className="stat"><span className="stat-num">8+</span><span className="stat-label">Projects</span></div>
            <div className="stat-divider" />
            <div className="stat"><span className="stat-num">100+</span><span className="stat-label">GitHub Stars</span></div>
            <div className="stat-divider" />
            <div className="stat"><span className="stat-num">8.77</span><span className="stat-label">CGPA</span></div>
          </div>
        </motion.div>
        <div className="scroll-indicator">
          <span>Scroll</span>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="section">
        <FadeIn><div className="section-tag">About Me</div></FadeIn>
        <div className="about-grid">
          <FadeIn delay={0.1}>
            <h2 className="section-title">Who I Am</h2>
            <p className="about-text">
              I'm an enthusiastic and motivated Computer Science graduate (B.Tech, KARE, 2027) seeking to apply academic knowledge to real-world engineering challenges. With a focus on cybersecurity and software development, I build tools that are not just functional, but impactful.
            </p>
            <p className="about-text">
              From developing an AI-powered phishing detection extension to building a complete Event Management System, I love turning complex problems into elegant software solutions. I'm also an active community builder — serving as Vice President of KARE Open Source Society and organising hackathons and workshops.
            </p>
            <div className="about-info-grid">
              <div className="info-item"><span className="info-label">Email</span><a href="mailto:pedapudigirinadh@gmail.com">pedapudigirinadh@gmail.com</a></div>
              <div className="info-item"><span className="info-label">Phone</span><span>+91 9381738379</span></div>
              <div className="info-item"><span className="info-label">GitHub</span><a href="https://github.com/Girinadh007" target="_blank" rel="noreferrer">Girinadh007</a></div>
            </div>
          </FadeIn>

        </div>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills" className="section">
        <FadeIn><div className="section-tag">Technical Skills</div></FadeIn>
        <FadeIn delay={0.1}><h2 className="section-title">What I Work With</h2></FadeIn>
        <div className="skills-grid">
          {Object.entries(SKILLS).map(([category, items], i) => (
            <FadeIn key={category} delay={i * 0.08}>
              <div className="skill-card glass-panel">
                <h4 className="skill-category">{category}</h4>
                <div className="skill-tags">
                  {items.map(s => <span key={s} className="skill-tag">{s}</span>)}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
        <FadeIn delay={0.4}>
          <div className="soft-skills glass-panel">
            <h4>Soft Skills</h4>
            <div className="skill-tags">
              {['Excellent Communication', 'Problem Solving', 'Debugging', 'Time Management', 'Teamwork', 'Adaptability'].map(s => (
                <span key={s} className="skill-tag soft">{s}</span>
              ))}
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" className="section">
        <FadeIn><div className="section-tag">GitHub Projects</div></FadeIn>
        <FadeIn delay={0.1}>
          <h2 className="section-title">Work I've Built</h2>
          <p className="section-subtitle">All projects are live on GitHub — click any card to view the source code.</p>
        </FadeIn>

        <div className="featured-label">⭐ Featured Projects</div>
        <div className="projects-grid featured-grid">
          {PROJECTS.filter(p => p.featured).map((p, i) => (
            <FadeIn key={p.name} delay={i * 0.1}>
              <a href={p.github} target="_blank" rel="noreferrer" className="project-card glass-panel featured-card">
                <div className="project-card-top">
                  <h3 className="project-name">{p.name}</h3>
                  <div className="project-meta">
                    <span className="star-count"><StarIcon /> {p.stars}</span>
                    <ExternalIcon />
                  </div>
                </div>
                <p className="project-desc">{p.description}</p>
                <div className="project-tags">
                  {p.tags.map(t => <span key={t} className="project-tag">{t}</span>)}
                </div>
              </a>
            </FadeIn>
          ))}
        </div>

        <div className="featured-label" style={{ marginTop: '3rem' }}>Other Projects</div>
        <div className="projects-grid">
          {PROJECTS.filter(p => !p.featured).map((p, i) => (
            <FadeIn key={p.name} delay={i * 0.08}>
              <a href={p.github} target="_blank" rel="noreferrer" className="project-card glass-panel">
                <div className="project-card-top">
                  <h3 className="project-name">{p.name}</h3>
                  <div className="project-meta">
                    <span className="star-count"><StarIcon /> {p.stars}</span>
                    <ExternalIcon />
                  </div>
                </div>
                <p className="project-desc">{p.description}</p>
                <div className="project-tags">
                  {p.tags.map(t => <span key={t} className="project-tag">{t}</span>)}
                </div>
              </a>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── EDUCATION ── */}
      <section id="education" className="section">
        <FadeIn><div className="section-tag">Education</div></FadeIn>
        <FadeIn delay={0.1}><h2 className="section-title">Academic Background</h2></FadeIn>
        <div className="timeline">
          {EDUCATION.map((e, i) => (
            <FadeIn key={e.institution} delay={i * 0.12}>
              <div className="timeline-item glass-panel">
                <div className="timeline-dot" />
                <div className="timeline-content">
                  <div className="timeline-period">{e.period}</div>
                  <h3 className="timeline-degree">{e.degree}</h3>
                  <div className="timeline-institution">{e.institution}</div>
                  <div className="timeline-meta">
                    <span className="timeline-location">📍 {e.location}</span>
                    <span className="timeline-detail highlight-text">{e.detail}</span>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── ACHIEVEMENTS ── */}
      <section id="achievements" className="section">
        <FadeIn><div className="section-tag">Achievements & Certifications</div></FadeIn>
        <FadeIn delay={0.1}><h2 className="section-title">Beyond the Code</h2></FadeIn>
        <div className="two-col-grid">
          <div>
            <FadeIn delay={0.15}>
              <h3 className="sub-heading">🏆 Achievements</h3>
            </FadeIn>
            <ul className="achievement-list">
              {ACHIEVEMENTS.map((a, i) => (
                <FadeIn key={i} delay={0.15 + i * 0.08}>
                  <li className="achievement-item glass-panel">
                    <span className="achievement-icon">◆</span>
                    <span>{a}</span>
                  </li>
                </FadeIn>
              ))}
            </ul>
          </div>
          <div>
            <FadeIn delay={0.2}>
              <h3 className="sub-heading">🎓 Certifications</h3>
            </FadeIn>
            <ul className="achievement-list">
              {CERTIFICATIONS.map((c, i) => (
                <FadeIn key={i} delay={0.2 + i * 0.08}>
                  <li className="achievement-item glass-panel">
                    <span className="achievement-icon cert">✓</span>
                    <span>{c}</span>
                  </li>
                </FadeIn>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <div className="cta-wrapper">
        <FadeIn>
          <div className="cta-banner glass-panel">
            <div className="cta-text">
              <p className="cta-eyebrow">Available for Opportunities</p>
              <h2 className="cta-heading">Open to Roles in Development &amp; Cybersecurity</h2>
              <p className="cta-sub">I'm a B.Tech Computer Science student actively seeking entry-level positions, internships, and collaborative projects. If you're looking for someone driven, adaptable, and eager to contribute - let's talk.</p>
            </div>
            <div className="cta-actions">
              <a href="mailto:pedapudigirinadh@gmail.com" className="btn-primary">Get In Touch</a>
              <a href="https://github.com/Girinadh007" target="_blank" rel="noreferrer" className="btn-outline"><GithubIcon /> View GitHub</a>
            </div>
          </div>
        </FadeIn>
      </div>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <p className="footer-label">CONTACT</p>
        <div className="footer-links">
          <a href="https://github.com/Girinadh007" target="_blank" rel="noreferrer" title="GitHub"><GithubIcon /></a>
          <a href="https://www.linkedin.com/in/venkata-girinadh" target="_blank" rel="noreferrer" title="LinkedIn"><LinkedinIcon /></a>
          <a href="mailto:pedapudigirinadh@gmail.com" title="Email"><MailIcon /></a>
        </div>
      </footer>
    </>
  );
}
