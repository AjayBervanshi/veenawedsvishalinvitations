import React from 'react';

export const FloatingPetals: React.FC = () => {
  // 12 subtle petals floating down the screen
  const petals = [
    { left: '8%', delay: '0s', duration: '9s', size: 14, color: '#f39c12' },
    { left: '22%', delay: '2s', duration: '11s', size: 16, color: '#e67e22' },
    { left: '38%', delay: '4s', duration: '8.5s', size: 12, color: '#e74c3c' },
    { left: '55%', delay: '1s', duration: '10s', size: 15, color: '#f1c40f' },
    { left: '72%', delay: '3s', duration: '12s', size: 13, color: '#d35400' },
    { left: '88%', delay: '5s', duration: '9.5s', size: 16, color: '#e67e22' },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
      {petals.map((p, idx) => (
        <div
          key={idx}
          className="absolute rounded-full opacity-60 shadow-sm"
          style={{
            left: p.left,
            top: '-20px',
            width: `${p.size}px`,
            height: `${p.size * 1.3}px`,
            backgroundColor: p.color,
            borderRadius: '50% 0 50% 50%',
            animation: `petalFall ${p.duration} linear infinite`,
            animationDelay: p.delay,
            transform: 'rotate(25deg)'
          }}
        />
      ))}
    </div>
  );
};
