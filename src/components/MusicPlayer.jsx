import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, SkipForward, Music } from 'lucide-react';
import './MusicPlayer.css';

const songs = [
  { title: "Gymnopédie No. 1 (Calm Piano) 🎹", url: "/song1.mp3" },
  { title: "Moonlight Sonata (Peaceful) 🌙", url: "/song2.mp3" }
];

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // Only auto-play when the song changes IF we are already playing
    if (isPlaying && audioRef.current) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(e => console.log("Auto-play failed", e));
      }
    }
  }, [currentSongIndex]);

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

  const nextSong = () => {
    setCurrentSongIndex((prev) => (prev + 1) % songs.length);
    setIsPlaying(true);
  };

  return (
    <div className="floating-music-player">
      <audio 
        ref={audioRef} 
        src={songs[currentSongIndex].url} 
        onEnded={nextSong}
        crossOrigin="anonymous"
        preload="none"
        loop={false}
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
              <span className="song-title">{songs[currentSongIndex].title}</span>
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
              <button className="ctrl-btn" onClick={nextSong}>
                <SkipForward size={18} />
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
