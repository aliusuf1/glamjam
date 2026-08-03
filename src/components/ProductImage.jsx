function Shape({ type, color }) {
  const gold = "#c19a55";
  switch (type) {
    case "lipstick":
      return (
        <g>
          <rect x="78" y="40" width="24" height="46" rx="4" fill={color} />
          <path d="M78 40 L90 14 L102 40 Z" fill={color} />
          <rect x="74" y="86" width="32" height="18" rx="3" fill={gold} />
          <rect x="72" y="104" width="36" height="58" rx="6" fill="#2a141d" />
          <rect x="72" y="104" width="36" height="10" rx="4" fill={gold} opacity="0.6" />
        </g>
      );
    case "mascara":
      return (
        <g>
          <rect x="82" y="20" width="16" height="10" rx="2" fill={gold} />
          <rect x="84" y="30" width="12" height="34" fill="#2a141d" />
          <rect x="70" y="64" width="40" height="80" rx="10" fill={color} />
          <rect x="70" y="64" width="40" height="14" rx="6" fill="#2a141d" opacity="0.25" />
        </g>
      );
    case "compact":
      return (
        <g>
          <rect x="45" y="70" width="110" height="90" rx="14" fill={color} />
          <rect x="45" y="70" width="110" height="90" rx="14" fill="none" stroke={gold} strokeWidth="3" />
          <circle cx="100" cy="115" r="28" fill="#fffdfb" opacity="0.85" />
          <circle cx="100" cy="66" r="6" fill={gold} />
        </g>
      );
    case "foundation-bottle":
      return (
        <g>
          <rect x="70" y="30" width="20" height="16" rx="3" fill={gold} />
          <rect x="60" y="46" width="80" height="100" rx="12" fill={color} opacity="0.9" />
          <rect x="60" y="46" width="80" height="26" rx="12" fill="#ffffff" opacity="0.18" />
        </g>
      );
    case "perfume":
      return (
        <g>
          <rect x="82" y="18" width="16" height="14" rx="3" fill={gold} />
          <rect x="86" y="10" width="8" height="10" rx="2" fill={gold} />
          <path d="M60 40 h60 l8 20 v80 a10 10 0 0 1 -10 10 H62 a10 10 0 0 1 -10 -10 V60 Z" fill={color} />
          <rect x="60" y="40" width="60" height="18" fill="#ffffff" opacity="0.2" />
        </g>
      );
    case "jar":
      return (
        <g>
          <rect x="52" y="60" width="96" height="80" rx="16" fill={color} />
          <rect x="52" y="60" width="96" height="18" rx="9" fill={gold} />
          <rect x="60" y="86" width="80" height="14" rx="7" fill="#ffffff" opacity="0.25" />
        </g>
      );
    case "dropper":
      return (
        <g>
          <rect x="78" y="18" width="24" height="20" rx="4" fill={gold} />
          <rect x="86" y="38" width="8" height="26" fill="#8a5b6e" opacity="0.5" />
          <path d="M64 64 h52 v66 a26 26 0 0 1 -52 0 Z" fill={color} />
          <rect x="64" y="64" width="52" height="16" fill="#ffffff" opacity="0.2" />
        </g>
      );
    case "pump-bottle":
      return (
        <g>
          <rect x="82" y="16" width="16" height="22" rx="3" fill={gold} />
          <rect x="70" y="38" width="40" height="12" rx="4" fill="#8a5b6e" />
          <rect x="58" y="50" width="64" height="96" rx="10" fill={color} />
          <rect x="58" y="50" width="64" height="20" fill="#ffffff" opacity="0.2" />
        </g>
      );
    case "brush":
      return (
        <g>
          <ellipse cx="100" cy="45" rx="34" ry="26" fill={color} />
          <rect x="93" y="64" width="14" height="50" fill={gold} />
          <rect x="96" y="114" width="8" height="48" rx="4" fill="#2a141d" />
        </g>
      );
    case "pouch":
      return (
        <g>
          <path d="M55 70 h90 l-8 78 a10 10 0 0 1 -10 9 H73 a10 10 0 0 1 -10 -9 Z" fill={color} />
          <rect x="70" y="55" width="60" height="20" rx="10" fill="none" stroke={gold} strokeWidth="5" />
          <circle cx="100" cy="110" r="6" fill={gold} />
        </g>
      );
    case "mirror":
      return (
        <g>
          <circle cx="100" cy="90" r="48" fill="none" stroke={color} strokeWidth="10" />
          <circle cx="100" cy="90" r="36" fill="#fffdfb" opacity="0.8" />
          <rect x="94" y="136" width="12" height="34" rx="5" fill={gold} />
          <rect x="80" y="166" width="40" height="10" rx="5" fill={gold} />
        </g>
      );
    default:
      return <circle cx="100" cy="100" r="50" fill={color} />;
  }
}

export default function ProductImage({ type, color = "#b96f83", className = "", transparent = false }) {
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden ${
        transparent ? "" : "bg-gradient-to-br from-cream-100 to-blush-100"
      } ${className}`}
    >
      <svg viewBox="0 0 200 200" className="h-full w-full p-6" role="img" aria-hidden="true">
        <Shape type={type} color={color} />
      </svg>
    </div>
  );
}
