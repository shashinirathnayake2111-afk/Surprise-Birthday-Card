import React from 'react';
import { motion } from 'framer-motion';

const Sparkles = () => {
  const sparkles = Array.from({ length: 40 });

  return (
    <div className="sparkles-container">
      {sparkles.map((_, i) => (
        <motion.div
          key={i}
          className="sparkle"
          initial={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            opacity: 0,
            scale: 0
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 2 + 1,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeInOut"
          }}
          style={{
            position: 'absolute',
            width: `${Math.random() * 4 + 2}px`,
            height: `${Math.random() * 4 + 2}px`,
            backgroundColor: Math.random() > 0.5 ? '#FFD700' : '#FFFFFF',
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
