import React, { useEffect, useState } from 'react';

const Confetti = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const colors = ['#ff4d6d', '#ff85a1', '#ffb3c1', '#ffd700', '#00f2ff'];
    const newParticles = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: -10,
      size: Math.random() * 10 + 5,
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: Math.random() * 5,
      duration: Math.random() * 3 + 2,
      angle: Math.random() * 360,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      zIndex: 100,
      overflow: 'hidden'
    }}>
      {particles.map(p => (
        <div
          key={p.id}
          style={{
            position: 'absolute',
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
            borderRadius: Math.random() > 0.5 ? '50%' : '2px',
            transform: `rotate(${p.angle}deg)`,
            animation: `fall ${p.duration}s linear ${p.delay}s infinite`,
            opacity: 0.8
          }}
        />
      ))}
      <style>{`
        @keyframes fall {
          to {
            transform: translateY(110vh) rotate(720deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default Confetti;
