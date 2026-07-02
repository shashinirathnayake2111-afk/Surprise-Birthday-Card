import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import './IntroVideo.css';

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
    </motion.div>
  );
};

export default IntroVideo;
