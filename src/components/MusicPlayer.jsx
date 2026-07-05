import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, SkipForward } from 'lucide-react';
import './MusicPlayer.css';

const songs = [
  { title: "Happy Birthday 🎂 (Jazz Trio)", url: "/song1.mp3" },
  { title: "Moonlight Sonata (Peaceful) 🌙", url: "/song2.mp3" }
];

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    if (isPlaying && audioRef.current) {
      audioRef.current.load();
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(e => console.log('Auto-play failed', e));
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
        playPromise.catch(e => console.log('Play failed', e));
      }
      setIsPlaying(true);
    }
  };

  const nextSong = (e) => {
    e.stopPropagation();
    setCurrentSongIndex((prev) => (prev + 1) % songs.length);
    setIsPlaying(true);
  };

  return (
    <div className="floating-music-player">
      <audio
        ref={audioRef}
        src={songs[currentSongIndex].url}
        onEnded={() => {
          setCurrentSongIndex((prev) => (prev + 1) % songs.length);
          setIsPlaying(true);
        }}
        crossOrigin="anonymous"
        preload="auto"
        loop={false}
      />

      {/* Spinning ring wrapper + button */}
      <div className={`music-btn-outer ${isPlaying ? 'is-playing' : ''}`}>
        <motion.button
          className="player-toggle-btn"
          onClick={togglePlay}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          aria-label={isPlaying ? 'Pause music' : 'Play music'}
        >
          {isPlaying
            ? <Pause size={20} color="#fff" />
            : <Play size={20} color="#fff" />
          }
        </motion.button>
      </div>

      {/* Song title + skip — slides in when playing */}
      <AnimatePresence>
        {isPlaying && (
          <motion.div
            className="song-name-tooltip"
            initial={{ opacity: 0, x: -12, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -12, scale: 0.9 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <span className="tooltip-title">{songs[currentSongIndex].title}</span>
            <button className="skip-inline-btn" onClick={nextSong} aria-label="Next song">
              <SkipForward size={14} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MusicPlayer;
