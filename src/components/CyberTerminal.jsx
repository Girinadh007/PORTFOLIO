import { useState, useRef, useEffect } from 'react';
import { sound } from '../utils/audio';

export default function CyberTerminal({ isOpen, onClose }) {
  const [history, setHistory] = useState([
    { type: 'sys', text: 'SOVEREIGN SYSTEM KERNEL CLI v4.19.0-VG' },
    { type: 'sys', text: 'Type "help" to display available diagnostic commands.' },
  ]);
  const [inputVal, setInputVal] = useState('');
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (e) => {
    if (e.key !== 'Enter') return;
    const cmd = inputVal.trim().toLowerCase();
    if (!cmd) return;

    sound.playClick();
    const newHistory = [...history, { type: 'user', text: `root@girinadh:~$ ${inputVal}` }];

    switch (cmd) {
      case 'help':
        newHistory.push({
          type: 'output',
          text: `AVAILABLE PROTOCOLS:
  whoami     - Display executive operator profile
  skills     - Inspect security & engineering capability matrix
  flagships  - Query PhishGuard, EMS & Forensics deployments with latest metrics
  contact    - Retrieve direct transmission channels (Email, Tel, Social)
  audit      - Run automated kernel & threat heuristic diagnostic
  clear      - Purge CLI scrollback buffer
  exit       - Close terminal interface`,
        });
        break;

      case 'whoami':
        newHistory.push({
          type: 'output',
          text: `OPERATOR: Venkata Girinadh Pedapudi
ROLE: Cybersecurity Researcher & Full-Stack System Architect
ACADEMIC: B.Tech CSE at KARE (CGPA: 8.77, 3rd Academic Rank)
LEADERSHIP: Vice President — KARE Open Source Society
LOCATION: India / Available Globally`,
        });
        break;

      case 'skills':
        newHistory.push({
          type: 'output',
          text: `CAPABILITY SPECTRUM:
  [SECURITY]  : 100% In-Browser ML Detection, Digital Forensics, Wireshark, Volatility, Metasploit
  [LANGUAGES] : Python, TypeScript, JavaScript, Java, Bash, SQL, C
  [FRONTEND]  : React 19, Vite, Framer Motion, Chrome Extension Manifest V3
  [BACKEND]   : Supabase, Node.js, PostgreSQL, Render, REST APIs
  [CORE]      : Shannon Entropy Analysis, OS Internals, DBMS, Algorithm Optimization`,
        });
        break;

      case 'flagships':
        newHistory.push({
          type: 'output',
          text: `PRODUCTION BUILDS & VERIFIED BENCHMARKS:
  1. PhishGuard (99.20% Accuracy, 99.87% Precision, 450,177 URL Dataset, 0 Cloud Calls)
  2. EMS - Event Management System (React + TypeScript + Supabase + QR Scanner, Live on Render)
  3. Digital Forensics Knowledge Vault (56 GitHub Stars, 10+ Toolkits Documented)
  4. EvalPro - Evaluation Hub Pro (Hackathon & Academic Review Grading Engine)
  5. Password Entropy Analyzer (6 Stars) & Key Logger (6 Stars)`,
        });
        break;

      case 'contact':
        newHistory.push({
          type: 'output',
          text: `TRANSMISSION CHANNELS:
  EMAIL    : pedapudigirinadh@gmail.com
  PHONE    : +91 9381738379
  GITHUB   : https://github.com/Girinadh007
  LINKEDIN : https://linkedin.com/in/venkata-girinadh
  PORTAL   : https://girinadh007.github.io/PG_WEB/`,
        });
        break;

      case 'audit':
        newHistory.push({
          type: 'output',
          text: `[DIAGNOSTIC RUNNING]
  [+] CPU Registers: PASS
  [+] ML Inference Latency: ~0.0038ms (PURE JS SERVICE WORKER)
  [+] PhishGuard Model Accuracy: 99.20% (PRECISION: 99.87%)
  [+] Top 100K Allowlist Lookup: < 0.001ms (OPTIMAL)
  [+] DOM Pre-Render Shield: ZERO OVERHEAD
  ==> SYSTEM INTEGRITY: 100% VERIFIED & SECURE`,
        });
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      case 'exit':
        onClose();
        return;

      default:
        newHistory.push({
          type: 'error',
          text: `Command not recognized: "${cmd}". Type "help" for a list of valid commands.`,
        });
        break;
    }

    setHistory(newHistory);
    setInputVal('');
  };

  if (!isOpen) return null;

  return (
    <div className="terminal-modal-backdrop" onClick={onClose}>
      <div className="terminal-window hud-card" onClick={(e) => e.stopPropagation()}>
        <div className="card-corner-bracket tl"></div>
        <div className="card-corner-bracket tr"></div>
        <div className="card-corner-bracket bl"></div>
        <div className="card-corner-bracket br"></div>

        {/* Terminal Title Bar */}
        <div className="terminal-bar font-mono">
          <div className="bar-title">
            <span className="dot red-pulse">●</span>
            <span>CLI_EXEC // SECURE_SHELL (AES-256)</span>
          </div>
          <div className="bar-actions">
            <span className="terminal-hint">Press ESC to exit</span>
            <button className="terminal-close-btn" onClick={onClose}>
              [✕]
            </button>
          </div>
        </div>

        {/* Output area */}
        <div className="terminal-body font-mono">
          {history.map((line, idx) => (
            <div key={idx} className={`term-line term-${line.type}`}>
              {line.text}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Command Input */}
        <div className="terminal-input-row font-mono">
          <span className="prompt-label">root@girinadh:~$</span>
          <input
            ref={inputRef}
            type="text"
            className="terminal-input font-mono"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleCommand}
            placeholder="Type 'help' or any command..."
            autoFocus
          />
        </div>
      </div>
    </div>
  );
}
