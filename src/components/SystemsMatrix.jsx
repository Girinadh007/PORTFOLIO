import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sound } from '../utils/audio';

const MATRIX_ITEMS = [
  {
    id: 'phishguard',
    title: 'PhishGuard — In-Browser ML Extension',
    category: 'CYBERSECURITY',
    categoryKey: 'security',
    desc: 'Privacy-preserving Chromium extension detecting phishing in real-time. 99.20% accuracy, 99.87% precision, 450,177 URL benchmark dataset, zero cloud calls, evaluating suspicious URLs in < 0.05ms.',
    tags: ['JavaScript', 'Random Forest', 'Manifest V3', 'Cybersecurity'],
    github: 'https://github.com/Girinadh007/PhishGuard',
    metrics: '99.20% Accuracy // 100% Local Inference',
    status: 'FLAGSHIP',
  },
  {
    id: 'ems',
    title: 'EMS — Campus Event Management System',
    category: 'FULL-STACK & APPS',
    categoryKey: 'apps',
    desc: 'Production campus event management system. Features student registrations, payment verification proofs, dynamic admin controls, and built-in QR ticket scanning for real-time attendance tracking.',
    tags: ['React', 'TypeScript', 'Supabase', 'Render', 'QR Scanner'],
    github: 'https://github.com/Girinadh007/EMS',
    metrics: 'Live on Render // 10 Stars',
    status: 'DEPLOYED',
  },
  {
    id: 'forensics',
    title: 'Digital Forensics Tools Vault',
    category: 'CYBERSECURITY',
    categoryKey: 'security',
    desc: 'Comprehensive step-by-step investigation guides and command references for 10+ industry forensic tools including Volatility memory forensics, Wireshark packet capture, Autopsy, and TestDisk.',
    tags: ['Forensics', 'Volatility', 'Wireshark', 'Security'],
    github: 'https://github.com/Girinadh007/Digital-Forensics-Tools',
    metrics: '56 GitHub Stars // 10+ Toolkits',
    status: 'VERIFIED',
  },
  {
    id: 'evalpro',
    title: 'EvalPro — Evaluation Hub Pro',
    category: 'FULL-STACK & APPS',
    categoryKey: 'apps',
    desc: 'High-performance glassmorphism grading system for hackathons and academic presentations. Features bulk .xlsx import with Fill-Down logic, weighted criteria grading, and consolidated report export.',
    tags: ['React', 'TypeScript', 'Supabase', 'Framer Motion'],
    github: 'https://github.com/Girinadh007/EvalPro',
    metrics: 'Glassmorphism UI // Supabase Real-Time',
    status: 'ACTIVE',
  },
  {
    id: 'keylogger',
    title: 'Key Logger — Forensic Input Auditor',
    category: 'CYBERSECURITY',
    categoryKey: 'security',
    desc: 'Python-based keystroke capture program engineered for controlled forensic environments. Captured 1,000+ input events with reliable logging and maintained system overhead under 5%.',
    tags: ['Python', 'Forensics', 'OS Hooks', 'Cybersecurity'],
    github: 'https://github.com/Girinadh007/Key_Logger',
    metrics: '6 GitHub Stars // < 5% CPU Impact',
    status: 'AUDITED',
  },
  {
    id: 'pw-checker',
    title: 'Password Entropy & Strength Analyzer',
    category: 'CYBERSECURITY',
    categoryKey: 'security',
    desc: 'Client-side security application calculating real-time password entropy bits, brute-force resistance estimations, dictionary vulnerability alerts, and security best practices.',
    tags: ['JavaScript', 'HTML5', 'Entropy Algorithms', 'Security'],
    github: 'https://github.com/Girinadh007/Password-Strength-Checker',
    metrics: '6 GitHub Stars // Real-Time Scoring',
    status: 'LIVE',
  },
  {
    id: 'gsea',
    title: 'GSEA — Study & Exam Simulation Platform',
    category: 'FULL-STACK & APPS',
    categoryKey: 'apps',
    desc: 'Responsive exam simulation web application featuring dynamic randomized question banks, timed test sessions, instant score aggregation, and historical performance tracking.',
    tags: ['JavaScript', 'HTML', 'CSS', 'Assessment'],
    github: 'https://github.com/Girinadh007/GSEA',
    metrics: '5 GitHub Stars // Zero Dependencies',
    status: 'DEPLOYED',
  },
  {
    id: 'pg-web',
    title: 'PG_WEB — PhishGuard Web Portal',
    category: 'FULL-STACK & APPS',
    categoryKey: 'apps',
    desc: 'Official web gateway and download portal for PhishGuard. Outlines feature architecture, installation walkthroughs for 5+ browsers, and live demonstration assets hosted on GitHub Pages.',
    tags: ['Web Engineering', 'GitHub Pages', 'UI/UX', 'Docs'],
    github: 'https://github.com/Girinadh007/PG_WEB',
    metrics: 'Live Portal // CDN Distributed',
    status: 'LIVE',
  },
  {
    id: 'testdisk',
    title: 'TestDisk Forensic Recovery Guide',
    category: 'RESEARCH & LABS',
    categoryKey: 'research',
    desc: 'Dedicated technical guide on utilizing TestDisk for recovering damaged partitions and retrieving deleted files from corrupted storage media in forensic investigations.',
    tags: ['TestDisk', 'Data Recovery', 'Partition Forensics'],
    github: 'https://github.com/Girinadh007/TESTDISK',
    metrics: 'Forensic Recovery // CLI Protocols',
    status: 'RESEARCH',
  },
  {
    id: 'attendance',
    title: 'Modern Attendance Architecture',
    category: 'SYSTEMS & UTILITIES',
    categoryKey: 'systems',
    desc: 'Optimized attendance tracking web platform developed with React, TypeScript, and Vite, featuring high-speed state synchronization and clean component structure.',
    tags: ['React', 'TypeScript', 'Vite', 'State Management'],
    github: 'https://github.com/Girinadh007/ATTENDANCE',
    metrics: 'Vite 8 // Type-Safe Architecture',
    status: 'ACTIVE',
  },
  {
    id: 'visa-hackathon',
    title: 'Visa AI Architecture (Team LuFfY)',
    category: 'RESEARCH & LABS',
    categoryKey: 'research',
    desc: 'Hackathon architecture developed for Visa AI Hackathon organized by IIT Madras, Chennai. Represented KARE to build intelligent software systems enhancing payment security and transaction monitoring.',
    tags: ['AI Hackathon', 'IIT Madras', 'Visa Security', 'Systems'],
    github: 'https://github.com/Girinadh007',
    metrics: 'IIT Madras Finalist // Team LuFfY',
    status: 'HONORED',
  },
];

const CATEGORIES = [
  { key: 'all', label: 'ALL MODULES' },
  { key: 'security', label: 'CYBERSECURITY' },
  { key: 'apps', label: 'FULL-STACK' },
  { key: 'research', label: 'RESEARCH & LABS' },
  { key: 'systems', label: 'SYSTEMS' },
];

export default function SystemsMatrix() {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredItems =
    activeFilter === 'all'
      ? MATRIX_ITEMS
      : MATRIX_ITEMS.filter((item) => item.categoryKey === activeFilter);

  const handleFilter = (key) => {
    sound.playClick();
    setActiveFilter(key);
  };

  return (
    <div className="matrix-wrapper">
      {/* Category Filter Pills */}
      <div className="matrix-filters-row">
        <span className="filters-label font-mono">// MATRIX FILTER:</span>
        <div className="filters-buttons">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              className={`filter-btn font-mono ${activeFilter === cat.key ? 'filter-active' : ''}`}
              onClick={() => handleFilter(cat.key)}
              onMouseEnter={() => sound.playHover()}
            >
              [ {cat.label} ]
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Matrix Cards */}
      <motion.div layout className="matrix-grid">
        <AnimatePresence>
          {filteredItems.map((item) => (
            <motion.div
              layout
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="hud-card matrix-card"
            >
              <div className="card-corner-bracket tl"></div>
              <div className="card-corner-bracket tr"></div>
              <div className="card-corner-bracket bl"></div>
              <div className="card-corner-bracket br"></div>

              <div className="matrix-card-top font-mono">
                <span className="matrix-cat-badge">{item.category}</span>
                <span className={`status-pill ${item.status.toLowerCase()}`}>
                  ● {item.status}
                </span>
              </div>

              <h4 className="matrix-card-title">{item.title}</h4>
              <p className="matrix-card-desc">{item.desc}</p>

              <div className="matrix-telemetry font-mono">
                <span className="metric-arrow">▶</span> {item.metrics}
              </div>

              <div className="matrix-card-tags">
                {item.tags.map((tag) => (
                  <span key={tag} className="matrix-tag font-mono">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="matrix-card-action">
                <a
                  href={item.github}
                  target="_blank"
                  rel="noreferrer"
                  className="matrix-link font-mono"
                  onMouseEnter={() => sound.playHover()}
                  onClick={() => sound.playClick()}
                >
                  DISPATCH REPO ↗
                </a>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
