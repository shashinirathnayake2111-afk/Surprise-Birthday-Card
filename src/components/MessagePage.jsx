import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Heart, Sparkles, Star, ChevronRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import './MessagePage.css';

// Import crazy Toothless assets
import toothless0 from '../assets/toothless_0.png';
import toothless2 from '../assets/toothless_2.png';
import toothlessRight from '../assets/toothless.png';

const MessagePage = ({ onBack, onNextSurprise }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [bubbles, setBubbles] = useState([]);

  const handleOpenEnvelope = () => {
    if (!isOpen) {
      setIsOpen(true);
      // Bestie celebration burst
      confetti({
        particleCount: 100,
        spread: 90,
        origin: { y: 0.65 },
        colors: ['#ff4d6d', '#ffd700', '#00f2ff', '#ff85a2', '#ffd166', '#a29bfe'],
      });
      
      // Secondary delay confetti burst for extra craziness
      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#ff4d6d', '#ffd700', '#00f2ff']
        });
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#ff4d6d', '#ffd700', '#00f2ff']
        });
      }, 400);
    } else {
      setIsOpen(false);
    }
  };

  const handleBgClick = (e) => {
    // Only spawn when clicking on background or containers, not buttons/cards
    if (
      e.target.className.includes('message-page-container') || 
      e.target.className.includes('letter-bg') || 
      e.target.className.includes('letter-wrapper')
    ) {
      const emojiList = ['🎉', '🤪', '🔥', '💖', '🎂', '🍕', '🐉', '✨', '🕺', '🥳', '💥', '👻'];
      const randomEmoji = emojiList[Math.floor(Math.random() * emojiList.length)];
      const newBubble = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY,
        emoji: randomEmoji
      };
      setBubbles((prev) => [...prev, newBubble]);
      
      // Clean up bubble
      setTimeout(() => {
        setBubbles((prev) => prev.filter((b) => b.id !== newBubble.id));
      }, 1500);

      // Localized micro-burst
      confetti({
        particleCount: 6,
        angle: Math.random() * 360,
        spread: 30,
        origin: { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight },
        colors: ['#ff4d6d', '#ffd700', '#00f2ff']
      });
    }
  };

  return (
    <motion.div 
      className="message-page-container"
      onClick={handleBgClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="letter-bg"></div>

      {/* Floating Interactive Emoji Bubbles */}
      <AnimatePresence>
        {bubbles.map((bubble) => (
          <motion.div
            key={bubble.id}
            className="click-bubble"
            style={{ left: bubble.x - 20, top: bubble.y - 20 }}
            initial={{ scale: 0.5, opacity: 1, y: 0 }}
            animate={{ scale: 1.6, opacity: 0, y: -120, rotate: Math.random() * 90 - 45 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            {bubble.emoji}
          </motion.div>
        ))}
      </AnimatePresence>
      
      {/* Crazy Floating Toothless (Left) */}
      <motion.div 
        className="crazy-toothless toothless-left"
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 8, -8, 0]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <img src={toothless0} alt="Toothless Left" />
        <div className="toothless-bubble">Happy Birthday! 🎂🐉</div>
      </motion.div>

      {/* Crazy Floating Toothless (Right) */}
      <motion.div 
        className="crazy-toothless toothless-right"
        animate={{ 
          y: [0, 20, 0],
          rotate: [0, -8, 8, 0],
          scale: [1, 1.06, 0.94, 1]
        }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      >
        <img src={toothlessRight} alt="Toothless Right" />
        <div className="toothless-bubble bubble-blue">Rawrrr Bathali! 🤪🔥</div>
      </motion.div>

      {/* Back Button - Moved outside wrapper so fixed position works correctly on mobile */}
      <motion.button 
        className="back-btn-letter" 
        onClick={onBack}
        whileHover={{ scale: 1.1 }}
      >
        <ArrowLeft size={20} />
        <span>Go Back</span>
      </motion.button>

      <div className="letter-wrapper">
        <div className={`envelope ${isOpen ? 'open' : ''}`} onClick={handleOpenEnvelope}>
          <div className="envelope-back"></div>

          {/* Peeking Toothless behind the Envelope */}
          <motion.div 
            className="toothless-bottom-wrapper"
            animate={{ 
              y: isOpen ? -145 : -25,
              scale: isOpen ? 1 : 0.85
            }}
            transition={{ duration: 0.8, ease: "easeOut", delay: isOpen ? 0.35 : 0 }}
          >
            <img src={toothless2} alt="Toothless Peeking" className="toothless-bottom-img" />
          </motion.div>
          
          <div className={`letter-card ${isOpen ? 'is-open' : ''}`}>
            <div className="letter-inner">
              <div className="letter-sparkle-top">✨</div>
              <div className="letter-sparkle-bottom">✨</div>
              
              <h1 className="letter-title">To my favourite bestie... 💖</h1>
              <p className="letter-text">
                Ahhh bathali! heee... Happy Birthday to my absolute favorite human, my partner in crime, and the one who makes life ten times brighter and funnier! 🎂✨
              </p>
              <p className="letter-text">
                Whether we are laughing like crazy, arguing over silly things, or just doing absolutely nothing, every single moment with you is special. Thank you for always being there for me, for listening to my endless dramas, and for keeping it real. You're not just my best friend; you're family. ❤️
              </p>
              <p className="letter-text">
                I hope you know how much your friendship means to me. I am so incredibly proud of the person you are, and I know you are going to achieve all your big dreams. I will always be right here cheering you on! 🎓🌟
              </p>
              <p className="letter-text highlight-text">
                May this year bring you all the love, endless laughter, and success you deserve. Stay happy, keep smiling, and take care of yourself, my buddy! Happy Birthday! 🥳💛
              </p>
            </div>
          </div>

          <div className="envelope-front">
            <div className="seal">
              <Heart fill="#ff4d6d" color="#ff4d6d" size={40} />
            </div>
            <p className="envelope-to">For My Bestie❤️</p>
          </div>
          
          <div className="envelope-top"></div>
        </div>
        
        {!isOpen && (
          <motion.p 
            className="tap-instruction"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Click the heart to open your letter ✨
          </motion.p>
        )}
      </div>

      {/* Discover More Button - Moved outside of the envelope transform context */}
      <AnimatePresence>
        {isOpen && (
          <motion.button
            className="discover-more-btn"
            onClick={(e) => {
              e.stopPropagation();
              onNextSurprise();
            }}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, type: "spring", stiffness: 100 }}
          >
            Discover More Surprises <ChevronRight />
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default MessagePage;
