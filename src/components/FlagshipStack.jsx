import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sound } from '../utils/audio';

const LAYERS = [
  {
    id: 'l1',
    layerNum: 'L1',
    name: 'Top 100K Allowlist & Fast Path',
    category: 'PRE-FETCH LOOKUP',
    desc: 'High-speed local allowlist of top 100,000 trusted domains resolving in < 0.001ms. Bypasses machine learning inference for verified legitimate domains with zero latency and zero privacy leakage.',
    metrics: [
      { label: 'Domain Capacity', val: '100,000 Entries' },
      { label: 'Lookup Speed', val: '< 0.001 ms' },
      { label: 'Cache Hit Ratio', val: '92.4%' },
      { label: 'Privacy Protocol', val: '100% In-Memory' },
    ],
    codeSnippet: `// O(1) Local In-Memory Set Lookup
const isTrustedDomain = (hostname) => {
  if (LOCAL_ALLOWLIST.has(hostname)) {
    return { verdict: 'SAFE', latency: '< 0.001ms' };
  }
  return dispatchToLexicalEngine(hostname);
};`,
  },
  {
    id: 'l2',
    layerNum: 'L2',
    name: '27-Signal Lexical & Entropy Engine',
    category: 'FEATURE ENGINEERING',
    desc: 'Extracts 27 granular syntactic, structural, and informational entropy signals from raw URLs in microseconds without network lookups. Evaluates Shannon entropy of URL and path, subdomain tunneling depth, token keywords, high-risk TLDs, and punycode spoofing.',
    metrics: [
      { label: 'Extracted Features', val: '27 Granular Signals' },
      { label: 'Extraction Time', val: '0.012 ms' },
      { label: 'Shannon Entropy', val: 'URL + Path Scanned' },
      { label: 'Network Calls', val: '0 (Zero Remote APIs)' },
    ],
    codeSnippet: `def extract_27_features(raw_url: str) -> np.ndarray:
    url_entropy = shannon_entropy(raw_url)
    path_entropy = shannon_entropy(urlparse(raw_url).path)
    subdomains = len(extract(raw_url).subdomain.split('.'))
    has_ip = 1 if re.match(IPV4_REGEX, raw_url) else 0
    suspicious_tld = 1 if get_tld(raw_url) in HIGH_RISK_TLDS else 0
    token_score = scan_credential_tokens(raw_url)
    return np.array([url_entropy, path_entropy, subdomains, has_ip, suspicious_tld, token_score, ...])`,
  },
  {
    id: 'l3',
    layerNum: 'L3',
    name: 'Random Forest In-Browser Classifier',
    category: 'LOCAL ML INFERENCE',
    desc: 'Optimized Random Forest ensemble model evaluated natively in pure JavaScript inside the browser service worker. Trained on 450,177 verified URLs (382,650 train / 67,527 test) achieving 99.20% accuracy and 99.87% precision with ~0.0038ms execution speed.',
    metrics: [
      { label: 'Model Accuracy', val: '99.20%' },
      { label: 'Precision', val: '99.87%' },
      { label: 'Benchmark Dataset', val: '450,177 URLs' },
      { label: 'Pure JS Latency', val: '~0.0038 ms' },
    ],
    codeSnippet: `// Pure JavaScript in-service-worker tree traversal
class RandomForestClassifier {
  predictProbability(features) {
    let votes = 0;
    for (let i = 0; i < this.trees.length; i++) {
      votes += evaluateTree(this.trees[i], features);
    }
    return votes / this.trees.length; // Risk probability [0.0 - 1.0]
  }
}`,
  },
  {
    id: 'l4',
    layerNum: 'L4',
    name: 'Manifest V3 Service Worker Shield',
    category: 'CLIENT RUNTIME',
    desc: 'Lightweight Chromium background service worker utilizing Declarative NetRequest. Intercepts web navigation requests before DOM rendering, evaluating suspicious unlisted URLs in < 0.05ms to halt malicious navigation before payloads execute.',
    metrics: [
      { label: 'Architecture', val: 'Manifest V3 Service Worker' },
      { label: 'Browser Support', val: 'Chrome, Edge, Brave, Opera' },
      { label: 'DOM Overhead', val: '0.00 ms (Pre-Render)' },
      { label: 'Telemetry Policy', val: 'Zero Cloud Logging' },
    ],
    codeSnippet: `chrome.webNavigation.onBeforeNavigate.addListener(async (details) => {
  if (details.frameId !== 0) return;
  const isSafe = await PhishGuardCore.scanTarget(details.url);
  if (!isSafe) {
    chrome.tabs.update(details.tabId, {
      url: chrome.runtime.getURL('blocked.html?target=' + encodeURIComponent(details.url))
    });
  }
});`,
  },
  {
    id: 'l5',
    layerNum: 'L5',
    name: 'Threat Warning HUD & Dashboard',
    category: 'SECURITY INTERFACE',
    desc: 'High-contrast glassmorphism defense interface. Features blocked.html with an interactive Threat Severity Meter, automated danger breakdown, and Shannon entropy analyzer, paired with dashboard.html for real-time URL inspection and custom whitelist overrides.',
    metrics: [
      { label: 'Warning UI', val: 'Glassmorphism HUD' },
      { label: 'Threat Meter', val: 'Low / Suspicious / Critical' },
      { label: 'URL Inspector', val: 'Client-Side Real-Time' },
      { label: 'Whitelist Control', val: 'Local Storage Sync' },
    ],
    codeSnippet: `export function ThreatHudWarning({ riskScore, detectedTokens, entropyVal }) {
  const severity = riskScore >= 0.75 ? 'CRITICAL' : (riskScore >= 0.5 ? 'SUSPICIOUS' : 'SAFE');
  return (
    <div className="threat-modal">
      <div className="threat-severity-badge font-mono">{severity} // {riskScore.toFixed(3)}</div>
      <p className="entropy-stat">Entropy Index: {entropyVal} bits</p>
      <div className="token-pills">{detectedTokens.map(t => <span key={t}>{t}</span>)}</div>
    </div>
  );
}`,
  },
];

export default function FlagshipStack() {
  const [activeLayer, setActiveLayer] = useState(LAYERS[2]); // Default to L3 ML Core

  const handleSelect = (layer) => {
    sound.playSwitch();
    setActiveLayer(layer);
  };

  return (
    <div className="flagship-container">
      {/* Primary Flagship Showcase */}
      <div className="hud-card flagship-hero-box">
        <div className="card-corner-bracket tl"></div>
        <div className="card-corner-bracket tr"></div>
        <div className="card-corner-bracket bl"></div>
        <div className="card-corner-bracket br"></div>

        <div className="flagship-header-row">
          <div className="flagship-title-group">
            <div className="hud-badge-row">
              <span className="badge-tag red-glow font-mono">CORE FLAGSHIP DEPLOYMENT</span>
              <span className="badge-meta font-mono">ID: PHISHGUARD // MV3</span>
              <span className="badge-meta font-mono">STATUS: 100% LOCAL INFERENCE</span>
            </div>
            <h3 className="flagship-headline">
              PhishGuard — Privacy-Preserving In-Browser Phishing Detection
            </h3>
            <p className="flagship-subline">
              A high-performance, privacy-first Chromium extension that detects and intercepts phishing attacks 100% client-side in real time. Runs an optimized Random Forest ensemble natively within the browser service worker with zero cloud telemetry and microsecond execution.
            </p>
          </div>
          <div className="flagship-links-group">
            <a
              href="https://girinadh007.github.io/PG_WEB/"
              target="_blank"
              rel="noreferrer"
              className="hud-action-btn primary"
              onMouseEnter={() => sound.playHover()}
              onClick={() => sound.playClick()}
            >
              LAUNCH PG_WEB ↗
            </a>
            <a
              href="https://github.com/Girinadh007/PhishGuard"
              target="_blank"
              rel="noreferrer"
              className="hud-action-btn outline"
              onMouseEnter={() => sound.playHover()}
              onClick={() => sound.playClick()}
            >
              GITHUB REPO ↗
            </a>
          </div>
        </div>

        {/* Flagship Stat Badges (Accurately reflecting latest GitHub benchmarks) */}
        <div className="flagship-telemetry-strip">
          <div className="telemetry-cell">
            <span className="cell-num red-text font-mono">99.20%</span>
            <span className="cell-desc">MODEL ACCURACY</span>
          </div>
          <div className="cell-divider"></div>
          <div className="telemetry-cell">
            <span className="cell-num cyan-text font-mono">99.87%</span>
            <span className="cell-desc">PRECISION SCORE</span>
          </div>
          <div className="cell-divider"></div>
          <div className="telemetry-cell">
            <span className="cell-num font-mono">450K+</span>
            <span className="cell-desc">DATASET URLS</span>
          </div>
          <div className="cell-divider"></div>
          <div className="telemetry-cell">
            <span className="cell-num green-text font-mono">&lt; 0.05ms</span>
            <span className="cell-desc">INFERENCE SPEED</span>
          </div>
          <div className="cell-divider"></div>
          <div className="telemetry-cell">
            <span className="cell-num font-mono">0 CLOUD</span>
            <span className="cell-desc">ZERO TELEMETRY</span>
          </div>
        </div>

        {/* Interactive 5-Layer Stack Selector */}
        <div className="stack-tabs-container">
          <div className="stack-tabs-label font-mono">
            // 5-LAYER CONSTITUTIONAL STACK ARCHITECTURE:
          </div>
          <div className="stack-tabs-grid">
            {LAYERS.map((layer) => {
              const isActive = activeLayer.id === layer.id;
              return (
                <button
                  key={layer.id}
                  className={`stack-tab-btn ${isActive ? 'active-layer' : ''}`}
                  onClick={() => handleSelect(layer)}
                  onMouseEnter={() => sound.playHover()}
                >
                  <span className="tab-num font-mono">{layer.layerNum}</span>
                  <span className="tab-name">{layer.name}</span>
                  {isActive && <div className="tab-active-line"></div>}
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Layer Deep Dive Panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeLayer.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="layer-detail-panel"
          >
            <div className="layer-detail-grid">
              <div className="layer-info-column">
                <div className="layer-meta-tag font-mono">
                  <span className="red-tag">{activeLayer.layerNum}</span>
                  <span className="tag-bracket">//</span>
                  <span className="cyan-tag">{activeLayer.category}</span>
                </div>
                <h4 className="layer-title">{activeLayer.name}</h4>
                <p className="layer-desc">{activeLayer.desc}</p>

                <div className="layer-metrics-grid">
                  {activeLayer.metrics.map((m) => (
                    <div key={m.label} className="metric-chip">
                      <span className="metric-chip-label font-mono">{m.label}</span>
                      <span className="metric-chip-val font-mono">{m.val}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="layer-code-column">
                <div className="code-header">
                  <span className="code-lang font-mono">RUNTIME_SPEC // EXECUTION TRACE</span>
                  <span className="code-badge font-mono">IN-BROWSER PURE JS</span>
                </div>
                <pre className="code-block font-mono">
                  <code>{activeLayer.codeSnippet}</code>
                </pre>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Secondary Flagship Cards */}
      <div className="secondary-flagships-grid">
        {/* Card 1: EMS - Event Management System */}
        <div className="hud-card secondary-card">
          <div className="card-corner-bracket tl"></div>
          <div className="card-corner-bracket tr"></div>
          <div className="card-corner-bracket bl"></div>
          <div className="card-corner-bracket br"></div>
          <div className="card-top-meta font-mono">
            <span className="badge-tag red-glow">CAMPUS EVENT ENGINE</span>
            <span className="stars-tag">★ 10 STARS</span>
          </div>
          <h4 className="secondary-title">EMS — Event Management System</h4>
          <p className="secondary-desc">
            Full-stack real-time Event Management System for college campus events. Powers multi-step event discovery, team registrations, payment proof verification via ImageBB, digital QR-code ticket generation, and a built-in QR ticket scanner for instant attendance tracking.
          </p>
          <div className="card-tech-pills">
            <span>React</span>
            <span>TypeScript</span>
            <span>Supabase</span>
            <span>Render</span>
            <span>QR Scanner</span>
          </div>
          <div className="card-footer-action-row">
            <a
              href="https://ems-rmwn.onrender.com/"
              target="_blank"
              rel="noreferrer"
              className="hud-link font-mono"
              onMouseEnter={() => sound.playHover()}
              onClick={() => sound.playClick()}
            >
              LIVE DEMO ↗
            </a>
            <span className="link-divider font-mono">/</span>
            <a
              href="https://github.com/Girinadh007/EMS"
              target="_blank"
              rel="noreferrer"
              className="hud-link font-mono"
              onMouseEnter={() => sound.playHover()}
              onClick={() => sound.playClick()}
            >
              REPOSITORY ↗
            </a>
          </div>
        </div>

        {/* Card 2: Digital Forensics Tools Documentation */}
        <div className="hud-card secondary-card">
          <div className="card-corner-bracket tl"></div>
          <div className="card-corner-bracket tr"></div>
          <div className="card-corner-bracket bl"></div>
          <div className="card-corner-bracket br"></div>
          <div className="card-top-meta font-mono">
            <span className="badge-tag cyan-glow">SECURITY REPOSITORY</span>
            <span className="stars-tag">★ 56 STARS</span>
          </div>
          <h4 className="secondary-title">Digital Forensics Knowledge Vault</h4>
          <p className="secondary-desc">
            Step-by-step guides, command references, and investigation workflows for 10+ industry forensic tools (Volatility, Wireshark, TestDisk, Autopsy, Sleuth Kit). Serves as an open learning and reference hub for forensic researchers and cyber investigators.
          </p>
          <div className="card-tech-pills">
            <span>Digital Forensics</span>
            <span>Volatility</span>
            <span>Wireshark</span>
            <span>TestDisk</span>
            <span>Autopsy</span>
          </div>
          <div className="card-footer-action-row">
            <a
              href="https://github.com/Girinadh007/Digital-Forensics-Tools"
              target="_blank"
              rel="noreferrer"
              className="hud-link font-mono"
              onMouseEnter={() => sound.playHover()}
              onClick={() => sound.playClick()}
            >
              REPOSITORY: Digital-Forensics-Tools ↗
            </a>
          </div>
        </div>

        {/* Card 3: EvalPro - Evaluation Hub Pro */}
        <div className="hud-card secondary-card">
          <div className="card-corner-bracket tl"></div>
          <div className="card-corner-bracket tr"></div>
          <div className="card-corner-bracket bl"></div>
          <div className="card-corner-bracket br"></div>
          <div className="card-top-meta font-mono">
            <span className="badge-tag green-glow">ACADEMIC & HACKATHON EVALUATION</span>
            <span className="stars-tag">★ 2 STARS</span>
          </div>
          <h4 className="secondary-title">EvalPro — Evaluation Hub Pro</h4>
          <p className="secondary-desc">
            High-performance glassmorphism grading platform for hackathons, project presentations, and academic reviews. Features bulk student import via .xlsx with smart Fill-Down logic, multi-session weighted criteria, reviewer persistence, and consolidated exports.
          </p>
          <div className="card-tech-pills">
            <span>React</span>
            <span>TypeScript</span>
            <span>Supabase</span>
            <span>Framer Motion</span>
            <span>Excel Engine</span>
          </div>
          <div className="card-footer-action-row">
            <a
              href="https://github.com/Girinadh007/EvalPro"
              target="_blank"
              rel="noreferrer"
              className="hud-link font-mono"
              onMouseEnter={() => sound.playHover()}
              onClick={() => sound.playClick()}
            >
              REPOSITORY: Girinadh007/EvalPro ↗
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
