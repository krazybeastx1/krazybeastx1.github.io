/**
 * Abstract Omen-inspired sigil for the About panel: layered rings, a violet
 * core and tactical tick marks. Pure SVG + CSS rotation (composited, cheap).
 */
export default function ShadowSigil() {
  return (
    <div className="sigil" aria-hidden="true">
      <svg viewBox="0 0 320 320" role="presentation" focusable="false">
        <defs>
          <radialGradient id="sigilCore" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#B7B2D9" stopOpacity="0.9" />
            <stop offset="38%" stopColor="#8065D8" stopOpacity="0.55" />
            <stop offset="72%" stopColor="#5546A8" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#211A35" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="sigilStroke" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#8065D8" stopOpacity="0.9" />
            <stop offset="55%" stopColor="#5546A8" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#3D5C99" stopOpacity="0.75" />
          </linearGradient>
          <linearGradient id="sigilFade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#B7B2D9" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#B7B2D9" stopOpacity="0" />
          </linearGradient>
        </defs>

        <circle cx="160" cy="160" r="118" fill="url(#sigilCore)" opacity="0.5" />

        <g className="sigil__spin">
          <circle
            cx="160"
            cy="160"
            r="140"
            fill="none"
            stroke="url(#sigilStroke)"
            strokeWidth="1"
            strokeDasharray="2 10"
            opacity="0.7"
          />
          <circle cx="160" cy="20" r="3" fill="#B7B2D9" />
          <circle cx="160" cy="300" r="2" fill="#8065D8" />
        </g>

        <g className="sigil__spin sigil__spin--slow">
          <circle
            cx="160"
            cy="160"
            r="112"
            fill="none"
            stroke="url(#sigilStroke)"
            strokeWidth="1.2"
            strokeDasharray="120 42 30 60"
            opacity="0.85"
          />
          <path d="M160 42v-14M160 292v14M42 160H28M292 160h14" stroke="#B7B2D9" strokeWidth="1.5" opacity="0.55" />
        </g>

        <g className="sigil__pulse">
          <circle cx="160" cy="160" r="72" fill="none" stroke="#8065D8" strokeWidth="1" opacity="0.45" />
          <circle cx="160" cy="160" r="54" fill="none" stroke="#B7B2D9" strokeWidth="1" opacity="0.25" />
        </g>

        <path
          d="M160 104l40 28v56l-40 28-40-28v-56z"
          fill="none"
          stroke="url(#sigilStroke)"
          strokeWidth="1.6"
          opacity="0.9"
        />
        <path d="M160 126l24 16v36l-24 16-24-16v-36z" fill="url(#sigilCore)" opacity="0.8" />

        <path d="M160 148v24M148 160h24" stroke="#F0EFF7" strokeWidth="1.4" opacity="0.75" />

        <g opacity="0.55">
          <path d="M96 160l-14 8v-16z" fill="#8065D8" />
          <path d="M224 160l14-8v16z" fill="#8065D8" />
        </g>

        <path d="M60 260h200" stroke="url(#sigilFade)" strokeWidth="1" opacity="0.5" />
        <path d="M60 64h200" stroke="url(#sigilFade)" strokeWidth="1" opacity="0.3" />
      </svg>

      <span className="sigil__label mono">shadow.profile</span>
    </div>
  );
}
