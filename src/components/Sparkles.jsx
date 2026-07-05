import { useMemo, useEffect, useRef } from 'react';

// CSS-only sparkles — zero JS animation overhead, no framer-motion
const Sparkles = () => {
  const canvasRef = useRef(null);
  const animRef = useRef(null);

  const sparkles = useMemo(() => Array.from({ length: 25 }).map(() => ({
    top: Math.random() * 100,
    left: Math.random() * 100,
    duration: (Math.random() * 2 + 2).toFixed(2),
    delay: (Math.random() * 5).toFixed(2),
    size: Math.floor(Math.random() * 3 + 2),
    isGold: Math.random() > 0.5
  })), []);

  return (
    <>
      <style>{`
        .sparkles-container {
          position: fixed;
          top: 0; left: 0;
          width: 100%; height: 100%;
          pointer-events: none;
          z-index: 0;
          overflow: hidden;
          will-change: auto;
        }
        .sparkle-dot {
          position: absolute;
          border-radius: 50%;
          animation: sparkle-fade var(--dur) var(--delay) infinite ease-in-out;
          will-change: opacity, transform;
        }
        @keyframes sparkle-fade {
          0%, 100% { opacity: 0; transform: scale(0); }
          50%       { opacity: 1; transform: scale(1); }
        }
        @media (max-width: 600px) {
          .sparkle-dot:nth-child(n+16) { display: none; }
        }
      `}</style>
      <div className="sparkles-container">
        {sparkles.map((s, i) => (
          <div
            key={i}
            className="sparkle-dot"
            style={{
              top: `${s.top}%`,
              left: `${s.left}%`,
              width: `${s.size}px`,
              height: `${s.size}px`,
              backgroundColor: s.isGold ? '#FFD700' : '#FFFFFF',
              boxShadow: `0 0 6px ${s.isGold ? 'rgba(255,215,0,0.8)' : 'rgba(255,255,255,0.6)'}`,
              '--dur': `${s.duration}s`,
              '--delay': `${s.delay}s`,
            }}
          />
        ))}
      </div>
    </>
  );
};

export default Sparkles;
