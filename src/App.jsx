import { useState, useEffect } from 'react';
import BootSequence from './components/BootSequence';
import HudNav from './components/HudNav';
import FlagshipStack from './components/FlagshipStack';
import SystemsMatrix from './components/SystemsMatrix';
import CredentialsSection from './components/CredentialsSection';
import CyberTerminal from './components/CyberTerminal';
import CustomCursor from './components/CustomCursor';
import { sound } from './utils/audio';
import './App.css';

/* ── Social Icons ── */
const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.03c3.15-.38 6.5-1.4 6.5-7.17A5.1 5.1 0 0 0 19 4.3a5.2 5.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a11.5 11.5 0 0 0-6 0C7.1 1.1 6 1.1 6 1.1a5.2 5.2 0 0 0-.1 3.2A5.1 5.1 0 0 0 4 7.8c0 5.76 3.35 6.78 6.5 7.17A4.8 4.8 0 0 0 9.5 18v4" />
    <path d="M9 20a5.5 5.5 0 0 1-5-2.5" />
  </svg>
);

const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

export default function App() {
  const [bootCompleted, setBootCompleted] = useState(false);
  const [showTerminal, setShowTerminal] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  // Track active section for HUD Navbar
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'flagships', 'matrix', 'credentials', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard shortcut to open CLI terminal (` or Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === '`' || (e.ctrlKey && e.key.toLowerCase() === 'k')) {
        e.preventDefault();
        setShowTerminal((prev) => !prev);
      } else if (e.key === 'Escape' && showTerminal) {
        setShowTerminal(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showTerminal]);

  return (
    <div className="hud-app-root">
      {/* Tactical Custom Cursor */}
      <CustomCursor />

      {/* Cyberpunk Grid Overlay */}
      <div className="hud-grid-overlay" />
      <div className="hud-scanlines" />

      {/* Boot Sequence Initialization (Cinematic Intro) */}
      {!bootCompleted && (
        <BootSequence onComplete={() => setBootCompleted(true)} />
      )}

      {/* Interactive Global Cyber Terminal Modal */}
      <CyberTerminal
        isOpen={showTerminal}
        onClose={() => setShowTerminal(false)}
      />

      {/* Top HUD Navigation Bar */}
      <HudNav
        activeSection={activeSection}
        onToggleTerminal={() => {
          sound.playClick();
          setShowTerminal((prev) => !prev);
        }}
        onReplayBoot={() => {
          sound.playConfirm();
          setBootCompleted(false);
        }}
      />

      {/* ─────────────────────────────────────────────────────────────
          00 // HERO: COMMAND CENTER / OVERVIEW
      ───────────────────────────────────────────────────────────── */}
      <section id="hero" className="hud-section hero-hud-section">
        <div className="hero-giant-bg-text font-mono" aria-hidden="true">
          PORTFOLIO
        </div>

        <div className="hud-container hero-grid">
          {/* Left Column: Hero Headline & Manifesto */}
          <div className="hero-main-content">
            <div className="hud-eyebrow font-mono">
              <span className="dot red-pulse">●</span>
              <span className="eyebrow-text">
                [ STATUS: SYSTEM ARCHITECT // CYBERSECURITY RESEARCHER ]
              </span>
            </div>

            <h1 className="hero-name-heading">
              <span className="greeting-sub font-mono">Hello, I'm</span>
              <span className="name-primary">VENKATA GIRINADH</span>
              <span className="name-secondary font-mono">.PEDAPUDI</span>
            </h1>

            <div className="hero-role-badge font-mono">
              <span className="bracket">[</span>
              <span>CYBERSECURITY RESEARCHER // FULL-STACK ARCHITECT // VP @ KAREOSS</span>
              <span className="bracket">]</span>
            </div>

            <p className="hero-manifesto font-mono">
              Architecting 24/7 privacy-preserving in-browser threat detection ecosystems, real-time campus event architectures, and digital forensics tooling from first principles — zero cloud leaks, total defense.
            </p>

            <div className="hero-cta-buttons">
              <a
                href="#contact"
                className="hud-action-btn primary"
                onMouseEnter={() => sound.playHover()}
                onClick={() => sound.playClick()}
              >
                [ INITIATE DISPATCH ]
              </a>
              <a
                href="#flagships"
                className="hud-action-btn outline"
                onMouseEnter={() => sound.playHover()}
                onClick={() => sound.playClick()}
              >
                [ EXPLORE ARCHITECTURE ]
              </a>
              <button
                className="hud-action-btn terminal-btn font-mono"
                onClick={() => {
                  sound.playClick();
                  setShowTerminal(true);
                }}
                onMouseEnter={() => sound.playHover()}
              >
                &gt;_ OPEN CLI
              </button>
            </div>

            {/* Telemetry Counter Strip */}
            <div className="hero-telemetry-row">
              <div className="telemetry-block">
                <span className="telemetry-val font-mono red-text">99.20%</span>
                <span className="telemetry-lbl font-mono">MODEL ACCURACY</span>
              </div>
              <div className="telemetry-sep font-mono">/</div>
              <div className="telemetry-block">
                <span className="telemetry-val font-mono cyan-text">99.87%</span>
                <span className="telemetry-lbl font-mono">PRECISION SCORE</span>
              </div>
              <div className="telemetry-sep font-mono">/</div>
              <div className="telemetry-block">
                <span className="telemetry-val font-mono">8.77</span>
                <span className="telemetry-lbl font-mono">ACADEMIC CGPA</span>
              </div>
              <div className="telemetry-sep font-mono">/</div>
              <div className="telemetry-block">
                <span className="telemetry-val font-mono green-text">100+ ★</span>
                <span className="telemetry-lbl font-mono">GITHUB ECOSYSTEM</span>
              </div>
            </div>
          </div>

          {/* Right Column: Sovereign Operator Avatar & Side Telemetry Stack */}
          <div className="hero-operator-sidebar">
            {/* Operator Card */}
            <div className="hud-card operator-avatar-card">
              <div className="card-corner-bracket tl"></div>
              <div className="card-corner-bracket tr"></div>
              <div className="card-corner-bracket bl"></div>
              <div className="card-corner-bracket br"></div>

              <div className="avatar-frame">
                <div className="avatar-hologram-mesh"></div>
                <div className="avatar-scan-laser"></div>
                <div className="avatar-graphic">
                  {/* Cyber Hologram Operator Graphic */}
                  <svg viewBox="0 0 200 240" className="avatar-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="cyberRed" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#ff3344" stopOpacity="0.9" />
                        <stop offset="100%" stopColor="#880011" stopOpacity="0.4" />
                      </linearGradient>
                      <linearGradient id="cyberCyan" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#005577" stopOpacity="0.2" />
                      </linearGradient>
                    </defs>
                    <path d="M100 30 L135 65 L135 110 L100 145 L65 110 L65 65 Z" stroke="#ff3344" strokeWidth="2" fill="url(#cyberRed)" />
                    <circle cx="100" cy="85" r="22" stroke="#00f0ff" strokeWidth="1.5" strokeDasharray="4 2" />
                    <path d="M35 220 L65 160 L135 160 L165 220 Z" stroke="#ff3344" strokeWidth="2" fill="rgba(255, 51, 68, 0.15)" />
                    <circle cx="100" cy="85" r="4" fill="#00f0ff" />
                    <line x1="100" y1="15" x2="100" y2="40" stroke="#00f0ff" strokeWidth="1" />
                    <line x1="45" y1="85" x2="155" y2="85" stroke="#00f0ff" strokeWidth="1" strokeDasharray="3 3" />
                    <line x1="25" y1="180" x2="175" y2="180" stroke="#ff3344" strokeWidth="1" strokeDasharray="4 4" />
                  </svg>
                </div>
                <div className="operator-id-tag font-mono">
                  <span className="dot red-pulse">●</span>
                  <span>[ SOVEREIGN OPERATOR // STATUS: ACTIVE ]</span>
                </div>
              </div>
            </div>

            {/* 3 Telemetry Cards Stack */}
            <div className="side-telemetry-stack">
              <div className="hud-card mini-telemetry-card">
                <div className="card-corner-bracket tl"></div>
                <div className="card-corner-bracket tr"></div>
                <div className="card-corner-bracket bl"></div>
                <div className="card-corner-bracket br"></div>
                <div className="mini-card-head font-mono">
                  <span className="mini-label cyan-text">HEURISTIC ML CORE</span>
                  <span className="mini-status font-mono">99.20% ACC</span>
                </div>
                <h5 className="mini-title">PhishGuard Privacy Shield</h5>
                <p className="mini-desc">
                  Pure JavaScript in-browser Random Forest classifier benchmarked on 450,177 verified URLs.
                </p>
              </div>

              <div className="hud-card mini-telemetry-card">
                <div className="card-corner-bracket tl"></div>
                <div className="card-corner-bracket tr"></div>
                <div className="card-corner-bracket bl"></div>
                <div className="card-corner-bracket br"></div>
                <div className="mini-card-head font-mono">
                  <span className="mini-label red-text">CAMPUS PLATFORM</span>
                  <span className="mini-status font-mono">LIVE ON RENDER</span>
                </div>
                <h5 className="mini-title">EMS — Event Management</h5>
                <p className="mini-desc">
                  Real-time event discovery, payment proof auditing & QR-code digital ticket scanning.
                </p>
              </div>

              <div className="hud-card mini-telemetry-card">
                <div className="card-corner-bracket tl"></div>
                <div className="card-corner-bracket tr"></div>
                <div className="card-corner-bracket bl"></div>
                <div className="card-corner-bracket br"></div>
                <div className="mini-card-head font-mono">
                  <span className="mini-label green-text">SECURITY VAULT</span>
                  <span className="mini-status font-mono">56★ STARS</span>
                </div>
                <h5 className="mini-title">Digital Forensics Vault</h5>
                <p className="mini-desc">
                  Documented investigation workflows for Volatility, Wireshark, TestDisk, and Autopsy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          01 // SECTION: EXECUTIVE PROFILE ("01 // LOG 001_ABOUT /INDEX [10]")
      ───────────────────────────────────────────────────────────── */}
      <section id="about" className="hud-section">
        <div className="hud-container">
          <div className="section-index-header font-mono">
            <span className="red-tag">01 // LOG 001_ABOUT</span>
            <span className="sep">/</span>
            <span className="cyan-tag">INDEX [10]</span>
          </div>

          <div className="section-title-wrap">
            <span className="section-category-tag font-mono">EXECUTIVE PROFILE</span>
            <h2 className="section-main-heading">Background & Philosophy</h2>
          </div>

          <div className="about-split-layout">
            {/* Left Narrative Column */}
            <div className="about-text-column">
              <p className="about-p font-mono">
                I am <strong className="white-text">Venkata Girinadh Pedapudi</strong> — an independent system architect and cybersecurity researcher operating across in-browser ML threat intelligence, campus-scale web platforms, and digital forensics.
              </p>
              <p className="about-p font-mono">
                My formal academic foundation was established with a <strong className="cyan-text">B.Tech in Computer Science and Engineering</strong> at <strong className="cyan-text">Kalasalingam Academy of Research and Education (CGPA 8.77, 3rd Academic Rank)</strong>, followed by extensive research into lexical feature engineering, Shannon entropy classification, and high-performance full-stack architectures.
              </p>
              <p className="about-p font-mono">
                However, my defining capabilities were forged in the terminal: reversing forensic formats, building real-time client-side ML extensions like <strong className="red-text">PhishGuard</strong> (99.20% accuracy, 99.87% precision, zero cloud calls), architecting the campus-wide <strong className="cyan-text">EMS Event Management System</strong> with QR ticket scanning on Render + Supabase, and directing technical operations as Vice President of <strong className="cyan-text">KARE Open Source Society</strong>. I view software engineering not as framework assembly, but as the orchestration of security boundaries, memory efficiency, and fault-tolerant algorithms.
              </p>

              {/* Tactical Callout Box */}
              <div className="hud-manifesto-box">
                <div className="manifesto-left-stripe"></div>
                <div className="manifesto-content">
                  <div className="manifesto-tag font-mono">[ ARCHITECTURAL DIRECTIVE ]</div>
                  <blockquote className="manifesto-quote">
                    "I design and deploy secure, autonomous software systems that operate 24/7 with persistent integrity, automated threat heuristics, and continuous self-evolution — built from first principles, not frameworks."
                  </blockquote>
                </div>
              </div>
            </div>

            {/* Right Tactical Cards Column */}
            <div className="about-cards-column">
              <div className="hud-card tactical-principle-card">
                <div className="card-corner-bracket tl"></div>
                <div className="card-corner-bracket tr"></div>
                <div className="card-corner-bracket bl"></div>
                <div className="card-corner-bracket br"></div>
                <div className="principle-head font-mono">
                  <span className="badge-tag red-glow">PILLAR 01</span>
                  <span className="principle-metric">ZERO CLOUD LEAKS</span>
                </div>
                <h4 className="principle-title">Privacy-First Security</h4>
                <p className="principle-desc">
                  Proactive defense models that keep browsing data strictly on-device. Client-side Random Forest evaluation in pure JavaScript means your URLs and history never transmit to external telemetry servers.
                </p>
              </div>

              <div className="hud-card tactical-principle-card">
                <div className="card-corner-bracket tl"></div>
                <div className="card-corner-bracket tr"></div>
                <div className="card-corner-bracket bl"></div>
                <div className="card-corner-bracket br"></div>
                <div className="principle-head font-mono">
                  <span className="badge-tag cyan-glow">PILLAR 02</span>
                  <span className="principle-metric">FIRST PRINCIPLES</span>
                </div>
                <h4 className="principle-title">First-Principles Architecture</h4>
                <p className="principle-desc">
                  Rejecting superficial framework bloat in favor of clean systems programming, verified algorithms, sub-millisecond data pipelines, and rock-solid state management.
                </p>
              </div>

              <div className="hud-card tactical-principle-card">
                <div className="card-corner-bracket tl"></div>
                <div className="card-corner-bracket tr"></div>
                <div className="card-corner-bracket bl"></div>
                <div className="card-corner-bracket br"></div>
                <div className="principle-head font-mono">
                  <span className="badge-tag green-glow">PILLAR 03</span>
                  <span className="principle-metric">CONTINUOUS AUDIT</span>
                </div>
                <h4 className="principle-title">Forensic Verification</h4>
                <p className="principle-desc">
                  Rigorous testing, digital forensics methodology, and continuous empirical validation ensure systems remain verifiable, tamper-resistant, and high-performing under peak loads.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          02 // SECTION: ARCHITECTURAL SHOWCASE ("02 // LOG 002_SYSTEMS /INDEX [20]")
      ───────────────────────────────────────────────────────────── */}
      <section id="flagships" className="hud-section">
        <div className="hud-container">
          <div className="section-index-header font-mono">
            <span className="red-tag">02 // LOG 002_SYSTEMS</span>
            <span className="sep">/</span>
            <span className="cyan-tag">INDEX [20]</span>
          </div>

          <div className="section-title-wrap">
            <span className="section-category-tag font-mono">ARCHITECTURAL SHOWCASE</span>
            <h2 className="section-main-heading">Flagship Deployments</h2>
            <p className="section-sub-desc font-mono">
              Production-grade systems running 24/7 across web platforms, local runtimes, and security environments.
            </p>
          </div>

          {/* Interactive Flagship Multi-Layer Stack */}
          <FlagshipStack />
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          03 // SECTION: THE SYSTEMS MATRIX ("03 // LOG 003_SPECIALIZED /INDEX [30]")
      ───────────────────────────────────────────────────────────── */}
      <section id="matrix" className="hud-section">
        <div className="hud-container">
          <div className="section-index-header font-mono">
            <span className="red-tag">03 // LOG 003_SPECIALIZED</span>
            <span className="sep">/</span>
            <span className="cyan-tag">INDEX [30]</span>
          </div>

          <div className="section-title-wrap">
            <span className="section-category-tag font-mono">SPECIALIZED LABS</span>
            <h2 className="section-main-heading">The Systems Matrix</h2>
            <p className="section-sub-desc font-mono">
              Specialized modules spanning ML security, penetration tooling, full-stack apps, and algorithms.
            </p>
          </div>

          {/* Filterable Matrix Grid */}
          <SystemsMatrix />
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          04 // SECTION: OFFICIAL CREDENTIALS ("04 // LOG 004_CREDENTIALS /INDEX [40]")
      ───────────────────────────────────────────────────────────── */}
      <section id="credentials" className="hud-section">
        <div className="hud-container">
          <div className="section-index-header font-mono">
            <span className="red-tag">04 // LOG 004_CREDENTIALS</span>
            <span className="sep">/</span>
            <span className="cyan-tag">INDEX [40]</span>
          </div>

          <div className="section-title-wrap">
            <span className="section-category-tag font-mono">OFFICIAL CREDENTIALS</span>
            <h2 className="section-main-heading">Academic & Professional Verification</h2>
            <p className="section-sub-desc font-mono">
              Verified institutional standing, competitive accolades, and professional certifications.
            </p>
          </div>

          {/* Education, Certifications & Honors */}
          <CredentialsSection />
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          05 // SECTION: DIRECT CONNECT ("05 // LOG 005_CONNECT /INDEX [50]")
      ───────────────────────────────────────────────────────────── */}
      <section id="contact" className="hud-section contact-hud-section">
        <div className="hud-container">
          <div className="section-index-header font-mono">
            <span className="red-tag">05 // LOG 005_CONNECT</span>
            <span className="sep">/</span>
            <span className="cyan-tag">INDEX [50]</span>
          </div>

          <div className="hud-card contact-box-card">
            <div className="card-corner-bracket tl"></div>
            <div className="card-corner-bracket tr"></div>
            <div className="card-corner-bracket bl"></div>
            <div className="card-corner-bracket br"></div>

            <div className="contact-inner-content">
              <span className="contact-badge font-mono">[ DIRECT CONNECT // PROTOCOL 05 ]</span>
              <h2 className="contact-headline">Let's Architect Something Extraordinary.</h2>
              <p className="contact-desc font-mono">
                Available for cybersecurity engineering, full-stack system architecture, and sovereign computational research contracts.
              </p>

              <div className="contact-direct-address font-mono">
                <span className="addr-label">TRANSMISSION TARGET:</span>
                <a
                  href="mailto:pedapudigirinadh@gmail.com"
                  className="addr-email"
                  onMouseEnter={() => sound.playHover()}
                >
                  pedapudigirinadh@gmail.com
                </a>
              </div>

              <div className="contact-actions-row">
                <a
                  href="mailto:pedapudigirinadh@gmail.com"
                  className="hud-action-btn primary large"
                  onMouseEnter={() => sound.playHover()}
                  onClick={() => sound.playClick()}
                >
                  <MailIcon /> [ INITIATE TRANSMISSION ]
                </a>
                <a
                  href="https://github.com/Girinadh007"
                  target="_blank"
                  rel="noreferrer"
                  className="hud-action-btn outline large"
                  onMouseEnter={() => sound.playHover()}
                  onClick={() => sound.playClick()}
                >
                  <GithubIcon /> GITHUB: Girinadh007
                </a>
                <a
                  href="https://linkedin.com/in/venkata-girinadh"
                  target="_blank"
                  rel="noreferrer"
                  className="hud-action-btn outline large"
                  onMouseEnter={() => sound.playHover()}
                  onClick={() => sound.playClick()}
                >
                  <LinkedinIcon /> LINKEDIN
                </a>
              </div>

              {/* Quick CLI launcher banner */}
              <div className="contact-cli-hint font-mono">
                <span>OR EXECUTE COMMAND VIA CLI:</span>
                <button
                  className="cli-launch-pill"
                  onClick={() => {
                    sound.playClick();
                    setShowTerminal(true);
                  }}
                  onMouseEnter={() => sound.playHover()}
                >
                  PRESS [`] OR CLICK HERE FOR SECURE SHELL &gt;_
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          HUD FOOTER & AUDIT SUMMARY
      ───────────────────────────────────────────────────────────── */}
      <footer className="hud-footer font-mono">
        <div className="hud-container footer-content-row">
          <div className="footer-left">
            <span className="footer-brand">[ GIRINADH.SYSTEMS // ARCHITECTURE ]</span>
            <span className="footer-audit">
              SYS.INTEGRITY: <strong className="green-text">PASSED (478 DAYS)</strong>
            </span>
          </div>
          <div className="footer-center">
            <span>© 2026 Venkata Girinadh Pedapudi. All rights reserved.</span>
          </div>
          <div className="footer-right">
            <a
              href="https://github.com/Girinadh007"
              target="_blank"
              rel="noreferrer"
              className="footer-social-link"
              title="GitHub"
              onMouseEnter={() => sound.playHover()}
            >
              <GithubIcon />
            </a>
            <a
              href="https://linkedin.com/in/venkata-girinadh"
              target="_blank"
              rel="noreferrer"
              className="footer-social-link"
              title="LinkedIn"
              onMouseEnter={() => sound.playHover()}
            >
              <LinkedinIcon />
            </a>
            <a
              href="mailto:pedapudigirinadh@gmail.com"
              className="footer-social-link"
              title="Email"
              onMouseEnter={() => sound.playHover()}
            >
              <MailIcon />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
