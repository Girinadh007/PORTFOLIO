import { useState, useEffect } from 'react';

export default function HudNav({ activeSection, onToggleTerminal, onReplayBoot }) {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format 24-hr local time with seconds
      const timeStr = now.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      });
      // Detect timezone abbreviation
      let tzAbbr = 'IST';
      try {
        const parts = new Intl.DateTimeFormat('en-US', { timeZoneName: 'short' }).formatToParts(now);
        const tzPart = parts.find((p) => p.type === 'timeZoneName');
        if (tzPart && tzPart.value) {
          tzAbbr = tzPart.value;
        }
      } catch {
        tzAbbr = 'IST';
      }
      setTime(`${timeStr} ${tzAbbr}`);
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const navItems = [
    { id: 'hero', index: '00 //', label: 'INTRO' },
    { id: 'about', index: '01 //', label: 'ABOUT' },
    { id: 'flagships', index: '02 //', label: 'SYSTEMS' },
    { id: 'matrix', index: '03 //', label: 'MATRIX' },
    { id: 'credentials', index: '04 //', label: 'CREDENTIALS' },
    { id: 'contact', index: '05 //', label: 'TRANSMIT' },
  ];

  return (
    <header className="hud-nav-container">
      {/* Top Telemetry Ticker */}
      <div className="hud-ticker-bar">
        <div className="ticker-left">
          <span className="ticker-dot green-pulse">●</span>
          <span className="ticker-label">SYS_STATUS:</span>
          <span className="ticker-val">OPERATIONAL</span>
          <span className="ticker-sep">//</span>
          <span className="ticker-label">REGION:</span>
          <span className="ticker-val">IN / GLOBAL</span>
          <span className="ticker-sep">//</span>
          <span className="ticker-label">LOCAL CLOCK:</span>
          <span className="ticker-val font-mono">{time}</span>
        </div>
        <div className="ticker-right">
          <button
            className="ticker-btn"
            onClick={onReplayBoot}
            title="Re-run boot diagnostics"
          >
            [ REPLAY BOOT ]
          </button>
          <button
            className="ticker-btn"
            onClick={onToggleTerminal}
          >
            [ &gt;_ CLI ]
          </button>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className="hud-navbar">
        <div className="hud-brand">
          <a href="#hero" className="hud-brand-link">
            <span className="brand-bracket">[</span>
            <span className="brand-prefix">GIRINADH</span>
            <span className="brand-dot">.</span>
            <span className="brand-suffix">SYSTEMS</span>
            <span className="brand-bracket">]</span>
          </a>
          <div className="brand-badge-box font-mono">
            <span className="badge-line">SEC_OPS // 24/7</span>
          </div>
        </div>

        <ul className="hud-nav-links">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <li key={item.id} className="nav-item-stacked">
                <a
                  href={`#${item.id}`}
                  className={`hud-nav-link-stacked ${isActive ? 'active' : ''}`}
                >
                  <span className="nav-index font-mono">{item.index}</span>
                  <span className="nav-label font-mono">{item.label}</span>
                </a>
              </li>
            );
          })}
        </ul>

        <div className="hud-actions">
          <a
            href="#contact"
            className="hud-dispatch-btn-stacked"
          >
            <div className="dispatch-text-col font-mono">
              <span className="dispatch-top">INITIATE</span>
              <span className="dispatch-sub">DISPATCH <span className="arrow-glyph">▶</span></span>
            </div>
          </a>
        </div>
      </nav>
    </header>
  );
}
