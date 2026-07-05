import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Music } from 'lucide-react';
import './MusicPlayer.css';

const songs = [
  { title: "Moonlight Sonata (Peaceful) 🌙", url: "/song2.mp3" }
];

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const audioRef = useRef(null);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(e => console.log("Play failed", e));
      }
      setIsPlaying(true);
    }
  };

  return (
    <div className="floating-music-player">
      <audio 
        ref={audioRef} 
        src={songs[0].url} 
        crossOrigin="anonymous"
        preload="auto"
        loop={true}
      />
      
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="player-controls glass-morphism"
            initial={{ opacity: 0, x: -20, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -20, scale: 0.8 }}
          >
            <div className="song-info">
              <span className="song-title">{songs[0].title}</span>
              <div className="equalizer">
                <span className={`bar ${isPlaying ? 'playing' : ''}`}></span>
                <span className={`bar ${isPlaying ? 'playing' : ''}`}></span>
                <span className={`bar ${isPlaying ? 'playing' : ''}`}></span>
              </div>
            </div>
            
            <div className="control-buttons">
              <button className="ctrl-btn" onClick={togglePlay}>
                {isPlaying ? <Pause size={18} /> : <Play size={18} />}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button 
        className={`player-toggle-btn ${isPlaying ? 'spin-slow' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Music size={24} color="#fff" />
      </motion.button>
    </div>
  );
};

export default MusicPlayer;
