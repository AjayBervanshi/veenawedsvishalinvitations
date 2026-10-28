import React from 'react';

interface PetalConfig {
  left: string;
  fallAnimation: 'petalFallLeft' | 'petalFallRight' | 'petalFallCenter';
  duration: string;
  flutterDuration: string;
  delay: string;
  size: number;
  gradient: string;
  shape: string;
  opacity: number;
}

export const FloatingPetals: React.FC = () => {
  // 14 diverse authentic Indian wedding petals (Marigold gold, saffron, auspicious rose & lotus pink)
  // Negative delays guarantee petals are immediately and continuously flowing on all screen sizes with zero stalling
  const petals: PetalConfig[] = [
    { left: '4%', fallAnimation: 'petalFallRight', duration: '9.2s', flutterDuration: '3.2s', delay: '-2.4s', size: 14, gradient: 'linear-gradient(135deg, #f9ca24 0%, #f0932b 55%, #eb4d4b 100%)', shape: '150% 0 150% 0', opacity: 0.85 },
    { left: '12%', fallAnimation: 'petalFallLeft', duration: '11.5s', flutterDuration: '3.8s', delay: '-6.8s', size: 18, gradient: 'linear-gradient(135deg, #ff7979 0%, #eb4d4b 60%, #962d22 100%)', shape: '0 150% 0 150%', opacity: 0.8 },
    { left: '20%', fallAnimation: 'petalFallCenter', duration: '8.8s', flutterDuration: '2.8s', delay: '-1.5s', size: 12, gradient: 'linear-gradient(135deg, #f6e58d 0%, #ffbe76 50%, #f0932b 100%)', shape: '140% 10% 140% 10%', opacity: 0.85 },
    { left: '28%', fallAnimation: 'petalFallLeft', duration: '12.0s', flutterDuration: '4.2s', delay: '-8.5s', size: 16, gradient: 'linear-gradient(135deg, #ffc0cb 0%, #ff7979 55%, #c0392b 100%)', shape: '150% 0 150% 0', opacity: 0.75 },
    { left: '36%', fallAnimation: 'petalFallRight', duration: '10.2s', flutterDuration: '3.4s', delay: '-4.6s', size: 14, gradient: 'linear-gradient(135deg, #f9ca24 0%, #f0932b 60%, #d35400 100%)', shape: '50% 50% 50% 0', opacity: 0.85 },
    { left: '44%', fallAnimation: 'petalFallCenter', duration: '13.0s', flutterDuration: '4.5s', delay: '-9.8s', size: 20, gradient: 'linear-gradient(135deg, #ff7979 0%, #eb4d4b 55%, #962d22 100%)', shape: '0 150% 0 150%', opacity: 0.7 },
    { left: '52%', fallAnimation: 'petalFallLeft', duration: '9.5s', flutterDuration: '3.0s', delay: '-3.1s', size: 13, gradient: 'linear-gradient(135deg, #ffeaa7 0%, #fdcb6e 55%, #e17055 100%)', shape: '150% 0 150% 0', opacity: 0.85 },
    { left: '60%', fallAnimation: 'petalFallRight', duration: '11.8s', flutterDuration: '3.9s', delay: '-7.2s', size: 17, gradient: 'linear-gradient(135deg, #ff7979 0%, #d63031 60%, #8b1e3f 100%)', shape: '140% 10% 140% 10%', opacity: 0.8 },
    { left: '68%', fallAnimation: 'petalFallCenter', duration: '9.8s', flutterDuration: '3.1s', delay: '-1.8s', size: 13, gradient: 'linear-gradient(135deg, #f9ca24 0%, #f0932b 50%, #eb4d4b 100%)', shape: '50% 50% 50% 0', opacity: 0.85 },
    { left: '76%', fallAnimation: 'petalFallLeft', duration: '12.6s', flutterDuration: '4.0s', delay: '-8.9s', size: 19, gradient: 'linear-gradient(135deg, #ffc0cb 0%, #ff7675 60%, #c0392b 100%)', shape: '150% 0 150% 0', opacity: 0.75 },
    { left: '84%', fallAnimation: 'petalFallRight', duration: '10.8s', flutterDuration: '3.6s', delay: '-5.2s', size: 15, gradient: 'linear-gradient(135deg, #f6e58d 0%, #ffbe76 50%, #f0932b 100%)', shape: '0 150% 0 150%', opacity: 0.85 },
    { left: '92%', fallAnimation: 'petalFallLeft', duration: '11.2s', flutterDuration: '3.7s', delay: '-3.6s', size: 14, gradient: 'linear-gradient(135deg, #ff7979 0%, #eb4d4b 55%, #962d22 100%)', shape: '150% 0 150% 0', opacity: 0.8 }
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-35 overflow-hidden" aria-hidden="true">
      {petals.map((p, idx) => (
        <div
          key={idx}
          className="absolute pointer-events-none"
          style={{
            left: p.left,
            top: 0,
            animation: `${p.fallAnimation} ${p.duration} linear infinite`,
            animationDelay: p.delay,
            willChange: 'transform, opacity'
          }}
        >
          {/* Inner Fluttering Petal Leaf with Hardware-Accelerated 2D Scale/Sway */}
          <div
            className="shadow-sm"
            style={{
              width: `${p.size}px`,
              height: `${p.size * 1.36}px`,
              background: p.gradient,
              borderRadius: p.shape,
              opacity: p.opacity,
              boxShadow: 'inset 0 0 4px rgba(255, 255, 255, 0.4), 0 2px 4px rgba(95, 37, 15, 0.12)',
              animation: `petalFlutter ${p.flutterDuration} ease-in-out infinite alternate`,
              willChange: 'transform'
            }}
          />
        </div>
      ))}
    </div>
  );
};
