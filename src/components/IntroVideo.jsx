import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const IntroVideo = ({ onEnd }) => {
  const [showBalloons, setShowBalloons] = useState(false);
  const [showAge, setShowAge] = useState(false);

  useEffect(() => {
    const balloonTimer = setTimeout(() => setShowBalloons(true), 3500);
    const ageTimer = setTimeout(() => setShowAge(true), 4000);
    const endTimer = setTimeout(() => onEnd(), 8500);
    return () => {
      clearTimeout(balloonTimer);
      clearTimeout(ageTimer);
      clearTimeout(endTimer);
    };
  }, [onEnd]);

  const balloons = Array.from({ length: 18 });

  return (
    <motion.div
      className="intro-3d-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.button
        className="skip-intro-btn"
        onClick={onEnd}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        whileHover={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        Skip to Card →
      </motion.button>
      <div className="scene-3d">
        <motion.div
          className="cake-3d-wrapper"
          initial={{ rotateY: 0, rotateX: 0, scale: 0.8, opacity: 0 }}
          animate={{ rotateY: [0, 5, -5, 0], rotateX: 15, scale: 1, opacity: 1 }}
          transition={{ duration: 2.5, ease: "easeOut" }}
        >
          {/* Cake Layers */}
          <div className="cake-body">
            <motion.div
              className="layer bottom"
              initial={{ height: 0 }}
              animate={{ height: 100 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              <div className="frosting gold-frosting"></div>
            </motion.div>
            <motion.div
              className="layer top"
              initial={{ height: 0 }}
              animate={{ height: 80 }}
              transition={{ delay: 1, duration: 1 }}
            >
              <div className="frosting gold-frosting"></div>
            </motion.div>
          </div>

          {/* Candles */}
          <div className="candles-container">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className={`candle c${i}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2 + i * 0.3 }}
              >
                <div className="wick"></div>
                <motion.div
                  className="flame"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: [1, 1.15, 1, 1.1, 1],
                    opacity: 1,
                    y: [0, -1, 0]
                  }}
                  transition={{
                    delay: 2.5 + i * 0.3,
                    duration: 0.3,
                    repeat: Infinity,
                    repeatType: "mirror"
                  }}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="intro-text-3d"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 4 }}
        >
          <h2 className="shimmer-text gold-text">Happy Birthday My Buddy💖✨</h2>
          <p>Cheers to our crazy friendship & endless adventures! 🍻🚀</p>
        </motion.div>

        <AnimatePresence>
          {showAge && (
            <motion.div
              className="foil-balloon-wrapper"
              initial={{ y: '100vh', opacity: 0 }}
              animate={{
                y: [-10, 10, -10],
                opacity: 1,
                rotate: [2, -2, 2]
              }}
              transition={{
                y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                opacity: { duration: 1 },
                rotate: { duration: 4, repeat: Infinity, ease: "easeInOut" }
              }}
            >
              <div className="foil-number">25</div>
              <div className="foil-string"></div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Crazy Balloons Surprise */}
      <AnimatePresence>
        {showBalloons && balloons.map((_, i) => (
          <motion.div
            key={i}
            className="balloon"
            initial={{ y: '100vh', x: `${Math.random() * 100}vw`, scale: 0.5 }}
            animate={{
              y: '-110vh',
              x: `${(Math.random() * 100)}vw`,
              rotate: [0, 10, -10, 0]
            }}
            transition={{
              duration: Math.random() * 4 + 5,
              ease: "easeOut",
              delay: Math.random() * 3
            }}
            style={{
              backgroundColor: ['#ff4d6d', '#ffd700', '#00f2ff', '#a020f0', '#ff85a1'][Math.floor(Math.random() * 5)],
              width: `${Math.random() * 60 + 80}px`,
              height: `${Math.random() * 80 + 100}px`,
              borderRadius: '50% 50% 50% 50% / 40% 40% 60% 60%',
              boxShadow: 'inset -10px -10px 20px rgba(0,0,0,0.2)',
              position: 'fixed',
              zIndex: 1500
            }}
          />
        ))}
      </AnimatePresence>

      <style>{`
        .skip-intro-btn {
          position: fixed;
          bottom: 30px;
          right: 30px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: rgba(255, 255, 255, 0.5);
          padding: 8px 16px;
          border-radius: 50px;
          cursor: pointer;
          font-size: 0.8rem;
          z-index: 2000;
          transition: all 0.3s ease;
        }
        .skip-intro-btn:hover {
          background: rgba(255, 255, 255, 0.15);
          color: white;
          border-color: rgba(255, 255, 255, 0.3);
        }
        .intro-3d-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle at center, #1a2a4a 0%, #050a1a 100%);
          z-index: 1000;
          display: flex;
          justify-content: center;
          align-items: center;
          perspective: 1000px;
          overflow: hidden;
        }
        .scene-3d {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 60px;
          transform-style: preserve-3d;
          z-index: 10;
        }
        .foil-balloon-wrapper {
          position: absolute;
          top: -150px;
          right: -80px;
          display: flex;
          flex-direction: column;
          align-items: center;
          z-index: 50;
        }
        .foil-number {
          font-family: 'Playfair Display', serif;
          font-size: 7rem;
          font-weight: 900;
          background: linear-gradient(135deg, #bf953f 0%, #fcf6ba 45%, #b38728 70%, #fbf5b7 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          filter: drop-shadow(0 0 10px rgba(255, 215, 0, 0.5)) drop-shadow(0 10px 20px rgba(0,0,0,0.4));
          position: relative;
          letter-spacing: -5px;
        }
        .foil-string {
          width: 2px;
          height: 120px;
          background: rgba(255,255,255,0.2);
          margin-top: -10px;
        }
        .cake-3d-wrapper {
          position: relative;
          width: 250px;
          height: 250px;
          transform-style: preserve-3d;
        }
        .cake-body {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 200px;
          display: flex;
          flex-direction: column-reverse;
          align-items: center;
          transform-style: preserve-3d;
        }
        .layer {
          width: 100%;
          background: #fcf6ba;
          border-radius: 15px 15px 5px 5px;
          position: relative;
          box-shadow: inset 0 -10px 20px rgba(0,0,0,0.2), 0 10px 30px rgba(0,0,0,0.3);
          transform-style: preserve-3d;
        }
        .layer.bottom { width: 220px; z-index: 1; }
        .layer.top { width: 160px; z-index: 2; margin-bottom: -10px; background: #fff; }
        
        .frosting {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 15px;
          background: #ff4d6d;
          border-radius: 10px 10px 0 0;
          box-shadow: 0 5px 10px rgba(255, 77, 109, 0.3);
        }
        .gold-frosting { background: #ffd700; }

        .candles-container {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: flex-end;
          z-index: 10;
          transform-style: preserve-3d;
          padding-bottom: 120px;
        }
        .candle {
          width: 8px;
          height: 40px;
          background: linear-gradient(to bottom, #fff, #eee);
          border-radius: 4px;
          position: relative;
          margin: 0 15px;
          box-shadow: 0 0 10px rgba(255,255,255,0.2);
        }
        .wick {
          position: absolute;
          top: -5px;
          left: 50%;
          transform: translateX(-50%);
          width: 2px;
          height: 6px;
          background: #333;
        }
        .flame {
          position: absolute;
          top: -25px;
          left: 50%;
          transform: translateX(-50%);
          width: 15px;
          height: 25px;
          background: radial-gradient(ellipse at bottom, #ff9800 0%, #ff5722 50%, transparent 90%);
          border-radius: 50% 50% 20% 20%;
          filter: drop-shadow(0 0 10px #ff9800);
        }

        .intro-text-3d {
          text-align: center;
        }
        .intro-text-3d h2 {
          font-size: 3rem;
          margin-bottom: 10px;
        }
        .shimmer-text {
          animation: shimmer 2s infinite linear;
          background: linear-gradient(to right, #bf953f, #fcf6ba, #b38728, #fcf6ba, #bf953f);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        @keyframes shimmer {
          to { background-position: 200% center; }
        }

        .balloon::after {
          content: "";
          position: absolute;
          bottom: -10px;
          left: 50%;
          transform: translateX(-50%);
          width: 2px;
          height: 40px;
          background: rgba(255,255,255,0.2);
        }
      `}</style>
    </motion.div>
  );
};

export default IntroVideo;
