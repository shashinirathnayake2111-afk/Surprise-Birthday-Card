import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Ghost, Heart } from 'lucide-react';
import LockScreen from './components/LockScreen';
import BirthdayCard from './components/BirthdayCard';
import Memories from './components/Memories';
import MessagePage from './components/MessagePage';
import IntroVideo from './components/IntroVideo';
import Sparkles from './components/Sparkles';
import SurpriseHub from './components/SurpriseHub';
import './index.css';

function App() {
  const [view, setView] = useState('lock'); // Stages: lock, video, card, memories, message, surpriseHub
  const [showPlayfulAlert, setShowPlayfulAlert] = useState(false);

  const handleUnlock = () => setView('intro');
  const handleIntroEnd = () => setView('card');
  const handleShowMemories = () => setView('memories');
  const handleShowMessage = () => setView('message');
  const handleBackToCard = () => setView('card');

  return (
    <div className="app-container">
      <Sparkles />
      
      <AnimatePresence mode="wait">
        {view === 'lock' && (
          <LockScreen key="lock" onUnlock={handleUnlock} />
        )}
        
        {view === 'intro' && (
          <IntroVideo key="intro" onEnd={handleIntroEnd} />
        )}

        {view === 'card' && (
          <motion.div 
            key="card-view" 
            className="card-view-wrapper"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <BirthdayCard onNext={handleShowMemories} />
            
            <motion.button 
              className="celebrate-no-btn-fixed"
              onClick={() => setShowPlayfulAlert(true)}
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              whileHover={{ x: -5 }}
            >
              <ArrowLeft size={24} />
              <span>Skip the Celebration? 🤔</span>
            </motion.button>

            <motion.button 
              className="surprise-more-btn-fixed"
              onClick={handleShowMemories}
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              whileHover={{ x: 5 }}
            >
              <span>Want to surprise more?</span>
              <ArrowRight size={24} />
            </motion.button>
          </motion.div>
        )}

        {view === 'memories' && (
          <Memories 
            key="memories" 
            onBack={handleBackToCard} 
            onShowMessage={handleShowMessage} 
          />
        )}
        {view === 'message' && (
          <MessagePage 
            onBack={() => setView('memories')} 
            onNextSurprise={() => setView('surpriseHub')}
          />
        )}

        {view === 'surpriseHub' && (
          <SurpriseHub onBack={() => setView('message')} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showPlayfulAlert && (
          <motion.div 
            className="playful-alert-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="playful-alert-card glass-morphism"
              initial={{ scale: 0.5, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.5, y: 50 }}
            >
              <Ghost size={60} className="floating" color="#ff4d6d" />
              <h2 className="gold-text">Wait, you can't leave! 🙈</h2>
              <p>It's your special day! As my ultimate crime partner, we definitely need to celebrate this in style! ✨🎉</p>
              <button className="gold-button" onClick={() => setShowPlayfulAlert(false)}>
                Alright, let's celebrate! 🥰
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .app-container {
          width: 100%;
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: var(--primary-dark);
          position: relative;
          overflow-x: hidden;
        }
        .card-view-wrapper {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100vh;
          padding: 10px;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}

export default App;
