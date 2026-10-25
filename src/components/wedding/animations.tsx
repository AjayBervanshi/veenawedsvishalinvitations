import { useEffect, useRef, useState } from "react";
import { useScroll, motion, useTransform } from "framer-motion";
import { useWindowSize } from "@/hooks/use-window-size";

export function PetalCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { width, height } = useWindowSize();
  const [burstActive, setBurstActive] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !width || !height) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = width;
    canvas.height = height;

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      rotation: number;
      rotationSpeed: number;
      type: "petal" | "dust";
    }

    const particles: Particle[] = [];
    const colors = [
      "rgba(253, 164, 175, 0.6)",
      "rgba(255, 255, 255, 0.7)",
      "rgba(250, 204, 21, 0.6)",
      "rgba(212, 175, 55, 0.8)",
    ];

    const initParticles = (count: number, isBurst: boolean = false) => {
      for (let i = 0; i < count; i++) {
        const type = Math.random() > 0.8 ? "dust" : "petal";
        particles.push({
          x: isBurst ? width / 2 + (Math.random() * 200 - 100) : Math.random() * width,
          y: isBurst ? height / 2 + (Math.random() * 200 - 100) : Math.random() * height,
          vx: (Math.random() - 0.5) * (isBurst ? 5 : 1),
          vy: (Math.random() - 0.5) * (isBurst ? 5 : 1) + (isBurst ? -2 : 0.5),
          size: type === "dust" ? Math.random() * 2 + 1 : Math.random() * 8 + 4,
          color:
            (type === "dust" ? colors[3] : colors[Math.floor(Math.random() * 3)]) || colors[0]!,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.1,
          type,
        });
      }
    };

    initParticles(40);

    if (burstActive) {
      initParticles(50, true);
      setBurstActive(false);
    }

    let animationFrameId: number = 0;
    let lastScrollY = window.scrollY;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const scrollVelocity = window.scrollY - lastScrollY;
      lastScrollY = window.scrollY;

      particles.forEach((p) => {
        p.y += p.vy - scrollVelocity * 0.05;
        p.x += p.vx;
        p.rotation += p.rotationSpeed;

        if (p.y > height + 20) p.y = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.x < -20) p.x = width + 20;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);

        ctx.fillStyle = p.color;

        if (p.type === "petal") {
          ctx.beginPath();
          ctx.ellipse(0, 0, p.size, p.size / 2, 0, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, p.size, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      });

      if (particles.length > 40 && Math.random() > 0.9) {
        particles.shift();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      cancelAnimationFrame(animationFrameId);
      render();
    }

    return () => cancelAnimationFrame(animationFrameId);
  }, [width, height, burstActive]);

  useEffect(() => {
    const handleBurst = () => setBurstActive(true);
    window.addEventListener("triggerPetalBurst", handleBurst);
    return () => window.removeEventListener("triggerPetalBurst", handleBurst);
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0 opacity-70" />;
}

export function VivahSutram() {
  const { scrollYProgress } = useScroll();
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);
  }, []);

  return (
    <div className="fixed top-0 bottom-0 left-1/2 -translate-x-1/2 w-4 pointer-events-none z-0 hidden md:block opacity-20">
      <svg
        width="10"
        height="100%"
        viewBox="0 0 10 1000"
        preserveAspectRatio="none"
        className="h-full w-full stroke-[var(--color-gold-ink)] fill-none"
      >
        <motion.path
          d="M 5 0 Q 15 100 5 200 T 5 400 T 5 600 T 5 800 T 5 1000"
          style={{
            pathLength: reducedMotion ? 1 : pathLength,
            strokeDasharray: "1 1",
          }}
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}

export function SideGutters() {
  return (
    <>
      <div className="fixed left-0 top-0 bottom-0 w-10 sm:w-16 lg:w-24 pointer-events-none z-0 opacity-40 mix-blend-multiply overflow-hidden hidden sm:block">
        <svg
          viewBox="0 0 100 1000"
          preserveAspectRatio="none"
          className="w-full h-[200%] absolute top-0 left-0"
        >
          <path
            d="M 50 0 C 80 100, 20 200, 50 300 C 80 400, 20 500, 50 600 C 80 700, 20 800, 50 900 C 80 1000, 20 1100, 50 1200 C 80 1300, 20 1400, 50 1500 C 80 1600, 20 1700, 50 1800 C 80 1900, 20 2000, 50 2000"
            fill="none"
            stroke="var(--color-sage)"
            strokeWidth="2"
            opacity="0.6"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M 30 50 Q 50 70 30 90 M 70 150 Q 50 170 70 190 M 30 250 Q 50 270 30 290"
            fill="none"
            stroke="var(--color-gold)"
            strokeWidth="1.5"
            opacity="0.8"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>
      <div className="fixed right-0 top-0 bottom-0 w-10 sm:w-16 lg:w-24 pointer-events-none z-0 opacity-40 mix-blend-multiply overflow-hidden hidden sm:block">
        <svg
          viewBox="0 0 100 1000"
          preserveAspectRatio="none"
          className="w-full h-[200%] absolute top-0 right-0 transform -scale-x-100"
        >
          <path
            d="M 50 0 C 80 100, 20 200, 50 300 C 80 400, 20 500, 50 600 C 80 700, 20 800, 50 900 C 80 1000, 20 1100, 50 1200 C 80 1300, 20 1400, 50 1500 C 80 1600, 20 1700, 50 1800 C 80 1900, 20 2000, 50 2000"
            fill="none"
            stroke="var(--color-sage)"
            strokeWidth="2"
            opacity="0.6"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M 30 50 Q 50 70 30 90 M 70 150 Q 50 170 70 190 M 30 250 Q 50 270 30 290"
            fill="none"
            stroke="var(--color-gold)"
            strokeWidth="1.5"
            opacity="0.8"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>
    </>
  );
}
