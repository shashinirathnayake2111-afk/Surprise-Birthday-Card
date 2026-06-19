import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Unlock, ChevronRight } from 'lucide-react';
import './LockScreen.css';

const LockScreen = ({ onUnlock }) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);
  const correctPin = '0912';

  const handleNumberClick = (num) => {
    if (pin.length < 4) {
      const newPin = pin + num;
      setPin(newPin);
      
      if (newPin.length === 4) {
        // Accept ANY 4-digit PIN
        setTimeout(() => onUnlock(), 500);
      }
    }
  };

  const handleDelete = () => {
    setPin(pin.slice(0, -1));
  };

  return (
    <motion.div 
      className="lock-screen-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
      transition={{ duration: 0.8 }}
    >
      <div className="lock-content-wrapper glass-morphism">
        <motion.div 
          className="lock-header"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
        >
          <div className="icon-badge">
            {pin.length === 4 ? <Unlock className="icon gold-text" /> : <Lock className="icon" />}
          </div>
          <h2 className="gold-text">Private Access</h2>
          <p className="hint-text">Enter the special date (MMDD)</p>
        </motion.div>

        <div className="pin-display">
          {[...Array(4)].map((_, i) => (
            <motion.div 
              key={i} 
              className={`pin-dot ${pin.length > i ? 'active' : ''} ${error ? 'error' : ''}`}
              animate={error ? { x: [0, -10, 10, -10, 10, 0] } : {}}
            />
          ))}
        </div>

        <div className="numpad-grid">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 'C', 0, 'Del'].map((item, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 215, 0, 0.1)' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                if (item === 'Del') handleDelete();
                else if (item === 'C') setPin('');
                else if (typeof item === 'number') handleNumberClick(item.toString());
              }}
              className={`numpad-btn ${typeof item !== 'number' ? 'special' : ''}`}
            >
              {item === 'Del' ? <ChevronRight size={20} /> : item}
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default LockScreen;
