import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Heart, Star, MapPin, Sparkles, Gift, Coffee,
  Camera, Music, Smile, Send, ChevronRight, X, Layers
} from 'lucide-react';
import confetti from 'canvas-confetti';
import pandaHeart from '../assets/panda_heart.png';
import pandaWaving from '../assets/panda_waving_new.png';
import pandaTop from '../assets/panda_peeking_top.png';
import './SurpriseHub.css';

const SurpriseHub = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState(null);

  const surprises = [
    {
      id: 'reasons', title: 'Friendship Grid', icon: <Layers />, color: '#ff4d6d', desc: "9 Reasons You're Amazing" },
    { id: 'bucketlist', title: 'Surprise Gift', icon: <Gift />, color: '#00f2ff', desc: 'Choose a gift for yourself! 🎁' },
  ];

  return (
    <motion.div
      className="surprise-hub-modern"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="cosmic-bg">
        <div className="nebula-1"></div>
        <div className="nebula-2"></div>
        <div className="stars-overlay"></div>
      </div>

      <div className="hub-interface">
        {!activeTab ? (
          <div className="hub-central-menu">
            <motion.div
              className="hub-header-group"
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: "spring", damping: 12 }}
            >
              <h1 className="cyber-title">Surprise Hub</h1>
              <div className="title-underline"></div>
              <p className="cyber-subtitle">Explore the magic I've created for you, my best buddy...</p>
            </motion.div>

            <div className="floating-orbs-container">
              {surprises.map((s, i) => (
                <motion.div
                  key={s.id}
                  className="surprise-orb-wrapper"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: i * 0.2, type: "spring", stiffness: 80 }}
                >
                  <div className="orb-ring"></div>
                  <motion.div
                    className="surprise-orb"
                    style={{ '--orb-color': s.color }}
                    whileHover={{ scale: 1.15 }}
                    onClick={() => setActiveTab(s.id)}
                  >
                    <div className="orb-glow"></div>
                    <div className="orb-inner">
                      <div className="orb-icon">{s.icon}</div>
                      <h3>{s.title}</h3>
                      <span>{s.desc}</span>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>

            <motion.button
              className="hub-exit-btn"
              onClick={onBack}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Back to Card</span>
              <div className="btn-glow"></div>
            </motion.button>
          </div>
        ) : (
          <motion.div
            className="immersive-surprise-view"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.2, opacity: 0 }}
          >
            <div className="surprise-content-wrapper">
              {activeTab === 'reasons' && <ReasonsGrid onBack={() => setActiveTab(null)} />}
              {activeTab === 'bucketlist' && <BucketList onBack={() => setActiveTab(null)} />}
            </div>
          </motion.div>
        )}

        {/* Panda 1: Left Heart */}
        <motion.div
          className="panda-sticker-wrapper panda-left"
          initial={{ x: -150, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <img src={pandaHeart} alt="Heart Panda" className="panda-img" />
          <div className="panda-hello-bubble">You are the Best! ❤️</div>
        </motion.div>

        {/* Panda 2: Right Waving */}
        <motion.div
          className="panda-sticker-wrapper panda-right"
          initial={{ x: 150, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <img src={pandaWaving} alt="Waving Panda" className="panda-img" />
          <div className="panda-hello-bubble">Hi Bathali! 👋</div>
        </motion.div>

        {/* Panda 3: Top Peeking */}
        <motion.div
          className="panda-sticker-wrapper panda-top"
          initial={{ y: -150, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <img src={pandaTop} alt="Top Panda" className="panda-img" />
          <div className="panda-hello-bubble">Peek-a-boo! 🐼</div>
        </motion.div>
      </div>
    </motion.div>
  );
};

// --- Sub-Components ---

const ReasonsGrid = ({ onBack }) => {
  const [revealed, setRevealed] = useState([]);
  const [showGrid, setShowGrid] = useState(true);

  const reasons = [
    { id: 1, color1: '#c77dff', color2: '#e040fb', icon: <Heart />, text: "You know too many of my secrets. I have no choice but to keep you around. 🤫❤️" },
    { id: 2, color1: '#00b4d8', color2: '#4361ee', icon: <Star />, text: "We've been friends so long, I can't remember which one of us is the bad influence. Probably you. 😈" },
    { id: 3, color1: '#f72585', color2: '#b5179e', icon: <Coffee />, text: "I'd take a bullet for you. Not in the head, but like... the foot. Or the arm. 🔫🦶" },
    { id: 4, color1: '#7209b7', color2: '#560bad', icon: <Smile />, text: "You're the only person I'd share my snacks with. Okay, maybe not all of them, but like 10%. 🍕🍫" },
    { id: 5, color1: '#4cc9f0', color2: '#4895ef', icon: <Music />, text: "I love how we can just look at each other and instantly know we're judging the exact same person. 👀😂" },
    { id: 6, color1: '#e040fb', color2: '#7b2ff7', icon: <Camera />, text: "You're my favorite person to do absolutely nothing with and still be exhausted afterwards. 🛋️🥱" },
    { id: 7, color1: '#480ca8', color2: '#3f37c9', icon: <Heart />, text: "If we were on a sinking ship, I'd share my door with you. Looking at you, Rose. 🚢🚪" },
    { id: 8, color1: '#00c4ff', color2: '#0077b6', icon: <Star />, text: "Thanks for being my unpaid therapist and occasionally giving me terrible advice. 🛋️🗣️" },
    { id: 9, color1: '#ff6bba', color2: '#c77dff', icon: <Gift />, text: "Even when you're annoying, you're my favorite kind of annoying. Mostly. 🐒🤪" },
  ];

  const toggle = (id) => {
    if (revealed.includes(id)) {
      setRevealed([]);
    } else {
      setRevealed([id]);
      confetti({ particleCount: 30, spread: 60, origin: { y: 0.7 }, colors: ['#ff4d6d', '#ffd700'] });
    }
  };

  if (!showGrid) {
    return (
      <motion.div
        className="teasing-intro"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        <motion.div
          className="teasing-content glass-morphism"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.button
            className="teasing-next-btn"
            onClick={() => setShowGrid(true)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <span>Let's See!</span>
            <ChevronRight />
          </motion.button>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <div className="friendship-galaxy-container">
      <button className="galaxy-back-btn" onClick={onBack}>
        <ChevronRight style={{ transform: 'rotate(180deg)' }} />
        <span>Back to Hub</span>
      </button>

      <div className="galaxy-orbit">
        {reasons.map((r, i) => {
          const isMobile = typeof window !== 'undefined' && window.innerWidth < 600;

          let x, y;
          if (isMobile) {
            // Grid layout for mobile: 3 columns
            const col = i % 3;
            const row = Math.floor(i / 3);
            x = (col - 1) * 110; // Center column is 0
            y = (row - 1) * 120; // Center row is 0
          } else {
            // Circular orbit for desktop
            const angle = (i / reasons.length) * (Math.PI * 2);
            x = Math.cos(angle) * 300;
            y = Math.sin(angle) * 300;
          }

          return (
            <motion.div
              key={r.id}
              className={`galaxy-box ${revealed.includes(r.id) ? 'revealed' : ''}`}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ x, y, scale: 1, opacity: 1 }}
              transition={{ delay: i * 0.1, type: "spring", stiffness: 50 }}
              whileHover={{ scale: 1.1, zIndex: 100 }}
              onClick={() => toggle(r.id)}
            >
              <div className="galaxy-box-inner">
                {/* Front Face */}
                <div
                  className="galaxy-face galaxy-front"
                  style={{
                    background: `linear-gradient(135deg, ${r.color1} 0%, ${r.color2} 100%)`,
                    borderColor: `${r.color1}88`,
                    boxShadow: `0 0 20px ${r.color1}66, inset 0 0 20px rgba(255,255,255,0.1)`
                  }}
                >
                  <div className="ribbon-v"></div>
                  <Smile size={32} />
                  <span>Reason {i + 1}</span>
                </div>

                {/* Back Face (Content) */}
                <div
                  className="galaxy-face galaxy-back"
                  style={{
                    borderColor: `${r.color1}88`,
                    boxShadow: `0 0 20px ${r.color2}44, inset 0 0 30px rgba(255,255,255,0.05)`
                  }}
                >
                  <div className="reason-content">
                    <p style={{ textShadow: `0 0 8px ${r.color1}cc` }}>{r.text}</p>
                  </div>
                </div>

                {/* 3D Sides */}
                <div className="galaxy-side side-right" style={{ background: `linear-gradient(180deg, ${r.color1}cc, ${r.color2}99)`, boxShadow: `inset -2px 0 8px rgba(255,255,255,0.15)` }}></div>
                <div className="galaxy-side side-left" style={{ background: `linear-gradient(180deg, ${r.color1}aa, ${r.color2}77)` }}></div>
                <div className="galaxy-side side-top" style={{ background: `linear-gradient(135deg, ${r.color1}dd, ${r.color2}aa)`, boxShadow: `0 -2px 12px ${r.color1}88` }}></div>
                <div className="galaxy-side side-bottom" style={{ background: `linear-gradient(135deg, ${r.color2}99, ${r.color1}66)` }}></div>
              </div>

              <div className="box-aura" style={{ background: `radial-gradient(circle, ${r.color1}44 0%, transparent 70%)` }}></div>
            </motion.div>
          );
        })}
        <div className="galaxy-center">
          <Heart fill="#ff4d6d" size={80} className="pulse-heart" />
        </div>
      </div>
    </div>
  );
};


const BucketList = ({ onBack }) => {
  const [selectedGift, setSelectedGift] = useState(null);
  const [revealingId, setRevealingId] = useState(null);
  const [revealAll, setRevealAll] = useState(false);
  const [isLocked, setIsLocked] = useState(false);

  const gifts = [
    { 
      id: 1, 
      name: "Special Chocolate Box 🍫", 
      desc: "Sweet chocolates for the sweetest bestie. Warning: Sharing is optional! 😉🍫", 
      color: "#ff4d6d",
      message: "You love this chocolate box, don't you? Awesome! This is definitely yours. 😋❤️"
    },
    { 
      id: 2, 
      name: "Custom Bestie Mug ☕", 
      desc: "A beautiful customized mug for your daily tea or coffee. Reminding you of our bond with every sip! ☕✨", 
      color: "#ffca3a",
      message: "A beautiful customized mug just for you to enjoy your coffee/tea. Cozy vibes! ☕🔥"
    },
    { 
      id: 3, 
      name: "Mini Panda Teddy 🐼", 
      desc: "A cute, fluffy panda teddy because you are my favorite lazy panda! 🐼❤️", 
      color: "#52b788",
      message: "Aww, a cutie panda teddy bear is waiting to hug you! 🐼❤️"
    },
    { 
      id: 4, 
      name: "Special Bestie Keychain 🔑", 
      desc: "A custom key tag to carry our chaotic bestie energy wherever you go! 🔐✨", 
      color: "#00d4ff",
      message: "A custom keychain for both of us! Keep it with you to always remember your bestie. 🔑✨"
    },
    { 
      id: 5, 
      name: "Pizza & Movie Treat 🍕", 
      desc: "A fully sponsored pizza date or movie treat where we can hang out and chill! 🍕🎬", 
      color: "#9d4edd",
      message: "Let's go grab some pizza together! I'll call and set it up. A spontaneous sponsored treat! 🍕🥤"
    }
  ];

  const handleSelect = (gift) => {
    if (isLocked || revealingId || selectedGift) return;
    setRevealingId(gift.id);
    confetti({ particleCount: 15, spread: 40, colors: [gift.color, '#ffffff'] });
    setTimeout(() => {
      setSelectedGift(gift);
      setRevealingId(null);
      
      // Reveal all other cards after 20 seconds
      setTimeout(() => {
        setRevealAll(true);
      }, 20000);
    }, 1000);
  };

  const handleClaim = () => {
    if (!selectedGift) return;
    setIsLocked(true);
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
      colors: [selectedGift.color, '#ffd700', '#00f2ff']
    });
  };

  const shareText = `Hey! I opened your Surprise Card and chose the "${selectedGift?.name}" from the Surprise Gift selector! 🎁✨`;
  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;

  return (
    <div className="cyber-bucket modern-dream-view">
      <div className="dream-particles-container">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="dream-particle"
            initial={{ y: "110vh", x: Math.random() * 100 + "vw", opacity: 0 }}
            animate={{ y: "-10vh", opacity: [0, 0.8, 0] }}
            transition={{ duration: 8 + Math.random() * 8, repeat: Infinity, delay: i * 1.5 }}
          >
            {i % 3 === 0 ? "🎁" : i % 3 === 1 ? "✨" : "💖"}
          </motion.div>
        ))}
      </div>

      <button className="galaxy-back-btn" onClick={onBack}>
        <ChevronRight style={{ transform: 'rotate(180deg)' }} />
        <span>Back to Hub</span>
      </button>

      <AnimatePresence mode="wait">
        {!isLocked ? (
          <motion.div
            key="selector"
            className="gift-selector-card glass-morphism"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bucket-header">
              <h2 className="dream-portal-title">Pick Your Surprise Gift 🎁</h2>
              <p className="gift-subtitle">Choose one special gift you'd like to get from me. Select carefully! 😉</p>
            </div>

            <div className="gift-cards-grid">
              {gifts.map((g) => (
                <motion.div
                  key={g.id}
                  className={`gift-card-3d-wrapper ${(selectedGift?.id === g.id || revealAll) ? 'flipped' : ''} ${revealingId === g.id ? 'revealing' : ''}`}
                  onClick={() => handleSelect(g)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="gift-card-3d-inner">
                    {/* Back Face (Mystery - Shown initially) */}
                    <div className="gift-card-3d-back">
                      <div className="mystery-sticker">🎁</div>
                      <span className="mystery-tap-hint">Tap to Reveal ✨</span>
                    </div>

                    {/* Front Face (Revealed - Shows gift details) */}
                    <div 
                      className="gift-card-3d-front"
                      style={{ '--g-color': g.color }}
                    >
                      <div className="gift-card-glow"></div>
                      <span className="gift-option-icon">🎁</span>
                      <h3 className="gift-option-name">{g.name}</h3>
                      <p className="gift-option-desc">{g.desc}</p>
                      {selectedGift?.id === g.id && (
                        <div className="gift-selected-badge">
                          Selected ✨
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {selectedGift && (
              <motion.div
                className="claim-section"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring" }}
              >
                <motion.button
                  className="claim-btn"
                  onClick={handleClaim}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>Claim this Surprise! 💖</span>
                  <div className="claim-btn-glow"></div>
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="confirmation"
            className="gift-confirm-card glass-morphism"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.6, type: "spring", damping: 15 }}
          >
            <div className="confirm-header">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="large-gift-icon"
              >
                🎁
              </motion.div>
              <h2 className="confirm-title gold-text">Surprise Locked In! 🎉</h2>
            </div>

            <div className="confirm-details">
              <p className="selection-label">Your Chosen Gift:</p>
              <h3 className="selected-gift-title" style={{ color: selectedGift.color }}>
                {selectedGift.name}
              </h3>
              <div className="divider" style={{ background: selectedGift.color }}></div>
              <p className="gift-message">{selectedGift.message}</p>
              <p className="gift-instr-msg">Take a screenshot of this and send it to me, or click the button below to share via WhatsApp! 😉✨</p>
            </div>

            <div className="confirm-actions">
              <a 
                href={whatsappUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="share-whatsapp-btn"
              >
                Send Choice to Me 🚀
              </a>
              <motion.button 
                className="reset-choice-btn"
                onClick={() => setIsLocked(false)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                Choose Another Gift 🔄
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SurpriseHub;
