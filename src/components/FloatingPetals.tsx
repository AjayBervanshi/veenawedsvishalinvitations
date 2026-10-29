import React, { useEffect, useRef } from 'react';

interface Petal {
  x: number;
  y: number;
  size: number;
  speedY: number;
  swaySpeed: number;
  swayAmp: number;
  swayPhase: number;
  rotX: number;
  rotY: number;
  rotZ: number;
  spinX: number;
  spinY: number;
  spinZ: number;
  type: 'marigold' | 'rose' | 'lotus' | 'saffron';
  colorGrad: [string, string];
  opacity: number;
  scrollFactor: number;
}

export const FloatingPetals: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = 0;
    let height = 0;
    let dpr = 1;

    // Track scroll velocity for realistic air-displacement and scroll following
    let lastScrollY = window.scrollY || window.pageYOffset || 0;
    let scrollVelocity = 0;

    // Track pointer movement for gentle air turbulence
    let pointerX = -1000;
    let pointerY = -1000;
    let pointerActive = false;
    let pointerTimeout: ReturnType<typeof setTimeout> | null = null;

    const palette: { type: Petal['type']; grad: [string, string] }[] = [
      { type: 'marigold', grad: ['#f39c12', '#d35400'] },
      { type: 'marigold', grad: ['#f1c40f', '#e67e22'] },
      { type: 'rose', grad: ['#eb4d4b', '#b71540'] },
      { type: 'rose', grad: ['#ff7675', '#c0392b'] },
      { type: 'lotus', grad: ['#ff9ff3', '#f368e0'] },
      { type: 'saffron', grad: ['#feca57', '#e17055'] },
      { type: 'marigold', grad: ['#f9ca24', '#f0932b'] }
    ];

    const createPetal = (startY?: number): Petal => {
      const pick = palette[Math.floor(Math.random() * palette.length)];
      return {
        x: Math.random() * (width || window.innerWidth),
        y: startY !== undefined ? startY : Math.random() * (height || window.innerHeight),
        size: Math.random() * 7 + 10, // 10px to 17px
        speedY: Math.random() * 1.1 + 0.8, // 0.8 to 1.9 px/frame
        swaySpeed: Math.random() * 0.02 + 0.015,
        swayAmp: Math.random() * 1.2 + 0.6,
        swayPhase: Math.random() * Math.PI * 2,
        rotX: Math.random() * Math.PI * 2,
        rotY: Math.random() * Math.PI * 2,
        rotZ: Math.random() * Math.PI * 2,
        spinX: (Math.random() - 0.5) * 0.035,
        spinY: (Math.random() - 0.5) * 0.045,
        spinZ: (Math.random() - 0.5) * 0.025,
        type: pick.type,
        colorGrad: pick.grad,
        opacity: Math.random() * 0.25 + 0.72, // 0.72 - 0.97
        scrollFactor: Math.random() * 0.4 + 0.8
      };
    };

    let petals: Petal[] = [];

    const handleResize = () => {
      if (!canvas) return;
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);

      // Determine petal count based on screen width (mobile friendly)
      const targetCount = width < 768 ? 24 : 38;

      if (petals.length === 0) {
        // Initial distribution across entire viewport height so screen is instantly lush
        petals = Array.from({ length: targetCount }, () => createPetal());
      } else if (petals.length < targetCount) {
        while (petals.length < targetCount) {
          petals.push(createPetal(-20));
        }
      } else if (petals.length > targetCount) {
        petals = petals.slice(0, targetCount);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Scroll listener: Computes scroll delta so petals physically follow the invitation motion
    const handleScroll = () => {
      const currentScrollY = window.scrollY || window.pageYOffset || 0;
      const delta = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;

      // Cap delta to prevent extreme jumps on instant teleports
      const clampedDelta = Math.max(-45, Math.min(45, delta));
      scrollVelocity += clampedDelta * 0.08;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Pointer move listener: Soft interactive breeze
    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      let clientX = 0;
      let clientY = 0;
      if ('touches' in e && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else if ('clientX' in e) {
        clientX = (e as MouseEvent).clientX;
        clientY = (e as MouseEvent).clientY;
      }
      pointerX = clientX;
      pointerY = clientY;
      pointerActive = true;

      if (pointerTimeout) clearTimeout(pointerTimeout);
      pointerTimeout = setTimeout(() => {
        pointerActive = false;
      }, 500);
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });

    let tick = 0;

    // Draw an organic petal shape with curved bezier edges
    const drawPetal = (p: Petal) => {
      ctx.save();
      ctx.translate(p.x, p.y);

      // 3D pitch/roll tumbling via 2D scale projection
      const scaleX = Math.cos(p.rotX);
      const scaleY = Math.sin(p.rotY) * 0.85 + 0.15;
      ctx.rotate(p.rotZ);
      ctx.scale(Math.abs(scaleX) < 0.05 ? 0.05 : scaleX, scaleY);

      // Radial or linear shading based on petal type
      const gradient = ctx.createLinearGradient(0, -p.size, 0, p.size);
      gradient.addColorStop(0, p.colorGrad[0]);
      gradient.addColorStop(1, p.colorGrad[1]);

      ctx.fillStyle = gradient;
      ctx.globalAlpha = p.opacity;

      ctx.beginPath();
      if (p.type === 'rose') {
        // Full, curvaceous rose petal
        ctx.moveTo(0, -p.size);
        ctx.bezierCurveTo(p.size * 0.8, -p.size * 0.7, p.size * 0.9, p.size * 0.5, 0, p.size);
        ctx.bezierCurveTo(-p.size * 0.9, p.size * 0.5, -p.size * 0.8, -p.size * 0.7, 0, -p.size);
      } else if (p.type === 'lotus') {
        // Slender elegant lotus petal
        ctx.moveTo(0, -p.size * 1.1);
        ctx.bezierCurveTo(p.size * 0.6, -p.size * 0.4, p.size * 0.5, p.size * 0.7, 0, p.size);
        ctx.bezierCurveTo(-p.size * 0.5, p.size * 0.7, -p.size * 0.6, -p.size * 0.4, 0, -p.size * 1.1);
      } else {
        // Classic Indian Marigold & Saffron droplet petal
        ctx.moveTo(0, -p.size);
        ctx.bezierCurveTo(p.size * 0.75, -p.size * 0.5, p.size * 0.75, p.size * 0.6, 0, p.size);
        ctx.bezierCurveTo(-p.size * 0.75, p.size * 0.6, -p.size * 0.75, -p.size * 0.5, 0, -p.size);
      }
      ctx.fill();

      // Delicate subtle inner gold sheen highlight
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.lineWidth = 0.8;
      ctx.moveTo(0, -p.size * 0.7);
      ctx.quadraticCurveTo(p.size * 0.15, 0, 0, p.size * 0.6);
      ctx.stroke();

      ctx.restore();
    };

    const render = () => {
      tick++;
      ctx.clearRect(0, 0, width, height);

      // Smooth decay of scroll air-displacement velocity
      scrollVelocity *= 0.92;
      if (Math.abs(scrollVelocity) < 0.01) scrollVelocity = 0;

      for (let i = 0; i < petals.length; i++) {
        const p = petals[i];

        // Horizontal sinusoidal sway
        const sway = Math.sin(tick * p.swaySpeed + p.swayPhase) * p.swayAmp;
        p.x += sway;

        // Vertical continuous fall coupled with scroll velocity
        // When user scrolls down quickly, petals naturally lift or drift with air draft
        const effectiveSpeedY = p.speedY + scrollVelocity * p.scrollFactor;
        p.y += effectiveSpeedY;

        // 3D tumbling rotation increments
        p.rotX += p.spinX;
        p.rotY += p.spinY;
        p.rotZ += p.spinZ;

        // Interactive touch/pointer repulsion breeze
        if (pointerActive) {
          const dx = p.x - pointerX;
          const dy = p.y - pointerY;
          const distSq = dx * dx + dy * dy;
          const radiusSq = 85 * 85;

          if (distSq < radiusSq && distSq > 0) {
            const dist = Math.sqrt(distSq);
            const force = (1 - dist / 85) * 2.8;
            p.x += (dx / dist) * force;
            p.y += (dy / dist) * force;
            p.rotZ += force * 0.1;
          }
        }

        // Seamless infinite wrap-around without popping
        if (p.y > height + 35) {
          // Exited bottom: Recycle to top with fresh random parameters
          p.y = -25 - Math.random() * 20;
          p.x = Math.random() * width;
          p.rotX = Math.random() * Math.PI * 2;
          p.rotY = Math.random() * Math.PI * 2;
        } else if (p.y < -40 && effectiveSpeedY < 0) {
          // Exited top (due to rapid upward scroll): Recycle to bottom
          p.y = height + 20;
          p.x = Math.random() * width;
        }

        // Horizontal wrap-around for side-drifting petals
        if (p.x < -30) p.x = width + 20;
        else if (p.x > width + 30) p.x = -20;

        drawPetal(p);
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
      if (pointerTimeout) clearTimeout(pointerTimeout);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-35 overflow-hidden" aria-hidden="true">
      <canvas ref={canvasRef} className="w-full h-full pointer-events-none block" />
    </div>
  );
};
