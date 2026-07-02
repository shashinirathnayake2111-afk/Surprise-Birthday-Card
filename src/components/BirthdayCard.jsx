import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import './BirthdayCard.css';

const floatingEmojis = ['🎉', '🎂', '🥳', '✨', '🍕', '🎮', '🎵', '🔥', '💥', '🌟', '🎊', '🍻'];

const BirthdayCard = ({ onNext }) => {
  const [activeTag, setActiveTag] = useState(null);

  useEffect(() => {
    // Fun confetti burst on load
    const shootConfetti = () => {
      confetti({
        particleCount: 120,
        spread: 100,
        origin: { y: 0.5, x: 0.5 },
        colors: ['#ff6fd8', '#3813c2', '#00e5ff', '#ffea00', '#ff4081'],
        startVelocity: 40,
      });
    };
    setTimeout(shootConfetti, 600);
  }, []);

  const tags = [
    { id: 'bestie', emoji: '🤝', label: 'My Day 1', color: '#ff6fd8', desc: 'The OG bestie, no cap!' },
    { id: 'chaos', emoji: '💥', label: 'Chaos Agent', color: '#00e5ff', desc: 'Always dragging me into adventures 😤' },
    { id: 'vibe', emoji: '🔥', label: 'Main Vibe', color: '#ffea00', desc: 'Never a dull moment with you fr' },
  ];

  return (
    <motion.div
      className="bc-wrapper"
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Floating background emojis */}
      <div className="bc-emoji-bg" aria-hidden="true">
        {floatingEmojis.map((emoji, i) => (
          <motion.span
            key={i}
            className="bc-float-emoji"
            style={{
              left: `${(i * 8.5) % 95}%`,
              top: `${(i * 13 + 5) % 90}%`,
              fontSize: `${1.2 + (i % 3) * 0.4}rem`,
            }}
            animate={{
              y: [0, -18, 0],
              rotate: [0, i % 2 === 0 ? 15 : -15, 0],
              opacity: [0.25, 0.55, 0.25],
            }}
            transition={{
              duration: 3 + (i % 4),
              repeat: Infinity,
              delay: i * 0.22,
              ease: 'easeInOut',
            }}
          >
            {emoji}
          </motion.span>
        ))}
      </div>

      {/* Main Card */}
      <div className="bc-card">

        {/* Top Banner */}
        <div className="bc-banner">
          <motion.div
            className="bc-banner-pill"
            animate={{ scale: [1, 1.06, 1] }}
            transition={{ duration: 1.8, repeat: Infinity }}
          >
            🎂 IT'S YOUR DAY, LEGEND!
          </motion.div>
        </div>

        {/* Hero Section */}
        <div className="bc-hero">
          <motion.h1
            className="bc-title"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            Happy Birthday<br />
            <span className="bc-name-highlight">Mage Crime Partner!</span>
          </motion.h1>
          <motion.p
            className="bc-subtitle"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            To the wildest, realest, most legendary bestie in the universe 🌍✨
          </motion.p>
        </div>

        {/* Message Box */}
        <motion.div
          className="bc-message"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <span className="bc-message-quote">"</span>
          Happy Birthday to the most amazing best friend! You bring so much joy,
          craziness, and laughter into my life. Thank you for always being there for me.
          Today is all about you — I hope your day is as absolutely awesome as you are! 🔥
          <span className="bc-message-quote">"</span>
        </motion.div>

        {/* Interactive Tags */}
        <div className="bc-tags-section">
          <p className="bc-tags-label">Tap to reveal 👇</p>
          <div className="bc-tags-row">
            {tags.map((tag, i) => (
              <motion.div
                key={tag.id}
                className={`bc-tag ${activeTag === tag.id ? 'bc-tag-active' : ''}`}
                style={{ '--tag-color': tag.color }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.9 + i * 0.15, type: 'spring', stiffness: 200 }}
                whileHover={{ scale: 1.08, y: -4 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTag(activeTag === tag.id ? null : tag.id)}
              >
                <span className="bc-tag-emoji">{tag.emoji}</span>
                <span className="bc-tag-label">{tag.label}</span>
              </motion.div>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {activeTag && (
              <motion.div
                key={activeTag}
                className="bc-tag-reveal"
                style={{ '--tag-color': tags.find(t => t.id === activeTag)?.color }}
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                {tags.find(t => t.id === activeTag)?.desc}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Highlight Chips */}
        <div className="bc-chips">
          {[
            { emoji: '🎮', text: 'Best Friend' },
            { emoji: '🌌', text: 'Pure Soul' },
            { emoji: '🕵️', text: 'Partner in Crime' },
          ].map((chip, i) => (
            <motion.div
              key={chip.text}
              className="bc-chip"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2 + i * 0.1, type: 'spring' }}
              whileHover={{ scale: 1.1 }}
            >
              {chip.emoji} {chip.text}
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <motion.div
          className="bc-footer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <span className="bc-footer-text">Made with 💜 by Your Bestie</span>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default BirthdayCard;
