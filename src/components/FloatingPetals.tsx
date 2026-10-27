import React from 'react';

export const FloatingPetals: React.FC = () => {
  // Diverse sacred floral petals (Marigold gold, orange, saffron & rose crimson)
  const petals = [
    { left: '5%', delay: '0s', duration: '9.5s', size: 14, color: '#f39c12', shape: '50% 0 50% 50%', blur: 0, opacity: 0.75 },
    { left: '16%', delay: '3.2s', duration: '12s', size: 18, color: '#e67e22', shape: '60% 0 60% 50%', blur: 0.5, opacity: 0.65 },
    { left: '27%', delay: '1.5s', duration: '8.8s', size: 12, color: '#c0392b', shape: '40% 60% 0 50%', blur: 0, opacity: 0.7 },
    { left: '39%', delay: '5.1s', duration: '11.5s', size: 16, color: '#f1c40f', shape: '50% 0 50% 50%', blur: 0.8, opacity: 0.6 },
    { left: '51%', delay: '0.8s', duration: '10.2s', size: 15, color: '#d35400', shape: '60% 40% 0 50%', blur: 0, opacity: 0.8 },
    { left: '62%', delay: '4.4s', duration: '13s', size: 20, color: '#e74c3c', shape: '50% 50% 0 50%', blur: 1, opacity: 0.55 },
    { left: '74%', delay: '2.1s', duration: '9.2s', size: 13, color: '#f39c12', shape: '50% 0 50% 50%', blur: 0, opacity: 0.75 },
    { left: '85%', delay: '6s', duration: '10.8s', size: 16, color: '#e67e22', shape: '60% 0 60% 50%', blur: 0.4, opacity: 0.65 },
    { left: '94%', delay: '2.8s', duration: '11.8s', size: 14, color: '#b87a32', shape: '40% 60% 0 50%', blur: 0, opacity: 0.7 },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
      {petals.map((p, idx) => (
        <div
          key={idx}
          className="absolute shadow-sm"
          style={{
            left: p.left,
            top: 0,
            width: `${p.size}px`,
            height: `${p.size * 1.35}px`,
            backgroundColor: p.color,
            borderRadius: p.shape,
            opacity: p.opacity,
            filter: p.blur ? `blur(${p.blur}px)` : 'none',
            animation: `petalFall ${p.duration} cubic-bezier(0.4, 0, 0.6, 1) infinite`,
            animationDelay: p.delay,
            willChange: 'transform, opacity'
          }}
        />
      ))}
    </div>
  );
};

