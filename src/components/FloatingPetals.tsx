import React from 'react';

interface PetalConfig {
  left: string;
  fallDuration: string;
  tumbleDuration: string;
  delay: string;
  tumbleDelay: string;
  size: number;
  gradient: string;
  shape: string;
  driftX: string;
  blur: number;
  opacity: number;
}

export const FloatingPetals: React.FC = () => {
  // Diverse authentic Indian wedding floral petals (Marigold gold, saffron, auspicious rose crimson & lotus pink)
  // Negative delays guarantee petals are immediately flowing across entire viewport on load with zero stutter
  const petals: PetalConfig[] = [
    { left: '4%', fallDuration: '10.5s', tumbleDuration: '3.8s', delay: '-2.4s', tumbleDelay: '0s', size: 15, gradient: 'linear-gradient(135deg, #f9ca24 0%, #f0932b 55%, #eb4d4b 100%)', shape: '150% 0 150% 0', driftX: '35px', blur: 0, opacity: 0.85 },
    { left: '11%', fallDuration: '13.0s', tumbleDuration: '4.5s', delay: '-7.1s', tumbleDelay: '-1.2s', size: 19, gradient: 'linear-gradient(135deg, #ff7979 0%, #eb4d4b 60%, #962d22 100%)', shape: '0 150% 0 150%', driftX: '-40px', blur: 0.4, opacity: 0.75 },
    { left: '19%', fallDuration: '9.2s', tumbleDuration: '3.2s', delay: '-1.5s', tumbleDelay: '-0.5s', size: 12, gradient: 'linear-gradient(135deg, #f6e58d 0%, #ffbe76 50%, #f0932b 100%)', shape: '140% 10% 140% 10%', driftX: '25px', blur: 0, opacity: 0.8 },
    { left: '28%', fallDuration: '12.2s', tumbleDuration: '4.8s', delay: '-8.9s', tumbleDelay: '-2.0s', size: 17, gradient: 'linear-gradient(135deg, #ffc0cb 0%, #ff7979 55%, #c0392b 100%)', shape: '150% 0 150% 0', driftX: '-30px', blur: 0.6, opacity: 0.7 },
    { left: '36%', fallDuration: '11.0s', tumbleDuration: '3.6s', delay: '-4.8s', tumbleDelay: '-1.4s', size: 14, gradient: 'linear-gradient(135deg, #f9ca24 0%, #f0932b 60%, #d35400 100%)', shape: '50% 50% 50% 0', driftX: '45px', blur: 0, opacity: 0.85 },
    { left: '45%', fallDuration: '14.0s', tumbleDuration: '5.2s', delay: '-10.5s', tumbleDelay: '-3.1s', size: 21, gradient: 'linear-gradient(135deg, #ff7979 0%, #eb4d4b 55%, #962d22 100%)', shape: '0 150% 0 150%', driftX: '-50px', blur: 0.8, opacity: 0.65 },
    { left: '53%', fallDuration: '9.8s', tumbleDuration: '3.4s', delay: '-3.2s', tumbleDelay: '-0.8s', size: 13, gradient: 'linear-gradient(135deg, #ffeaa7 0%, #fdcb6e 55%, #e17055 100%)', shape: '150% 0 150% 0', driftX: '30px', blur: 0, opacity: 0.8 },
    { left: '62%', fallDuration: '12.8s', tumbleDuration: '4.2s', delay: '-6.4s', tumbleDelay: '-2.5s', size: 18, gradient: 'linear-gradient(135deg, #ff7979 0%, #d63031 60%, #8b1e3f 100%)', shape: '140% 10% 140% 10%', driftX: '-35px', blur: 0.4, opacity: 0.75 },
    { left: '71%', fallDuration: '10.2s', tumbleDuration: '3.5s', delay: '-1.8s', tumbleDelay: '-1.1s', size: 14, gradient: 'linear-gradient(135deg, #f9ca24 0%, #f0932b 50%, #eb4d4b 100%)', shape: '50% 50% 50% 0', driftX: '40px', blur: 0, opacity: 0.85 },
    { left: '79%', fallDuration: '13.5s', tumbleDuration: '4.6s', delay: '-9.2s', tumbleDelay: '-2.8s', size: 20, gradient: 'linear-gradient(135deg, #ffc0cb 0%, #ff7675 60%, #c0392b 100%)', shape: '150% 0 150% 0', driftX: '-45px', blur: 0.6, opacity: 0.7 },
    { left: '88%', fallDuration: '11.4s', tumbleDuration: '3.9s', delay: '-5.3s', tumbleDelay: '-1.6s', size: 16, gradient: 'linear-gradient(135deg, #f6e58d 0%, #ffbe76 50%, #f0932b 100%)', shape: '0 150% 0 150%', driftX: '30px', blur: 0, opacity: 0.8 },
    { left: '95%', fallDuration: '12.6s', tumbleDuration: '4.4s', delay: '-3.7s', tumbleDelay: '-1.9s', size: 15, gradient: 'linear-gradient(135deg, #ff7979 0%, #eb4d4b 55%, #962d22 100%)', shape: '150% 0 150% 0', driftX: '-25px', blur: 0.3, opacity: 0.75 }
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden perspective-1000">
      {petals.map((p, idx) => (
        <div
          key={idx}
          className="absolute pointer-events-none"
          style={{
            left: p.left,
            top: 0,
            animation: `petalFallSmooth ${p.fallDuration} linear infinite`,
            animationDelay: p.delay,
            willChange: 'transform, opacity',
            ['--drift-x' as any]: p.driftX
          }}
        >
          {/* Inner 3D Tumbling & Fluttering Petal Leaf */}
          <div
            className="shadow-sm"
            style={{
              width: `${p.size}px`,
              height: `${p.size * 1.38}px`,
              background: p.gradient,
              borderRadius: p.shape,
              opacity: p.opacity,
              filter: p.blur ? `blur(${p.blur}px)` : 'none',
              boxShadow: 'inset 0 0 6px rgba(255, 255, 255, 0.45), 0 2px 6px rgba(95, 37, 15, 0.15)',
              transformStyle: 'preserve-3d',
              animation: `petalTumble3D ${p.tumbleDuration} ease-in-out infinite alternate`,
              animationDelay: p.tumbleDelay,
              willChange: 'transform'
            }}
          />
        </div>
      ))}
    </div>
  );
};
