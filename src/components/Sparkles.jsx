import { useMemo } from 'react';
import { motion } from 'framer-motion';

const Sparkles = () => {
  const sparkles = useMemo(() => Array.from({ length: 40 }).map(() => ({
    top: Math.random() * 100,
    left: Math.random() * 100,
    duration: Math.random() * 2 + 1,
    delay: Math.random() * 5,
    size: Math.random() * 4 + 2,
    isGold: Math.random() > 0.5
  })), []);

  return (
    <div className="sparkles-container">
      {sparkles.map((s, i) => (
        <motion.div
          key={i}
          className="sparkle"
          initial={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            opacity: 0,
            scale: 0
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: s.duration,
            repeat: Infinity,
            delay: s.delay,
            ease: "easeInOut"
          }}
          style={{
            position: 'absolute',
            width: `${s.size}px`,
            height: `${s.size}px`,
            backgroundColor: s.isGold ? '#FFD700' : '#FFFFFF',
            borderRadius: '50%',
            boxShadow: '0 0 10px rgba(255, 215, 0, 0.8)',
          }}
        />
      ))}
      <style>{`
        .sparkles-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 0;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default Sparkles;
