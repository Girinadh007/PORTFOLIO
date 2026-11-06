import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sound } from '../utils/audio';

export default function BootSequence({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const canvasRef = useRef(null);

  // Orbiting particles on loading screen
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let frameId;
    const count = 18;
    let angle = 0;

    const render = () => {
      ctx.clearRect(0, 0, 300, 300);
      const cx = 150;
      const cy = 150;
      const r = 55;

      angle += 0.035;

      for (let i = 0; i < count; i++) {
        const theta = angle + (i * Math.PI * 2) / count;
        const px = cx + Math.cos(theta) * (r + Math.sin(angle * 2 + i) * 8);
        const py = cy + Math.sin(theta) * (r + Math.sin(angle * 2 + i) * 8);

        ctx.save();
        ctx.translate(px, py);
        ctx.rotate(theta + Math.PI / 2);

        ctx.fillStyle = i % 3 === 0 ? '#ff3344' : '#00f0ff';
        ctx.shadowColor = ctx.fillStyle;
        ctx.shadowBlur = 6;
        ctx.globalAlpha = 0.8;

        ctx.beginPath();
        ctx.moveTo(5, 0);
        ctx.lineTo(-4, -3);
        ctx.lineTo(-2, 0);
        ctx.lineTo(-4, 3);
        ctx.closePath();
        ctx.fill();

        ctx.restore();
      }

      frameId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(frameId);
  }, []);

  // Loading timer & stage progression
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const step = Math.floor(Math.random() * 8) + 4;
        const next = Math.min(prev + step, 100);
        if (next > 25 && next < 55) setStage(1);
        else if (next >= 55 && next < 85) setStage(2);
        else if (next >= 85) setStage(3);
        return next;
      });
    }, 90);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      sound.playBoot();
      const timeout = setTimeout(() => {
        setIsDone(true);
        setTimeout(onComplete, 600);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [progress, onComplete]);

  const handleSkip = () => {
    sound.playConfirm();
    setIsDone(true);
    setTimeout(onComplete, 200);
  };

  const logs = [
    'INITIALIZING SYSTEM KERNEL v4.19-SEC...',
    'SYNCHRONIZING THREAT INTELLIGENCE HEURISTICS...',
    'ALLOCATING REAL-TIME INFERENCE BUFFERS...',
    'SOVEREIGN OPERATOR IDENTITY VERIFIED // ACCESS GRANTED',
  ];

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          className="boot-overlay"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Wireframe Bounding Grid Boxes */}
          <div className="boot-grid-markers">
            <motion.div
              className="hud-wirebox pos-tl"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: stage >= 1 ? 1 : 0.2, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <span className="wire-label">POS 01 // [LAT: 47.60 // LONG: 122.33]</span>
              <div className="wire-bracket wire-tl"></div>
              <div className="wire-bracket wire-tr"></div>
              <div className="wire-bracket wire-bl"></div>
              <div className="wire-bracket wire-br"></div>
            </motion.div>

            <motion.div
              className="hud-wirebox pos-tr"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: stage >= 2 ? 1 : 0.2, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <span className="wire-label">SYSTEM_CORE: ONLINE // 24/7 ACTIVE</span>
              <div className="wire-bracket wire-tl"></div>
              <div className="wire-bracket wire-tr"></div>
              <div className="wire-bracket wire-bl"></div>
              <div className="wire-bracket wire-br"></div>
            </motion.div>

            <motion.div
              className="hud-wirebox pos-bl"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: stage >= 1 ? 1 : 0.2, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <span className="wire-label">MEM_STACK // ALLOC: 1024MB HEAP</span>
              <div className="wire-bracket wire-tl"></div>
              <div className="wire-bracket wire-tr"></div>
              <div className="wire-bracket wire-bl"></div>
              <div className="wire-bracket wire-br"></div>
            </motion.div>

            <motion.div
              className="hud-wirebox pos-br"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: stage >= 3 ? 1 : 0.2, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <span className="wire-label">PORTFOLIO PROTOCOL // READY</span>
              <div className="wire-bracket wire-tl"></div>
              <div className="wire-bracket wire-tr"></div>
              <div className="wire-bracket wire-bl"></div>
              <div className="wire-bracket wire-br"></div>
            </motion.div>
          </div>

          {/* Center Circular Particle Node */}
          <div className="boot-center-node">
            <canvas ref={canvasRef} width={300} height={300} className="boot-orbit-canvas" />
            <div className="boot-center-glyph">
              <span className="glyph-icon">▲</span>
              <span className="glyph-code">{progress}%</span>
            </div>
          </div>

          {/* Progress readout & status */}
          <div className="boot-bottom-panel">
            <div className="boot-status-text">
              <span className="boot-prefix">// SYS_BOOT:</span> {logs[stage]}
            </div>
            <div className="boot-bar-track">
              <motion.div
                className="boot-bar-fill"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'easeOut' }}
              />
            </div>
            <div className="boot-action-row">
              <div className="boot-telemetry">
                <span>BUFFER: <strong>100%</strong></span>
                <span className="divider">/</span>
                <span>STATUS: <strong className="active-glow">CALIBRATING</strong></span>
                <span className="divider">/</span>
                <span>AUTH: <strong>VG-007</strong></span>
              </div>
              <button className="boot-skip-btn" onClick={handleSkip}>
                [ SKIP SEQUENCE ]
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

