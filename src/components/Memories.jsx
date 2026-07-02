import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ChevronRight, ChevronLeft, Heart, Sparkles } from 'lucide-react';
import img01 from '../assets/image 01.jpg';
import img02 from '../assets/image 02.jpg';
import img03 from '../assets/image 03.jpg';
import img04 from '../assets/image 04.jpg';
import img05 from '../assets/image 05.jpg';

import './Memories.css';

// --- Beautiful SVG Flower Components ---
const SakuraFlower = () => (
  <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    {[0, 72, 144, 216, 288].map((angle) => (
      <path
        key={angle}
        d="M50 50 C30 20, 70 20, 50 50 Z"
        fill="#ffb7c5"
        transform={`rotate(${angle} 50 50)`}
      />
    ))}
    {[0, 72, 144, 216, 288].map((angle) => (
      <path
        key={`inner-${angle}`}
        d="M50 50 C42 35, 58 35, 50 50 Z"
        fill="#ff85a1"
        transform={`rotate(${angle} 50 50)`}
      />
    ))}
    <circle cx="50" cy="50" r="8" fill="#ffd700" />
    <circle cx="50" cy="50" r="5" fill="#ff4d6d" />
  </svg>
);

const RosePetal = () => (
  <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M50 85 C20 75, 15 45, 50 15 C85 45, 80 75, 50 85 Z"
      fill="url(#roseGradient)"
    />
    <defs>
      <radialGradient id="roseGradient" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#ff4d6d" />
        <stop offset="100%" stopColor="#ff1a43" />
      </radialGradient>
    </defs>
  </svg>
);

const DaisyFlower = () => (
  <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
      <path
        key={angle}
        d="M50 50 C40 10, 60 10, 50 50 Z"
        fill="#ffffff"
        transform={`rotate(${angle} 50 50)`}
      />
    ))}
    <circle cx="50" cy="50" r="12" fill="#ffd700" />
    <circle cx="50" cy="50" r="8" fill="#ffa500" />
  </svg>
);

const YellowFlower = () => (
  <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    {[0, 60, 120, 180, 240, 300].map((angle) => (
      <path
        key={angle}
        d="M50 50 C35 15, 65 15, 50 50 Z"
        fill="#ffca3a"
        transform={`rotate(${angle} 50 50)`}
      />
    ))}
    <circle cx="50" cy="50" r="10" fill="#ff7b00" />
  </svg>
);



const flowerTypes = [
  SakuraFlower,
  RosePetal,
  DaisyFlower,
  YellowFlower
];

const PhotoRain = () => {
  const rainDrops = Array.from({ length: 40 }); // Dense, beautiful rain

  return (
    <div className="photo-rain-container">
      {rainDrops.map((_, i) => {
        const FlowerComponent = flowerTypes[i % flowerTypes.length];
        return (
          <motion.div
            key={i}
            className="rain-photo"
            initial={{ 
              top: -100, 
              left: `${Math.random() * 100}%`,
              rotate: Math.random() * 360,
              opacity: 0,
              scale: Math.random() * 0.4 + 0.4 // Soft, varied sizes
            }}
            animate={{ 
              top: '120vh',
              rotate: Math.random() * 1080,
              opacity: [0, 0.9, 0] 
            }}
            transition={{
              duration: Math.random() * 6 + 8, // Softer falling speed
              repeat: Infinity,
              delay: Math.random() * 15,
              ease: "linear"
            }}
            style={{
              position: 'absolute',
              width: '60px',
              height: '60px',
              pointerEvents: 'none'
            }}
          >
            <FlowerComponent />
          </motion.div>
        );
      })}
    </div>
  );
};

const Memories = ({ onBack, onShowMessage }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const memories = [
    { 
      id: 0, 
      title: 'Through Thick & Thin', 
      description: 'From our craziest adventures to our deep late-night talks, having you as my best friend is the greatest blessing. Happy Birthday! 🎉', 
      color: '#ffd700',
      image: img01
    },
    { 
      id: 1, 
      title: 'Unstoppable Duo', 
      description: 'We’ve shared so many laughs, tears, and unforgettable moments. You make every single day brighter just by being in it! ☀️✨', 
      color: '#00f2ff',
      image: img02
    },
    { 
      id: 2, 
      title: 'Partner in Crime', 
      description: 'Life is just better with you by my side. Here is to making more hilarious mistakes and epic memories together! 🥂', 
      color: '#ff4d6d',
      image: img03
    },
    { 
      id: 3, 
      title: 'My Therapy', 
      description: 'You are the one I call when I need advice, a good laugh, or just someone to listen. Thank you for always understanding me. ❤️', 
      color: '#00f2ff',
      image: img04
    },
    { 
      id: 4, 
      title: 'Forever Besties', 
      description: 'No matter where life takes us, I know we will always be there for each other. Cheers to many more years of our amazing friendship! 🎂', 
      color: '#a020f0',
      image: img05
    },
    { 
      id: 5, 
      title: 'To the Moon & Back', 
      description: 'Wishing you a birthday as wonderful, beautiful, and extraordinary as you are. Have the absolute best day ever! 🎈', 
      color: '#ff85a1',
      image: img01
    }
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === memories.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? memories.length - 1 : prev - 1));
  };

  return (
    <motion.div 
      className="memories-slider-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <PhotoRain />
      
      {/* Background Mirror Effect */}
      <div className="mirror-bg">
        <motion.img 
          key={`mirror-${currentIndex}`}
          src={memories[currentIndex].image} 
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 0.3, scale: 1 }}
          transition={{ duration: 1.5 }}
        />
      </div>

      <div className="slider-wrapper">
        <button className="back-btn-memories" onClick={onBack}>
          <ArrowLeft size={24} /> Back to Card
        </button>

        <div className="vibrant-3d-gallery">
          <AnimatePresence mode="wait">
            <motion.div 
              key={currentIndex}
              className="gallery-item-3d"
              initial={{ rotateY: -45, x: -300, opacity: 0, scale: 0.5 }}
              animate={{ rotateY: 0, x: 0, opacity: 1, scale: 1 }}
              exit={{ rotateY: 45, x: 300, opacity: 0, scale: 0.5 }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
            >
              <div className="photo-stack" style={{ '--accent': memories[currentIndex].color }}>
                <div className="stack-layer layer-1"></div>
                <div className="stack-layer layer-2"></div>
                <div className="main-photo-frame glass-morphism">
                  <img src={memories[currentIndex].image} alt={memories[currentIndex].title} />
                  <div className="photo-overlay">
                    <Heart fill="#fff" size={40} className="floating-photo-heart" />
                  </div>
                </div>
              </div>

              <div className="modern-text-stack">
                <motion.div 
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <h2 className="modern-memories-title" style={{ color: memories[currentIndex].color }}>
                    {memories[currentIndex].title}
                  </h2>
                  <p className="modern-memories-desc">
                    {memories[currentIndex].description}
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="navigation-controls">
            <button className="modern-nav-btn" onClick={prevSlide}>
              <ChevronLeft size={32} />
            </button>
            <div className="nav-dots">
              {memories.map((_, index) => (
                <div 
                  key={index} 
                  className={`modern-dot ${index === currentIndex ? 'active' : ''}`}
                  style={{ backgroundColor: index === currentIndex ? memories[currentIndex].color : 'rgba(255,255,255,0.2)' }}
                  onClick={() => setCurrentIndex(index)}
                />
              ))}
            </div>
            <button className="modern-nav-btn" onClick={nextSlide}>
              <ChevronRight size={32} />
            </button>
          </div>
        </div>

        <motion.button 
          className="final-message-btn-modern"
          onClick={onShowMessage}
          whileHover={{ scale: 1.05, y: -5 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <Heart size={20} fill="#ffd700" />
          <span>A Special Message For You</span>
          <Sparkles size={20} color="#ffd700" />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Memories;
