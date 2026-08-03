export default function HeroBackground() {
  return (
    <svg
      viewBox="0 0 1200 700"
      preserveAspectRatio="xMidYMid slice"
      className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.16]"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="heroLineFade" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#833d51" />
          <stop offset="100%" stopColor="#c19a55" />
        </linearGradient>
      </defs>

      {/* large trailing rose branch, top right */}
      <g stroke="url(#heroLineFade)" strokeWidth="2" fill="none" strokeLinecap="round">
        <path d="M1180 40 C 1050 120, 1000 60, 900 160 C 820 240, 860 300, 760 340" />
        <path d="M980 90 C 940 70, 900 90, 890 130" />
        <path d="M880 190 C 840 180, 810 200, 800 230" />
        <circle cx="900" cy="160" r="34" />
        <circle cx="900" cy="160" r="20" />
        <path d="M868 148 q32 -30 64 0" />
        <path d="M868 172 q32 30 64 0" />
        <circle cx="820" cy="280" r="24" />
        <circle cx="820" cy="280" r="13" />
      </g>

      {/* trailing branch bottom left */}
      <g stroke="url(#heroLineFade)" strokeWidth="2" fill="none" strokeLinecap="round">
        <path d="M-20 640 C 90 560, 160 620, 260 540 C 340 480, 320 420, 420 380" />
        <path d="M150 590 C 190 610, 230 590, 240 555" />
        <circle cx="260" cy="540" r="30" />
        <circle cx="260" cy="540" r="17" />
        <path d="M231 528 q29 -26 58 0" />
        <path d="M231 552 q29 26 58 0" />
        <circle cx="380" cy="400" r="20" />
        <circle cx="380" cy="400" r="10" />
      </g>

      {/* scattered petals / dots for texture */}
      <g fill="url(#heroLineFade)" opacity="0.7">
        <circle cx="520" cy="80" r="3" />
        <circle cx="560" cy="130" r="2" />
        <circle cx="640" cy="60" r="2.5" />
        <circle cx="120" cy="220" r="3" />
        <circle cx="1050" cy="450" r="3" />
        <circle cx="1000" cy="520" r="2" />
        <circle cx="700" cy="620" r="2.5" />
      </g>

      {/* thin perfume-bottle silhouette, center-right, very subtle */}
      <g stroke="url(#heroLineFade)" strokeWidth="1.5" fill="none">
        <rect x="1080" y="520" width="60" height="90" rx="10" />
        <rect x="1098" y="500" width="24" height="20" rx="3" />
        <rect x="1104" y="486" width="12" height="16" rx="2" />
      </g>
    </svg>
  );
}
