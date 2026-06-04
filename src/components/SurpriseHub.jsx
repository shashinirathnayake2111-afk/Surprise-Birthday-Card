import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Heart, Star, MapPin, Sparkles, Gift, Coffee,
  Camera, Music, Smile, Send, ChevronRight, X, Layers
} from 'lucide-react';
import confetti from 'canvas-confetti';
import pandaHeart from '../assets/panda_heart.png';
import pandaWaving from '../assets/panda_waving.png';
import pandaTop from '../assets/panda_peeking_top.png';
import './SurpriseHub.css';

const SurpriseHub = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState(null);

  const surprises = [
    {
      id: 'reasons', title: 'Friendship Grid', icon: <Layers />, color: '#ff4d6d', desc: "9 Reasons You're Amazing" },
    { id: 'compliments', title: 'Bestie Notes', icon: <Heart />, color: '#ffd700', desc: 'A special letter for my bestie' },
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
              {activeTab === 'compliments' && <ComplimentGenerator onBack={() => setActiveTab(null)} />}
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
    { id: 1, icon: <Heart />, text: "ඔයා අනිත් අයට සලකන විදිහට, ඉන්න විදිහට මම හරි කැමතියි.. හැබැයි මටනේ ඔක්කොම වද දෙන්නේ! 🙄❤️ යාළුකම ඉතින්...", color: "#ff4d6d" },
    { id: 2, icon: <Star />, text: "ඔයා මම ආස දේවල් මතක තියාගෙන හැමදාම උදව් කරනවා.. ඒකට ලොකු hug එකකුයි ස්තූතියකුයි! හී හී... ❤️🍫", color: "#00d4ff" },
    { id: 3, icon: <Coffee />, text: "ඔයා කොච්චರ රණ්ඩු වුණත්, පිටට පෙන්නුවේ නැතත්.. මම දන්නවා ඔයා මට කොච්චර හිතවත්ද කියලා! හූ හූ හෙහ් හෙහ්... 🤪❤️", color: "#9d4edd" },
    { id: 4, icon: <Smile />, text: "කොච්චර මොන ප්‍රශ්න ආවත්, දෙන්නත් එක්කම හොඳ යාළුවෝ වගේ හැමදේම බෙදාගෙන ලස්සනට ඉමු.. හදාා! ✨❤️", color: "#ffca3a" },
    { id: 5, icon: <Music />, text: "ආහ් ආහ් මේ සේරටම මම ඉතින් කැමතියි.. මට call අරන් චැට් කරන්න වෙලාවක් නැති එකනේ ප්‍රශ්නේ! කමක් නෑ කමක් නෑ ඉන්නවනේ මාත් එක්ක.. ජයවේවා! 🍻📞", color: "#52b788" },
    { id: 6, icon: <Camera />, text: "ඔයා එක්ක ඇවිදින්න ගියපු තැන්වල මතක හරිම ෂෝයි.. කොහේද ඉතින් ඒවා මතක නෑනේ! යමු ට්‍රිප් එකක්... 🚶‍♂️🚶‍♀️❤️", color: "#ff7b00" },
    { id: 7, icon: <Heart />, text: "හැමදාම සතුටින්, පරිස්සමෙන් ඉන්න ඕනේ.. හරිද? සමහර තැන්වලදී දෙන support එකට වචන නෑ කියන්න හීීී.. මොකුත් කියන්නේ නෑ මම දිව්වාාා! ටාටා ගුඩු බායි! ❤️🛡️", color: "#4361ee" },
    { id: 8, icon: <Star />, text: "සමහර වැරදි දේවල්වලදී මාව නිවැරදි කරන විදිහ, මට උදව් කරන විදිහ.. ඒකටනම් එන්නකෝ පොඩ්ඩක් බදාගන්න! 🤗❤️", color: "#4cc9f0" },
    { id: 9, icon: <Gift />, text: "Poddak poddak wada denawa randu karanawa.. ewa ganan ganna epa ahh! mage bestie ne itin.. adarei machan! 😎❤️", color: "#f72585" },
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
                  style={{ background: `linear-gradient(135deg, ${r.color} 0%, ${r.color}cc 100%)`, borderColor: r.color }}
                >
                  <Smile size={32} />
                  <span>Reason {i + 1}</span>
                </div>

                {/* Back Face (Content) */}
                <div
                  className="galaxy-face galaxy-back"
                  style={{ borderColor: r.color }}
                >
                  <div className="reason-content">
                    <p>{r.text}</p>
                  </div>
                </div>

                {/* 3D Sides with dynamic coloring */}
                <div className="galaxy-side side-right" style={{ background: r.color }}></div>
                <div className="galaxy-side side-left" style={{ background: r.color }}></div>
                <div className="galaxy-side side-top" style={{ background: r.color }}></div>
                <div className="galaxy-side side-bottom" style={{ background: r.color }}></div>
              </div>

              <div className="box-aura" style={{ background: `radial-gradient(circle, ${r.color}33 0%, transparent 70%)` }}></div>
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

const ComplimentGenerator = ({ onBack }) => {
  const messages = [
    "Mama magic words danna de mehema kiyannm, oyage onema prashnakadi onema dekadi oya ekka mage hodama yaluwa widihata mama innawa. Oya aniwaryen hodata igenagena hoda job ekak karala lassanata jiwath wenna one. Kochchara randu karath wada dunnath samawenna. Mage hodama yaluwa widihata oyawa balagannawa... ❤️",
    "Onema welawaka oyawa sathutin thiyanna puluwan hamadema mama karanawa buddy. Samawenna me sare mata lokuwata mokuth karaganna bari una eth puluwan ikmata oyage dreams serama ishta karanna subha pathanawa! ✨",
    "Hamoma ekka sathutin lassanata inna budusaranai oyata, parissamen. Mama dannawa oyata jiwithe waradinne na baya wenna epa oya hithana pathana serama asa dewal, dreams serama achieve karaganna shakthiya labewa! 💪💛",
    "Uba maha wadayak thamai, eth ithin magema eka nisa ganan ganne na. 🤪 Happy Birthday pandiyo! 🐼",
    "Our bond is unbreakable! Keep shining and never forget that I'm always here cheering for you, my legendary bestie! 🌟"
  ];

  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  const getNewMessage = () => {
    let nextIndex;
    do {
      nextIndex = Math.floor(Math.random() * messages.length);
    } while (nextIndex === currentMessageIndex);
    setCurrentMessageIndex(nextIndex);

    confetti({
      particleCount: 50,
      spread: 60,
      colors: ['#ff4d6d', '#ffd700'],
      origin: { y: 0.8 }
    });
  };

  return (
    <div className="cyber-compliment">
      {/* Floating Hearts Background */}
      <div className="floating-hearts-bg">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="floating-heart-particle"
            initial={{
              opacity: 0,
              x: Math.random() * 100 + "%",
              y: "100vh",
              scale: Math.random() * 0.5 + 0.5
            }}
            animate={{
              opacity: [0, 0.5, 0],
              y: "-10vh",
              rotate: 360
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
          >
            <Heart fill="rgba(255, 77, 109, 0.3)" size={24} />
          </motion.div>
        ))}
      </div>

      <button className="galaxy-back-btn" onClick={onBack}>
        <ChevronRight style={{ transform: 'rotate(180deg)' }} />
        <span>Back to Hub</span>
      </button>

      <motion.div
        className="love-letter-modern-wrapper"
        initial={{ opacity: 0, scale: 0.8, rotateY: -20 }}
        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
        transition={{ duration: 1, type: "spring" }}
      >
        <div className="glass-letter">
          <div className="letter-header">
            <Heart className="glow-heart" fill="#ff4d6d" size={48} />
            <div className="letter-sparkle s1">✨</div>
            <div className="letter-sparkle s2">✨</div>
          </div>

          <div className="letter-scroll-area">
            <AnimatePresence mode="wait">
              <motion.p
                key={currentMessageIndex}
                className="modern-letter-text"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {messages[currentMessageIndex]}
              </motion.p>
            </AnimatePresence>
          </div>

          <div className="letter-footer-modern">
            <motion.button
              className="magic-btn"
              onClick={getNewMessage}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Sparkles size={20} />
              Read Another ✨
            </motion.button>
            <span className="modern-signature">Always your bestie, Bolee ❤️</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const BucketList = ({ onBack }) => {
  const [selectedGift, setSelectedGift] = useState(null);
  const [isLocked, setIsLocked] = useState(false);

  const gifts = [
    { 
      id: 1, 
      name: "Special Chocolate Box 🍫", 
      desc: "Sweet chocolates for the sweetest bestie. Warning: Sharing is optional! 😉🍫", 
      color: "#ff4d6d",
      SinhalaMsg: "Oya chocolate box ekata asai neda? Elama! Meka aniwaryenma oyata labenawa. 😋❤️"
    },
    { 
      id: 2, 
      name: "Custom Bestie Mug ☕", 
      desc: "A beautiful customized mug for your daily tea or coffee. Reminding you of our bond with every sip! ☕✨", 
      color: "#ffca3a",
      SinhalaMsg: "Coffee/tea bonna lassanama lassana customized mug ekak oyata labei. Cozy vibes! ☕🔥"
    },
    { 
      id: 3, 
      name: "Mini Panda Teddy 🐼", 
      desc: "A cute, fluffy panda teddy because you are my favorite lazy panda! 🐼❤️", 
      color: "#52b788",
      SinhalaMsg: "Aww cutie panda teddy bear kenek oyawa hug karanna bala innawa! 🐼❤️"
    },
    { 
      id: 4, 
      name: "Special Bestie Keychain 🔑", 
      desc: "A custom key tag to carry our chaotic bestie energy wherever you go! 🔐✨", 
      color: "#00d4ff",
      SinhalaMsg: "Dennatama set wenna custom keychain ekak! Hama welema yaluwa mathak wenna key tag eka langa thiyaganna. 🔑✨"
    },
    { 
      id: 5, 
      name: "Pizza & Movie Treat 🍕", 
      desc: "A fully sponsored pizza date or movie treat where we can hang out and chill! 🍕🎬", 
      color: "#9d4edd",
      SinhalaMsg: "Pizza kanda yamu dennatath ekka! Call karala set karagamu. Spontaneously sponsored treat ekak! 🍕🥤"
    }
  ];

  const handleSelect = (gift) => {
    if (isLocked) return;
    setSelectedGift(gift);
    confetti({ particleCount: 15, spread: 40, colors: [gift.color, '#ffffff'] });
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
                  className={`gift-card-3d-wrapper ${selectedGift?.id === g.id ? 'flipped' : ''}`}
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
              <p className="selection-label">Oya thoragaththa gift eka:</p>
              <h3 className="selected-gift-title" style={{ color: selectedGift.color }}>
                {selectedGift.name}
              </h3>
              <div className="divider" style={{ background: selectedGift.color }}></div>
              <p className="gift-sinhala-msg">{selectedGift.SinhalaMsg}</p>
              <p className="gift-instr-msg">Meka screenshot karala mata ewanna neththan pahala thiyena button eken WhatsApp share karanna! 😉✨</p>
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
