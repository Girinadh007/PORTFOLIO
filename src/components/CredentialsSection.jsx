import { useState } from 'react';
import { sound } from '../utils/audio';

const EDUCATION_LOGS = [
  {
    level: 'UNDERGRADUATE // B.TECH',
    degree: 'B.Tech in Computer Science & Engineering',
    institution: 'Kalasalingam Academy of Research and Education (KARE)',
    period: '2023 – 2027',
    location: 'Krishnan Koil, TN',
    stats: 'CGPA: 8.77 // RANK: 3RD ACADEMIC',
    highlights: 'Vice President of KAREOSS, Focus: Cybersecurity, Systems Architecture & Distributed Systems.',
  },
  {
    level: 'HIGHER SECONDARY // +2',
    degree: 'Higher Secondary Education (12th Standard)',
    institution: 'Narayana Junior College',
    period: '2021 – 2023',
    location: 'Guntur, AP',
    stats: 'PERCENTAGE: 89 / 100',
    highlights: 'Mathematics, Physics, Chemistry focus with rigorous foundational analytical training.',
  },
  {
    level: 'SECONDARY SCHOOL // SSC',
    degree: 'Secondary School Certificate (10th Standard)',
    institution: 'Siddhartha High School',
    period: '2020 – 2021',
    location: 'Guntur, AP',
    stats: 'GPA: 10.0 / 10.0 (PERFECT SCORE)',
    highlights: 'Academic excellence with top institutional standing.',
  },
];

const CERTIFICATIONS_LIST = [
  {
    name: 'Oracle Certified Foundations Associate',
    issuer: 'Oracle University',
    code: '1Z0-082 // ORCL-VERIFIED',
    type: 'Cloud & Database Foundations',
    status: 'ACTIVE',
  },
  {
    name: 'SoftSkills Professional Certification',
    issuer: 'NPTEL (National Programme on Technology Enhanced Learning)',
    code: 'NPTEL-IIT-ONLINE',
    type: 'Leadership & Technical Communication',
    status: 'VERIFIED',
  },
  {
    name: 'Design and Analysis of Algorithms',
    issuer: 'CodeChef Algorithmic Division',
    code: 'CC-ALGO-2024',
    type: 'Data Structures, Graph Theory & DP',
    status: 'COMPLETED',
  },
  {
    name: 'SQL Specialist & Relational Modeling',
    issuer: 'CodeChef Database Assessment',
    code: 'CC-SQL-DATA',
    type: 'Complex Queries, Indexing & Normalization',
    status: 'VERIFIED',
  },
];

const HONORS_LIST = [
  {
    title: 'Secured 3rd Rank in Academics',
    org: 'Kalasalingam Academy of Research and Education',
    desc: 'Awarded for exceptional academic performance and technical consistency across CS curriculum.',
  },
  {
    title: 'Vice President — KARE Open Source Society (KAREOSS)',
    org: 'Student Body Executive Board',
    desc: 'Spearheaded campus-wide open source initiatives, hackathons, and technical bootcamps for 500+ student developers.',
  },
  {
    title: 'Visa AI Hackathon Finalist — Team LuFfY',
    org: 'IIT Madras, Chennai',
    desc: 'Represented KARE at IIT Madras, designing machine learning and software systems to enhance Visa card transaction security.',
  },
  {
    title: 'Hackathon & Workshop Operations Director',
    org: 'KAREOSS Operations',
    desc: 'Directed co-curricular technical seminars, live coding sessions, and cybersecurity defense workshops.',
  },
];

export default function CredentialsSection() {
  const [activeTab, setActiveTab] = useState('education');

  return (
    <div className="credentials-wrapper">
      {/* Tab Switcher */}
      <div className="cred-tabs-bar">
        <button
          className={`cred-tab-btn font-mono ${activeTab === 'education' ? 'cred-tab-active' : ''}`}
          onClick={() => {
            sound.playClick();
            setActiveTab('education');
          }}
          onMouseEnter={() => sound.playHover()}
        >
          [ 01 // ACADEMIC TIMELINE ]
        </button>
        <button
          className={`cred-tab-btn font-mono ${activeTab === 'certifications' ? 'cred-tab-active' : ''}`}
          onClick={() => {
            sound.playClick();
            setActiveTab('certifications');
          }}
          onMouseEnter={() => sound.playHover()}
        >
          [ 02 // VERIFIED CERTIFICATIONS ]
        </button>
        <button
          className={`cred-tab-btn font-mono ${activeTab === 'honors' ? 'cred-tab-active' : ''}`}
          onClick={() => {
            sound.playClick();
            setActiveTab('honors');
          }}
          onMouseEnter={() => sound.playHover()}
        >
          [ 03 // LEADERSHIP & HONORS ]
        </button>
      </div>

      {/* Tab 1: Education */}
      {activeTab === 'education' && (
        <div className="timeline-hud-container">
          {EDUCATION_LOGS.map((edu, idx) => (
            <div key={edu.level} className="timeline-hud-node">
              <div className="timeline-hud-axis">
                <div className="timeline-hud-dot"></div>
                {idx < EDUCATION_LOGS.length - 1 && <div className="timeline-hud-line"></div>}
              </div>
              <div className="hud-card timeline-card">
                <div className="card-corner-bracket tl"></div>
                <div className="card-corner-bracket tr"></div>
                <div className="card-corner-bracket bl"></div>
                <div className="card-corner-bracket br"></div>

                <div className="timeline-card-header font-mono">
                  <span className="badge-tag red-glow">{edu.level}</span>
                  <span className="timeline-period-badge">{edu.period}</span>
                </div>
                <h4 className="timeline-degree-title">{edu.degree}</h4>
                <div className="timeline-inst-row font-mono">
                  <span className="inst-name">{edu.institution}</span>
                  <span className="inst-loc">📍 {edu.location}</span>
                </div>
                <div className="timeline-stats-banner font-mono">
                  <span className="stats-prefix">// AUDIT RESULT:</span>
                  <strong className="stats-highlight cyan-text">{edu.stats}</strong>
                </div>
                <p className="timeline-highlights">{edu.highlights}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 2: Certifications */}
      {activeTab === 'certifications' && (
        <div className="certs-grid">
          {CERTIFICATIONS_LIST.map((cert) => (
            <div key={cert.name} className="hud-card cert-card">
              <div className="card-corner-bracket tl"></div>
              <div className="card-corner-bracket tr"></div>
              <div className="card-corner-bracket bl"></div>
              <div className="card-corner-bracket br"></div>

              <div className="cert-top font-mono">
                <span className="cert-code">{cert.code}</span>
                <span className="status-pill verified">● {cert.status}</span>
              </div>
              <h4 className="cert-title">{cert.name}</h4>
              <div className="cert-issuer font-mono">// ISSUED BY: {cert.issuer}</div>
              <div className="cert-type-tag font-mono">{cert.type}</div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 3: Honors */}
      {activeTab === 'honors' && (
        <div className="honors-grid">
          {HONORS_LIST.map((honor) => (
            <div key={honor.title} className="hud-card honor-card">
              <div className="card-corner-bracket tl"></div>
              <div className="card-corner-bracket tr"></div>
              <div className="card-corner-bracket bl"></div>
              <div className="card-corner-bracket br"></div>

              <div className="honor-header font-mono">
                <span className="badge-tag red-glow">OFFICIAL MERIT</span>
                <span className="honor-icon">◆</span>
              </div>
              <h4 className="honor-title">{honor.title}</h4>
              <div className="honor-org font-mono">// {honor.org}</div>
              <p className="honor-desc">{honor.desc}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

