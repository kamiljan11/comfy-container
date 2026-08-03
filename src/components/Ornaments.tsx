// Road extending to horizon — full-hero landscape. Vanishing point in upper third, road fills lower portion.
export const JourneyPath = ({ className = "" }: { className?: string }) => (
  <svg
    viewBox="0 0 1600 900"
    preserveAspectRatio="xMidYMid slice"
    className={className}
    aria-hidden
  >
    <defs>
      <linearGradient id="asphalt" x1="50%" y1="0%" x2="50%" y2="100%">
        <stop offset="0%" stopColor="currentColor" stopOpacity="0" />
        <stop offset="40%" stopColor="currentColor" stopOpacity="0.18" />
        <stop offset="100%" stopColor="currentColor" stopOpacity="0.55" />
      </linearGradient>
      <linearGradient id="ridgeFade" x1="50%" y1="0%" x2="50%" y2="100%">
        <stop offset="0%" stopColor="currentColor" stopOpacity="0.16" />
        <stop offset="100%" stopColor="currentColor" stopOpacity="0.03" />
      </linearGradient>
      <linearGradient id="lineFade" x1="50%" y1="0%" x2="50%" y2="100%">
        <stop offset="0%" stopColor="currentColor" stopOpacity="0.15" />
        <stop offset="100%" stopColor="currentColor" stopOpacity="0.85" />
      </linearGradient>
      <radialGradient id="vanishGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="currentColor" stopOpacity="0.5" />
        <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
      </radialGradient>
    </defs>

    {/* horizon glow — soft sun-on-horizon halo at vanishing point */}
    <ellipse cx="800" cy="380" rx="450" ry="60" fill="url(#vanishGlow)" />

    {/* far mountain ridges — multiple layers for depth */}
    <path
      d="M0 360 Q 200 340 400 350 Q 600 326 800 340 Q 1000 326 1200 348 Q 1400 336 1600 354 L1600 390 L0 390 Z"
      fill="url(#ridgeFade)"
    />
    <path
      d="M0 380 Q 250 366 460 372 Q 700 360 940 370 Q 1180 362 1400 372 L1600 376 L1600 400 L0 400 Z"
      fill="currentColor"
      opacity="0.08"
    />

    {/* horizon line where ground meets sky */}
    <line
      x1="0"
      y1="380"
      x2="1600"
      y2="380"
      stroke="currentColor"
      strokeWidth="0.5"
      opacity="0.18"
    />

    {/* ROAD — vanishing point at (800, 380), bottom corners at (220, 900) and (1380, 900) */}
    <path d="M 800 380 L 220 900 L 1380 900 Z" fill="url(#asphalt)" />

    {/* outer shoulder lines */}
    <line
      x1="800"
      y1="380"
      x2="220"
      y2="900"
      stroke="url(#lineFade)"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <line
      x1="800"
      y1="380"
      x2="1380"
      y2="900"
      stroke="url(#lineFade)"
      strokeWidth="2"
      strokeLinecap="round"
    />

    {/* center dashed lane — scales with perspective */}
    <g stroke="url(#lineFade)" fill="none" strokeLinecap="round">
      <line x1="800" y1="392" x2="800" y2="404" strokeWidth="1.2" />
      <line x1="800" y1="418" x2="800" y2="436" strokeWidth="1.6" />
      <line x1="800" y1="454" x2="800" y2="478" strokeWidth="2.2" />
      <line x1="800" y1="500" x2="800" y2="532" strokeWidth="2.8" />
      <line x1="800" y1="558" x2="800" y2="600" strokeWidth="3.6" />
      <line x1="800" y1="630" x2="800" y2="682" strokeWidth="4.6" />
      <line x1="800" y1="716" x2="800" y2="784" strokeWidth="5.8" />
      <line x1="800" y1="824" x2="800" y2="900" strokeWidth="7" />
    </g>

    {/* destination focal point */}
    <circle cx="800" cy="380" r="2.5" fill="currentColor" opacity="0.8" />

    {/* sparse roadside texture — grass/scrub hints */}
    <g stroke="currentColor" strokeWidth="0.5" opacity="0.16" strokeLinecap="round">
      <line x1="100" y1="700" x2="108" y2="684" />
      <line x1="180" y1="760" x2="186" y2="744" />
      <line x1="60" y1="800" x2="66" y2="784" />
      <line x1="220" y1="850" x2="226" y2="834" />
      <line x1="40" y1="860" x2="46" y2="846" />
      <line x1="160" y1="880" x2="166" y2="864" />
      <line x1="1492" y1="700" x2="1500" y2="684" />
      <line x1="1414" y1="760" x2="1420" y2="744" />
      <line x1="1540" y1="800" x2="1546" y2="784" />
      <line x1="1374" y1="850" x2="1380" y2="834" />
      <line x1="1554" y1="860" x2="1560" y2="846" />
      <line x1="1434" y1="880" x2="1440" y2="864" />
    </g>

    {/* a few faint stars/dots in upper sky for atmospheric depth */}
    <g fill="currentColor">
      <circle cx="180" cy="120" r="0.8" opacity="0.35" />
      <circle cx="340" cy="80" r="0.6" opacity="0.3" />
      <circle cx="520" cy="160" r="0.9" opacity="0.4" />
      <circle cx="280" cy="220" r="0.5" opacity="0.25" />
      <circle cx="1080" cy="100" r="0.7" opacity="0.32" />
      <circle cx="1280" cy="180" r="0.9" opacity="0.4" />
      <circle cx="1440" cy="140" r="0.6" opacity="0.28" />
      <circle cx="1180" cy="240" r="0.5" opacity="0.22" />
    </g>
  </svg>
);

// Stub aliases for backwards compat
export const Horizon = JourneyPath;
export const HorizonTrees = () => null;

// Open hands — minimal, sumi-e brushstroke style. Two hands, palms up, slightly inclined toward each other.
export const OpenHands = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 240 120" className={className} aria-hidden>
    <g
      stroke="currentColor"
      fill="none"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* left hand — palm up, fingers curving inward toward center */}
      <g transform="translate(20, 30) rotate(-12)">
        {/* palm cup */}
        <path d="M 8 50 Q 12 30 32 24 Q 56 18 80 22 Q 92 26 96 36" opacity="0.85" />
        {/* wrist line */}
        <path d="M 0 56 Q 6 52 12 50" opacity="0.6" strokeWidth="1" />
        {/* fingers — gentle curves indicating relaxed open hand */}
        <path d="M 32 24 Q 30 14 34 6" opacity="0.75" />
        <path d="M 48 20 Q 48 9 52 2" opacity="0.75" />
        <path d="M 64 19 Q 66 9 72 4" opacity="0.7" />
        <path d="M 78 22 Q 82 14 88 12" opacity="0.65" />
        {/* thumb */}
        <path d="M 14 44 Q 8 38 6 30" opacity="0.7" />
        {/* subtle palm crease */}
        <path d="M 24 38 Q 40 34 60 36" opacity="0.4" strokeWidth="0.8" />
      </g>

      {/* right hand — mirror, slightly different angle */}
      <g transform="translate(220, 30) rotate(12) scale(-1, 1)">
        <path d="M 8 50 Q 12 30 32 24 Q 56 18 80 22 Q 92 26 96 36" opacity="0.85" />
        <path d="M 0 56 Q 6 52 12 50" opacity="0.6" strokeWidth="1" />
        <path d="M 32 24 Q 30 14 34 6" opacity="0.75" />
        <path d="M 48 20 Q 48 9 52 2" opacity="0.75" />
        <path d="M 64 19 Q 66 9 72 4" opacity="0.7" />
        <path d="M 78 22 Q 82 14 88 12" opacity="0.65" />
        <path d="M 14 44 Q 8 38 6 30" opacity="0.7" />
        <path d="M 24 38 Q 40 34 60 36" opacity="0.4" strokeWidth="0.8" />
      </g>

      {/* small connecting dot/center mark — what's offered between the hands */}
      <circle cx="120" cy="60" r="2" fill="currentColor" opacity="0.6" />
      <circle
        cx="120"
        cy="60"
        r="6"
        stroke="currentColor"
        fill="none"
        strokeWidth="0.6"
        opacity="0.3"
      />
    </g>
  </svg>
);

// Sumi-e style Japanese pine — twisted trunk, cloud-pad needle clusters, diagonal corner placement
export const InkPine = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 400 400" className={className} aria-hidden preserveAspectRatio="xMaxYMax meet">
    <defs>
      <radialGradient id="needleCloud" cx="50%" cy="50%" r="60%">
        <stop offset="0%" stopColor="currentColor" stopOpacity="0.55" />
        <stop offset="60%" stopColor="currentColor" stopOpacity="0.35" />
        <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
      </radialGradient>
    </defs>

    {/* gnarled trunk — calligraphic curve from bottom-right rising left, then bending up */}
    <path
      d="M 380 400
         C 372 380 368 360 360 340
         C 348 318 322 304 298 296
         C 268 286 240 280 218 264
         C 198 250 188 230 184 208
         C 180 188 188 168 200 152
         C 212 138 226 130 240 122"
      stroke="currentColor"
      strokeWidth="6"
      fill="none"
      strokeLinecap="round"
      opacity="0.85"
    />
    {/* trunk inner shading — second pass for depth */}
    <path
      d="M 376 396 C 366 372 358 348 348 332 C 332 312 312 302 290 296"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      opacity="0.5"
    />

    {/* knot/character mark on trunk */}
    <ellipse
      cx="320"
      cy="320"
      rx="6"
      ry="3"
      fill="currentColor"
      opacity="0.4"
      transform="rotate(-30 320 320)"
    />
    <ellipse
      cx="262"
      cy="288"
      rx="5"
      ry="2.5"
      fill="currentColor"
      opacity="0.35"
      transform="rotate(15 262 288)"
    />

    {/* secondary branches reaching out */}
    {/* upper-left branch */}
    <path
      d="M 218 264 C 198 252 178 244 156 240 C 138 236 122 234 108 230"
      stroke="currentColor"
      strokeWidth="3.5"
      fill="none"
      strokeLinecap="round"
      opacity="0.8"
    />
    <path
      d="M 156 240 C 144 232 132 222 124 210"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      opacity="0.6"
    />

    {/* mid branch jutting up-left */}
    <path
      d="M 200 152 C 184 136 166 124 146 116 C 130 110 116 108 102 106"
      stroke="currentColor"
      strokeWidth="3"
      fill="none"
      strokeLinecap="round"
      opacity="0.75"
    />
    <path
      d="M 146 116 C 132 102 122 86 114 70"
      stroke="currentColor"
      strokeWidth="1.8"
      fill="none"
      strokeLinecap="round"
      opacity="0.55"
    />

    {/* top branch reaching highest */}
    <path
      d="M 240 122 C 232 108 222 96 210 84 C 198 72 184 64 168 58"
      stroke="currentColor"
      strokeWidth="2.5"
      fill="none"
      strokeLinecap="round"
      opacity="0.7"
    />

    {/* small twigs */}
    <path
      d="M 108 230 L 96 224 M 108 230 L 100 240 M 102 106 L 88 100 M 102 106 L 92 116 M 168 58 L 156 50 M 168 58 L 158 66"
      stroke="currentColor"
      strokeWidth="1.2"
      fill="none"
      strokeLinecap="round"
      opacity="0.6"
    />

    {/* needle cloud-pads (matsu style — soft elliptical clusters) */}
    {/* lower-right cluster (largest, anchoring) */}
    <ellipse
      cx="340"
      cy="335"
      rx="48"
      ry="22"
      fill="url(#needleCloud)"
      transform="rotate(-15 340 335)"
    />
    <g stroke="currentColor" strokeWidth="0.8" opacity="0.55" fill="none" strokeLinecap="round">
      <path d="M310 322 q 6 -8 14 -10" />
      <path d="M324 318 q 8 -6 18 -6" />
      <path d="M340 320 q 10 -4 22 -2" />
      <path d="M356 326 q 8 0 18 4" />
      <path d="M312 340 q 8 6 18 6" />
      <path d="M334 348 q 10 4 22 2" />
      <path d="M356 348 q 10 0 18 -4" />
    </g>

    {/* mid cluster */}
    <ellipse
      cx="120"
      cy="225"
      rx="42"
      ry="20"
      fill="url(#needleCloud)"
      transform="rotate(-8 120 225)"
    />
    <g stroke="currentColor" strokeWidth="0.8" opacity="0.5" fill="none" strokeLinecap="round">
      <path d="M90 220 q 6 -7 14 -8" />
      <path d="M106 215 q 10 -4 18 -3" />
      <path d="M126 213 q 12 0 20 4" />
      <path d="M148 218 q 8 4 12 10" />
      <path d="M92 232 q 10 5 22 5" />
      <path d="M120 240 q 10 1 20 -2" />
    </g>

    {/* upper-left cluster */}
    <ellipse
      cx="100"
      cy="92"
      rx="38"
      ry="18"
      fill="url(#needleCloud)"
      transform="rotate(-5 100 92)"
    />
    <g stroke="currentColor" strokeWidth="0.8" opacity="0.5" fill="none" strokeLinecap="round">
      <path d="M72 86 q 8 -6 16 -6" />
      <path d="M90 82 q 10 -2 18 0" />
      <path d="M110 84 q 10 2 18 6" />
      <path d="M76 100 q 10 4 22 2" />
      <path d="M104 104 q 12 0 22 -4" />
    </g>

    {/* topmost cluster */}
    <ellipse
      cx="160"
      cy="50"
      rx="28"
      ry="14"
      fill="url(#needleCloud)"
      transform="rotate(-12 160 50)"
    />
    <g stroke="currentColor" strokeWidth="0.7" opacity="0.45" fill="none" strokeLinecap="round">
      <path d="M138 46 q 8 -4 14 -4" />
      <path d="M154 42 q 8 -2 14 0" />
      <path d="M170 44 q 8 2 12 6" />
      <path d="M148 58 q 10 2 18 0" />
    </g>

    {/* small accent cluster on lower-mid */}
    <ellipse
      cx="220"
      cy="278"
      rx="22"
      ry="11"
      fill="url(#needleCloud)"
      transform="rotate(-20 220 278)"
    />

    {/* falling needles / scattered marks for atmosphere */}
    <g stroke="currentColor" strokeWidth="0.6" opacity="0.4" strokeLinecap="round">
      <line x1="290" y1="380" x2="294" y2="376" />
      <line x1="306" y1="386" x2="310" y2="382" />
      <line x1="322" y1="378" x2="326" y2="374" />
      <line x1="200" y1="290" x2="204" y2="286" />
      <line x1="178" y1="270" x2="182" y2="266" />
      <line x1="84" y1="240" x2="88" y2="236" />
    </g>

    {/* signature dot/seal mark — small red square in classic kakemono style */}
    <rect
      x="356"
      y="356"
      width="12"
      height="12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      opacity="0.35"
    />
  </svg>
);

// Keep EtchedSpruce as alias for backwards compat (no longer used but won't break imports)
export const EtchedSpruce = InkPine;

// A small standalone botanical mark — single sprig
export const Sprig = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 80 30" className={className} aria-hidden>
    <g stroke="currentColor" fill="none" strokeWidth="0.8" strokeLinecap="round">
      <path d="M2 15 Q 30 14 60 12 Q 70 11 78 10" />
      <path d="M14 15 Q 14 9 10 5" />
      <path d="M22 14 Q 22 8 18 4" />
      <path d="M30 13 Q 30 7 26 3" />
      <path d="M38 13 Q 38 7 34 3" />
      <path d="M46 12 Q 46 6 42 2" />
      <path d="M54 12 Q 54 6 50 2" />
      <ellipse
        cx="10"
        cy="5"
        rx="3"
        ry="1.4"
        transform="rotate(-50 10 5)"
        fill="currentColor"
        opacity="0.55"
      />
      <ellipse
        cx="18"
        cy="4"
        rx="3"
        ry="1.4"
        transform="rotate(-50 18 4)"
        fill="currentColor"
        opacity="0.55"
      />
      <ellipse
        cx="26"
        cy="3"
        rx="3"
        ry="1.4"
        transform="rotate(-50 26 3)"
        fill="currentColor"
        opacity="0.55"
      />
      <ellipse
        cx="34"
        cy="3"
        rx="3"
        ry="1.4"
        transform="rotate(-50 34 3)"
        fill="currentColor"
        opacity="0.55"
      />
      <ellipse
        cx="42"
        cy="2"
        rx="3"
        ry="1.4"
        transform="rotate(-50 42 2)"
        fill="currentColor"
        opacity="0.55"
      />
      <ellipse
        cx="50"
        cy="2"
        rx="3"
        ry="1.4"
        transform="rotate(-50 50 2)"
        fill="currentColor"
        opacity="0.55"
      />
    </g>
  </svg>
);
