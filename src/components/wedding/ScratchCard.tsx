import { useState, useEffect, useRef } from "react";

export function ScratchCard() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [percentScratched, setPercentScratched] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    const resizeCanvas = () => {
      const { width, height } = container.getBoundingClientRect();
      canvas.width = width;
      canvas.height = height;
      fillFoil(ctx, width, height);
    };

    const fillFoil = (context: CanvasRenderingContext2D, w: number, h: number) => {
      const gradient = context.createLinearGradient(0, 0, w, h);
      gradient.addColorStop(0, "#D4AF37");
      gradient.addColorStop(0.3, "#E5C158");
      gradient.addColorStop(0.5, "#FFF2C8");
      gradient.addColorStop(0.7, "#C5A059");
      gradient.addColorStop(1, "#8C6A2E");

      context.fillStyle = gradient;
      context.fillRect(0, 0, w, h);

      const imgData = context.getImageData(0, 0, w || 1, h || 1);
      const data = imgData.data;
      for (let i = 0; i < data.length; i += 4) {
        const noise = (Math.random() - 0.5) * 30;
        data[i]! = Math.min(255, Math.max(0, data[i]! + noise));
        data[i + 1] = Math.min(255, Math.max(0, data[i + 1]! + noise));
        data[i + 2] = Math.min(255, Math.max(0, data[i + 2]! + noise));
      }
      context.putImageData(imgData, 0, 0);

      context.font = "500 16px sans-serif";
      context.fillStyle = "rgba(92, 73, 56, 0.8)";
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.fillText("✨ Scratch to Reveal the Date ✨", w / 2, h / 2);
    };

    resizeCanvas();

    ctx.globalCompositeOperation = "destination-out";
    ctx.lineWidth = 40;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  const handleScratch = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing || isRevealed) return;

    // In React 19+ you generally cannot preventDefault on touchMove easily
    // unless you attach a passive: false listener. For now we just let it be.

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    let x, y;

    if ("touches" in e) {
      x = e.touches[0]!.clientX - rect.left;
      y = e.touches[0]!.clientY - rect.top;
    } else {
      x = (e as React.MouseEvent).clientX - rect.left;
      y = (e as React.MouseEvent).clientY - rect.top;
    }

    ctx.lineTo(x, y);
    ctx.stroke();

    if (Math.random() > 0.8) {
      checkScratchPercent();
    }
  };

  const startScratch = (e: React.MouseEvent | React.TouchEvent) => {
    if (isRevealed) return;
    setIsDrawing(true);
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx || !canvas) return;

    const rect = canvas.getBoundingClientRect();
    let x, y;

    if ("touches" in e) {
      x = e.touches[0]!.clientX - rect.left;
      y = e.touches[0]!.clientY - rect.top;
    } else {
      x = (e as React.MouseEvent).clientX - rect.left;
      y = (e as React.MouseEvent).clientY - rect.top;
    }

    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const endScratch = () => {
    setIsDrawing(false);
  };

  const checkScratchPercent = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imgData.data;
    let transparentPixels = 0;
    const totalPixels = data.length / 4;

    for (let i = 3; i < data.length; i += 4) {
      if (data[i]! === 0) {
        transparentPixels++;
      }
    }

    const percentage = (transparentPixels / totalPixels) * 100;
    setPercentScratched(percentage);

    if (percentage > 45 && !isRevealed) {
      revealAll();
    }
  };

  const revealAll = () => {
    setIsRevealed(true);
    window.dispatchEvent(new Event("triggerPetalBurst"));

    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.style.transition = "opacity 1s ease-out";
    canvas.style.opacity = "0";

    setTimeout(() => {
      canvas.style.display = "none";
    }, 1000);
  };

  return (
    <div className="flex flex-col items-center justify-center my-16 w-full max-w-lg mx-auto px-4">
      <div
        ref={containerRef}
        className="relative w-full aspect-[21/9] rounded-xl overflow-hidden glass-card flex items-center justify-center shadow-lg border border-gold/40 touch-none"
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
          <span className="font-sans text-xs tracking-[0.2em] text-bronze uppercase mb-1">
            Save the Date
          </span>
          <h3 className="font-display text-2xl sm:text-3xl text-espresso">28 · 29 · 30</h3>
          <span className="font-serif text-lg text-gold-deep italic mt-1">November 2026</span>
        </div>

        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full cursor-pointer z-10"
          onMouseDown={startScratch}
          onMouseMove={handleScratch}
          onMouseUp={endScratch}
          onMouseLeave={endScratch}
          onTouchStart={startScratch}
          onTouchMove={handleScratch}
          onTouchEnd={endScratch}
        />
      </div>

      {!isRevealed && (
        <button
          onClick={revealAll}
          className="mt-4 text-xs font-sans tracking-widest uppercase text-bronze/60 hover:text-bronze underline underline-offset-4 transition-colors"
        >
          Tap to Reveal
        </button>
      )}
    </div>
  );
}
