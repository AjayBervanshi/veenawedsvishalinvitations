// Hand-coded watercolor-style SVG motifs. Colors come from the design tokens
// via CSS variables so the whole site stays themable and light-only.

interface MotifProps {
  className?: string;
}

/** Full-width watercolor toran: mango-leaf valance with marigold clusters. */
export function Toran({ className }: MotifProps) {
  const leaves = Array.from({ length: 22 }, (_, i) => 10 + i * 18);
  const marigolds = Array.from({ length: 11 }, (_, i) => 18 + i * 36);
  return (
    <svg viewBox="0 0 400 64" className={className} aria-hidden="true">
      <defs>
        <radialGradient id="mgold" cx="35%" cy="30%">
          <stop offset="0%" stopColor="var(--haldi-mid)" />
          <stop offset="100%" stopColor="var(--haldi-deep)" />
        </radialGradient>
      </defs>
      <line x1="0" y1="6" x2="400" y2="6" stroke="var(--gold)" strokeWidth="1.4" />
      {leaves.map((x, i) => (
        <path
          key={i}
          d={`M ${x} 6 q -3 10 0 16 q 3 -6 0 -16`}
          fill="var(--sage)"
          opacity="0.85"
          transform={`rotate(${(i % 2 ? 6 : -6) + 180 * 0} ${x} 6)`}
        />
      ))}
      {marigolds.map((x, i) => (
        <g key={`m${i}`} transform={`translate(${x} ${14 + (i % 3) * 4})`}>
          <circle r="7" fill="url(#mgold)" />
          <circle r="4" fill="var(--haldi-mid)" opacity="0.9" />
          <circle r="1.6" fill="var(--haldi-deep)" />
        </g>
      ))}
      {[70, 200, 330].map((x, i) => (
        <g
          key={`b${i}`}
          className="sway"
          style={{ animationDelay: `${i * 0.6}s` }}
          transform-origin={`${x} 6`}
        >
          <line x1={x} y1="6" x2={x} y2="30" stroke="var(--gold)" strokeWidth="1" />
          <circle cx={x} cy="34" r="4" fill="var(--gold-deep)" />
          <circle cx={x} cy="34" r="1.6" fill="var(--gold)" />
        </g>
      ))}
    </svg>
  );
}

/** Madhubani-style peacock for the side vines. */
export function Peacock({ className }: MotifProps) {
  return (
    <svg viewBox="0 0 80 110" className={className} aria-hidden="true">
      <g stroke="var(--gold-ink)" strokeWidth="1" fill="none">
        <ellipse
          cx="34"
          cy="52"
          rx="9"
          ry="13"
          fill="var(--sky-deep)"
          stroke="none"
          opacity="0.85"
        />
        <circle cx="37" cy="34" r="6.5" fill="var(--sky-deep)" stroke="none" opacity="0.9" />
        <path d="M 37 34 q 6 2 10 0" stroke="var(--gold-ink)" />
        <path d="M 42 32 l 8 -3 M 42 33 l 8 1" stroke="var(--gold-ink)" strokeWidth="0.8" />
        <circle cx="52" cy="29" r="1.2" fill="var(--gold-deep)" stroke="none" />
        <circle cx="52" cy="34" r="1.2" fill="var(--gold-deep)" stroke="none" />
        <path d="M 34 64 q -2 16 4 26 M 38 64 q 2 16 -2 26" strokeWidth="1.4" />
        <path d="M 30 64 q 2 12 8 14" strokeWidth="1" opacity="0.7" />
        <path d="M 40 45 q -10 4 -16 0" strokeWidth="1.2" />
        {/* crest */}
        <path d="M 37 27 l -3 -6 M 37 27 l 1 -7 M 37 27 l 5 -5" strokeWidth="0.8" />
      </g>
      {/* fanned tail: concentric 'eyes' */}
      <g stroke="var(--gold-ink)" strokeWidth="0.7" fill="none" opacity="0.85">
        {Array.from({ length: 9 }, (_, i) => {
          const angle = -160 + i * 18;
          const rad = (angle * Math.PI) / 180;
          const cx = 34 + Math.cos(rad) * 26;
          const cy = 46 + Math.sin(rad) * 26;
          return (
            <g key={i}>
              <line x1="34" y1="46" x2={cx} y2={cy} stroke="var(--sage-deep)" opacity="0.5" />
              <circle cx={cx} cy={cy} r="5" fill="var(--sage)" fillOpacity="0.4" />
              <circle
                cx={cx}
                cy={cy}
                r="2.2"
                fill="var(--gold-deep)"
                fillOpacity="0.8"
                stroke="none"
              />
            </g>
          );
        })}
      </g>
    </svg>
  );
}

export function Lotus({ className }: MotifProps) {
  return (
    <svg viewBox="0 0 60 40" className={className} aria-hidden="true">
      <g fill="var(--blush-deep)" opacity="0.9">
        <ellipse cx="30" cy="26" rx="6" ry="12" />
        <ellipse cx="30" cy="26" rx="6" ry="12" transform="rotate(-40 30 30)" opacity="0.85" />
        <ellipse cx="30" cy="26" rx="6" ry="12" transform="rotate(40 30 30)" opacity="0.85" />
        <ellipse cx="30" cy="26" rx="5" ry="10" transform="rotate(-75 30 30)" opacity="0.7" />
        <ellipse cx="30" cy="26" rx="5" ry="10" transform="rotate(75 30 30)" opacity="0.7" />
      </g>
      <circle cx="30" cy="22" r="3" fill="var(--haldi-mid)" />
      <path d="M 12 38 q 18 -4 36 0" stroke="var(--sage-deep)" strokeWidth="1.2" fill="none" />
    </svg>
  );
}

export function LotusBud({ className, lit = false }: MotifProps & { lit?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        d="M 12 20 q -7 -6 0 -14 q 7 8 0 14"
        fill={lit ? "var(--gold-deep)" : "var(--sage)"}
        opacity={lit ? 1 : 0.75}
      />
      <path d="M 12 20 v 3" stroke="var(--sage-deep)" strokeWidth="1.2" />
    </svg>
  );
}

/** Brass Haldi urli with rippling turmeric water & floating marigolds. */
export function UrliBowl({ className }: MotifProps) {
  return (
    <svg viewBox="0 0 160 120" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="brass" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--gold-deep)" />
          <stop offset="55%" stopColor="var(--gold)" />
          <stop offset="100%" stopColor="var(--gold-ink)" />
        </linearGradient>
        <clipPath id="bowlClip">
          <path d="M 30 52 q 0 50 50 50 q 50 0 50 -50 Z" />
        </clipPath>
      </defs>
      {/* bowl */}
      <path
        d="M 30 52 q 0 50 50 50 q 50 0 50 -50"
        fill="url(#brass)"
        stroke="var(--gold-ink)"
        strokeWidth="1.2"
      />
      <ellipse
        cx="80"
        cy="52"
        rx="50"
        ry="10"
        fill="var(--gold)"
        stroke="var(--gold-ink)"
        strokeWidth="1.2"
      />
      {/* turmeric water */}
      <ellipse cx="80" cy="52" rx="42" ry="7.5" fill="var(--haldi-mid)" opacity="0.9" />
      {/* animated ripples */}
      <g clipPath="url(#bowlClip)">
        {[0, 1, 2].map((i) => (
          <circle
            key={i}
            cx="80"
            cy="56"
            r="16"
            fill="none"
            stroke="var(--cream)"
            strokeWidth="1.4"
            opacity="0"
            style={{ animation: `ripple 2.8s ease-out ${i * 0.9}s infinite` }}
          />
        ))}
      </g>
      {/* floating marigolds */}
      {[58, 96, 76].map((x, i) => (
        <g
          key={i}
          transform={`translate(${x} ${50 + (i % 2) * 2})`}
          className="drift-slow"
          style={{ animationDelay: `${i * 0.7}s` }}
        >
          <circle r="4.6" fill="var(--haldi-deep)" />
          <circle r="2.4" fill="var(--haldi-mid)" />
        </g>
      ))}
      {/* base */}
      <rect x="68" y="100" width="24" height="6" rx="3" fill="var(--gold-ink)" />
      {/* steam of turmeric blessings */}
      <g stroke="var(--haldi-deep)" strokeWidth="1" fill="none" opacity="0.5">
        <path d="M 66 40 q 4 -6 0 -12 q -4 -6 0 -12" />
        <path d="M 80 38 q 4 -6 0 -12 q -4 -6 0 -12" />
        <path d="M 94 40 q 4 -6 0 -12 q -4 -6 0 -12" />
      </g>
    </svg>
  );
}

/** Wooden dholak with floating golden music notes (notes rendered in a layer above). */
export function Dholak({ className }: MotifProps) {
  return (
    <svg viewBox="0 0 160 130" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="wood" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#C9A97E" />
          <stop offset="100%" stopColor="var(--bronze)" />
        </linearGradient>
      </defs>
      <ellipse
        cx="80"
        cy="70"
        rx="46"
        ry="52"
        fill="url(#wood)"
        stroke="var(--bronze)"
        strokeWidth="1.4"
      />
      <ellipse
        cx="80"
        cy="30"
        rx="44"
        ry="12"
        fill="var(--cream)"
        stroke="var(--bronze)"
        strokeWidth="1.4"
      />
      <ellipse
        cx="80"
        cy="30"
        rx="30"
        ry="7"
        fill="none"
        stroke="var(--gold-ink)"
        strokeWidth="1"
        opacity="0.7"
      />
      <ellipse
        cx="80"
        cy="112"
        rx="44"
        ry="12"
        fill="var(--cream)"
        stroke="var(--bronze)"
        strokeWidth="1.4"
        opacity="0.95"
      />
      {/* lacing */}
      {Array.from({ length: 10 }, (_, i) => {
        const x = 36 + i * 9.7;
        return (
          <line
            key={i}
            x1={x}
            y1="34"
            x2={x}
            y2="108"
            stroke="var(--gold-ink)"
            strokeWidth="0.8"
            opacity="0.6"
          />
        );
      })}
      <path d="M 62 44 q 18 -8 36 0" stroke="var(--gold-deep)" strokeWidth="2" fill="none" />
      {/* lotus beside */}
      <g transform="translate(122 96) scale(0.45)">
        <g fill="var(--blush-deep)" opacity="0.9">
          <ellipse cx="0" cy="0" rx="6" ry="12" />
          <ellipse cx="0" cy="0" rx="6" ry="12" transform="rotate(-40)" opacity="0.8" />
          <ellipse cx="0" cy="0" rx="6" ry="12" transform="rotate(40)" opacity="0.8" />
        </g>
      </g>
      <g transform="translate(14 100) scale(0.35)">
        <g fill="var(--blush-deep)" opacity="0.8">
          <ellipse cx="0" cy="0" rx="6" ry="12" />
          <ellipse cx="0" cy="0" rx="6" ry="12" transform="rotate(-40)" opacity="0.8" />
          <ellipse cx="0" cy="0" rx="6" ry="12" transform="rotate(40)" opacity="0.8" />
        </g>
      </g>
    </svg>
  );
}

/** Sandstone shadi mandap with flickering sacred Agni. */
export function ShadiMandap({ className }: MotifProps) {
  return (
    <svg viewBox="0 0 200 150" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="sand" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E8D5B5" />
          <stop offset="100%" stopColor="var(--gold-ink)" />
        </linearGradient>
      </defs>
      {/* pillars */}
      {[28, 148].map((x, i) => (
        <g key={i}>
          <rect
            x={x}
            y="34"
            width="12"
            height="100"
            rx="4"
            fill="url(#sand)"
            stroke="var(--gold-ink)"
            strokeWidth="1"
          />
          <rect
            x={x - 4}
            y="24"
            width="20"
            height="12"
            rx="3"
            fill="var(--gold)"
            stroke="var(--gold-ink)"
            strokeWidth="1"
          />
          <rect
            x={x - 4}
            y="130"
            width="20"
            height="10"
            rx="3"
            fill="var(--gold)"
            stroke="var(--gold-ink)"
            strokeWidth="1"
          />
        </g>
      ))}
      {/* dome canopy */}
      <path
        d="M 20 36 q 80 -34 160 0"
        fill="var(--blush)"
        opacity="0.85"
        stroke="var(--gold)"
        strokeWidth="1.4"
      />
      <path
        d="M 30 30 q 70 -28 140 0"
        fill="none"
        stroke="var(--gold)"
        strokeWidth="1"
        opacity="0.8"
      />
      <circle cx="100" cy="14" r="4" fill="var(--gold-deep)" />
      {/* marigold strings */}
      {[52, 100, 148].map((x, i) => (
        <path
          key={i}
          d={`M ${x} 36 q -3 14 0 26 q 3 -12 0 -26`}
          fill="var(--haldi-mid)"
          opacity="0.85"
        />
      ))}
      {/* sacred fire */}
      <g transform="translate(100 112)">
        <path
          d="M -12 14 q -4 -18 12 -26 q 2 8 -2 12 q 10 -4 12 -14 q 12 14 2 28 q -6 6 -12 6 q -8 0 -12 -6"
          fill="var(--haldi-deep)"
          opacity="0.9"
        />
        <path
          d="M -6 12 q -2 -10 6 -16 q 4 8 4 16 q -4 6 -10 0"
          fill="var(--haldi-mid)"
          style={{
            animation: "flicker 1.6s ease-in-out infinite",
            transformOrigin: "center bottom",
          }}
        />
        <ellipse cx="0" cy="16" rx="20" ry="5" fill="var(--gold-ink)" opacity="0.55" />
      </g>
      {/* kalash on posts */}
      <circle cx="34" cy="26" r="3" fill="var(--gold-deep)" />
      <circle cx="166" cy="26" r="3" fill="var(--gold-deep)" />
    </svg>
  );
}

/** Glowing earthen diya. */
export function Diya({ className, flame = true }: MotifProps & { flame?: boolean }) {
  return (
    <svg viewBox="0 0 40 34" className={className} aria-hidden="true">
      {flame && (
        <g style={{ animation: "flicker 1.8s ease-in-out infinite", transformOrigin: "20px 14px" }}>
          <path d="M 20 4 q 6 8 0 12 q -6 -4 0 -12" fill="var(--haldi-deep)" opacity="0.9" />
          <path d="M 20 8 q 3 4 0 7 q -3 -3 0 -7" fill="var(--haldi-mid)" />
        </g>
      )}
      <path d="M 8 20 q 12 10 24 0 q -2 8 -12 8 q -10 0 -12 -8" fill="url(#dg)" />
      <defs>
        <linearGradient id="dg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#B5651D" />
          <stop offset="100%" stopColor="var(--bronze)" />
        </linearGradient>
      </defs>
      <ellipse cx="20" cy="20" rx="12" ry="3" fill="#D98E32" />
      {flame && <circle cx="20" cy="16" r="7" fill="var(--haldi-mid)" opacity="0.25" />}
    </svg>
  );
}

/** Minimalist gold-line Ganesha motif. */
export function GaneshaLine({ className }: MotifProps) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
      <g fill="none" stroke="var(--gold-ink)" strokeWidth="1.6" strokeLinecap="round">
        {/* crown */}
        <path d="M 52 22 q 8 -14 16 0 q -8 -6 -16 0" />
        <line x1="60" y1="16" x2="60" y2="10" />
        <circle cx="60" cy="8" r="1.6" fill="var(--gold-deep)" stroke="none" />
        {/* head */}
        <circle cx="60" cy="38" r="16" />
        {/* ears */}
        <path d="M 44 36 q -12 -2 -14 8 q 8 6 14 -2" />
        <path d="M 76 36 q 12 -2 14 8 q -8 6 -14 -2" />
        {/* trunk */}
        <path d="M 60 44 q -2 12 6 16 q 8 4 8 12 q 0 6 -6 6" />
        {/* tusks */}
        <path d="M 56 50 q -6 4 -8 10" />
        {/* lotus seat */}
        <path d="M 44 66 q 16 8 32 0" />
        <path d="M 50 72 q 10 5 20 0" opacity="0.7" />
        {/* modak */}
        <path d="M 82 58 q 6 2 6 8 q -8 2 -10 -4" />
        {/* aura */}
        <circle cx="60" cy="38" r="22" opacity="0.35" strokeWidth="1" />
      </g>
    </svg>
  );
}

/** Sandstone jharokha pavilion with a hanging temple bell. */
export function Jharokha({
  className,
  side = "left",
  flip = false,
}: MotifProps & { side?: "left" | "right"; flip?: boolean }) {
  const isFlipped = side === "right" || flip;
  return (
    <svg viewBox="0 0 120 260" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="stone" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#EBD9BC" />
          <stop offset="100%" stopColor="var(--gold-ink)" />
        </linearGradient>
      </defs>
      <g transform={isFlipped ? "translate(120 0) scale(-1 1)" : undefined}>
        {/* dome top */}
        <path
          d="M 24 60 q 36 -44 72 0 Z"
          fill="url(#stone)"
          stroke="var(--gold-ink)"
          strokeWidth="1.2"
        />
        <path d="M 34 54 q 26 -30 52 0" fill="none" stroke="var(--gold)" strokeWidth="1" />
        <circle cx="60" cy="24" r="4" fill="var(--gold-deep)" />
        <line x1="60" y1="28" x2="60" y2="36" stroke="var(--gold-ink)" strokeWidth="1.4" />
        {/* arch body */}
        <path
          d="M 30 200 v -100 q 0 -40 30 -40 q 30 0 30 40 v 100 Z"
          fill="url(#stone)"
          opacity="0.9"
          stroke="var(--gold-ink)"
          strokeWidth="1.2"
        />
        <path
          d="M 40 196 v -94 q 0 -28 20 -28 q 20 0 20 28 v 94 Z"
          fill="var(--cream)"
          opacity="0.75"
          stroke="var(--gold)"
          strokeWidth="1"
        />
        {/* carved lattice */}
        <g stroke="var(--gold)" strokeWidth="0.9" opacity="0.8" fill="none">
          <path d="M 48 110 h 24 M 48 124 h 24 M 48 138 h 24 M 48 152 h 24 M 60 100 v 60" />
          <circle cx="60" cy="92" r="6" />
        </g>
        {/* hanging bell */}
        <g className="sway" transform-origin="44 36">
          <line x1="44" y1="36" x2="44" y2="58" stroke="var(--gold-ink)" strokeWidth="1.2" />
          <path
            d="M 36 58 q 8 -12 16 0 q -4 14 -8 14 q -4 0 -8 -14"
            fill="var(--gold-deep)"
            stroke="var(--gold-ink)"
            strokeWidth="1"
          />
          <circle cx="44" cy="76" r="2.2" fill="var(--gold-ink)" />
        </g>
        {/* hanging bell 2 */}
        <g className="sway" style={{ animationDelay: "0.8s" }} transform-origin="84 36">
          <line x1="84" y1="36" x2="84" y2="52" stroke="var(--gold-ink)" strokeWidth="1.2" />
          <path
            d="M 78 52 q 6 -10 12 0 q -3 12 -6 12 q -3 0 -6 -12"
            fill="var(--gold-deep)"
            stroke="var(--gold-ink)"
            strokeWidth="1"
          />
        </g>
        {/* base plinth */}
        <rect
          x="22"
          y="200"
          width="76"
          height="14"
          rx="4"
          fill="url(#stone)"
          stroke="var(--gold-ink)"
          strokeWidth="1.2"
        />
      </g>
    </svg>
  );
}

/** Vertical botanical vine with lotus stems and buds for the side gutters. */
export function Vine({ className, flip = false }: MotifProps & { flip?: boolean }) {
  return (
    <svg viewBox="0 0 60 600" preserveAspectRatio="none" className={className} aria-hidden="true">
      <g transform={flip ? "translate(60 0) scale(-1 1)" : undefined}>
        <path
          d="M 30 0 q 10 80 2 150 q -8 70 4 150 q 8 80 0 150 q -6 60 2 150"
          stroke="var(--sage-deep)"
          strokeWidth="2"
          fill="none"
          opacity="0.7"
        />
        {[80, 210, 340, 470].map((y, i) => (
          <g key={i} transform={`translate(${y % 2 === 0 ? 20 : 40} ${y})`}>
            <path d="M 0 0 q -10 4 -12 12 q 8 4 12 -12" fill="var(--sage)" opacity="0.8" />
            <circle cx="-8" cy="16" r="3.5" fill="var(--haldi-mid)" opacity="0.9" />
          </g>
        ))}
        {[140, 410].map((y, i) => (
          <g key={`b${i}`} transform={`translate(30 ${y}) scale(1.4)`}>
            <g fill="var(--blush-deep)" opacity="0.8">
              <ellipse cx="0" cy="0" rx="3" ry="6" />
              <ellipse cx="0" cy="0" rx="3" ry="6" transform="rotate(-40)" opacity="0.7" />
              <ellipse cx="0" cy="0" rx="3" ry="6" transform="rotate(40)" opacity="0.7" />
            </g>
          </g>
        ))}
      </g>
    </svg>
  );
}

/** Brushed-gold wax seal with the couple's insignia. */
export function WaxSeal({ className }: MotifProps) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
      <defs>
        <radialGradient id="wax" cx="35%" cy="30%">
          <stop offset="0%" stopColor="var(--gold-deep)" />
          <stop offset="70%" stopColor="var(--gold-ink)" />
          <stop offset="100%" stopColor="#8A6D2F" />
        </radialGradient>
      </defs>
      <circle cx="60" cy="60" r="46" fill="url(#wax)" stroke="#8A6D2F" strokeWidth="1.5" />
      <circle
        cx="60"
        cy="60"
        r="38"
        fill="none"
        stroke="var(--cream)"
        strokeWidth="1"
        opacity="0.55"
      />
      <circle
        cx="60"
        cy="60"
        r="46"
        fill="none"
        stroke="var(--gold)"
        strokeWidth="2"
        opacity="0.6"
      />
      <text
        x="60"
        y="58"
        textAnchor="middle"
        fontSize="26"
        fill="var(--cream)"
        fontFamily="Cormorant Garamond, serif"
        opacity="0.95"
      >
        V ♥ V
      </text>
      <text
        x="60"
        y="80"
        textAnchor="middle"
        fontSize="11"
        fill="var(--cream)"
        fontFamily="Tiro Devanagari Hindi, serif"
        opacity="0.9"
      >
        शुभ विवाह
      </text>
    </svg>
  );
}
