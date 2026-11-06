import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHover, setIsHover] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on fine pointer devices (desktop)
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const handleMouseMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('clickable')
      ) {
        setIsHover(true);
      } else {
        setIsHover(false);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="custom-hud-cursor-wrapper" style={{ pointerEvents: 'none' }}>
      {/* Central Crosshair Dot */}
      <motion.div
        className="hud-cursor-dot"
        animate={{
          x: pos.x - 3,
          y: pos.y - 3,
          scale: isHover ? 1.5 : 1,
        }}
        transition={{ type: 'tween', ease: 'linear', duration: 0 }}
      />

      {/* Trailing Reticle Box */}
      <motion.div
        className={`hud-cursor-box ${isHover ? 'hovering' : ''}`}
        animate={{
          x: pos.x - (isHover ? 20 : 14),
          y: pos.y - (isHover ? 20 : 14),
          width: isHover ? 40 : 28,
          height: isHover ? 40 : 28,
          rotate: isHover ? 45 : 0,
        }}
        transition={{ type: 'spring', stiffness: 280, damping: 22, mass: 0.4 }}
      >
        <span className="reticle-corner tl">+</span>
        <span className="reticle-corner tr">+</span>
        <span className="reticle-corner bl">+</span>
        <span className="reticle-corner br">+</span>
      </motion.div>
    </div>
  );
}
