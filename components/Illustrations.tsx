// Dekorative SVG-Illustrationen im Organic-Stil der Landingpage.
// Farben: leaf-soft #DCE8D4, forest #33613E, leaf #7CA46B, gold #DFA13C.

export function StrainsIllustration({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 300"
      className={className}
      role="img"
      aria-label="Illustration: Trichome und Sortenkarten"
    >
      <defs>
        <linearGradient id="il-s-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#EAF0DF" />
          <stop offset="1" stopColor="#DCE8D4" />
        </linearGradient>
        <radialGradient id="il-s-amber" cx="0.4" cy="0.35" r="0.9">
          <stop offset="0" stopColor="#F4C878" />
          <stop offset="1" stopColor="#DFA13C" />
        </radialGradient>
        <radialGradient id="il-s-pearl" cx="0.4" cy="0.35" r="0.9">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#DCE8D4" />
        </radialGradient>
      </defs>
      <rect width="400" height="300" rx="24" fill="url(#il-s-bg)" />
      <circle cx="345" cy="45" r="40" fill="#DFA13C" opacity="0.14" />
      <circle cx="45" cy="255" r="50" fill="#7CA46B" opacity="0.16" />
      <path d="M95 265 C85 205, 102 145, 95 95" stroke="#33613E" strokeWidth="9" fill="none" strokeLinecap="round" />
      <circle cx="95" cy="72" r="26" fill="url(#il-s-pearl)" />
      <circle cx="103" cy="63" r="6" fill="#FFFFFF" opacity="0.9" />
      <path d="M170 270 C182 195, 162 120, 170 60" stroke="#24452C" strokeWidth="10" fill="none" strokeLinecap="round" />
      <circle cx="170" cy="38" r="32" fill="url(#il-s-amber)" />
      <circle cx="180" cy="27" r="7" fill="#FFFFFF" opacity="0.9" />
      <rect x="225" y="80" width="140" height="170" rx="18" fill="#FDFCF7" />
      <rect x="245" y="105" width="100" height="12" rx="6" fill="#C9C4B4" />
      <rect x="245" y="128" width="70" height="9" rx="4.5" fill="#D8D4C6" />
      <rect x="245" y="155" width="100" height="10" rx="5" fill="#EFECE1" />
      <rect x="245" y="155" width="78" height="10" rx="5" fill="#33613E" />
      <rect x="245" y="178" width="100" height="10" rx="5" fill="#EFECE1" />
      <rect x="245" y="178" width="30" height="10" rx="5" fill="#7CA46B" />
      <rect x="245" y="208" width="72" height="24" rx="12" fill="#DCE8D4" />
      <rect x="257" y="216" width="48" height="8" rx="4" fill="#33613E" />
      <circle cx="130" cy="120" r="4" fill="#DFA13C" opacity="0.6" />
      <circle cx="210" cy="200" r="5" fill="#DFA13C" opacity="0.45" />
      <circle cx="60" cy="140" r="4" fill="#7CA46B" opacity="0.5" />
    </svg>
  );
}

export function ReviewIllustration({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 300"
      className={className}
      role="img"
      aria-label="Illustration: Bewertung mit Sternen"
    >
      <defs>
        <linearGradient id="il-r-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#EAF0DF" />
          <stop offset="1" stopColor="#DCE8D4" />
        </linearGradient>
      </defs>
      <rect width="400" height="300" rx="24" fill="url(#il-r-bg)" />
      <circle cx="55" cy="55" r="42" fill="#7CA46B" opacity="0.15" />
      <circle cx="350" cy="245" r="46" fill="#DFA13C" opacity="0.13" />
      <rect x="70" y="60" width="260" height="180" rx="20" fill="#FDFCF7" />
      <circle cx="120" cy="110" r="26" fill="#DCE8D4" />
      <path d="M120 128 C117 116, 122 104, 120 94" stroke="#33613E" strokeWidth="4" fill="none" strokeLinecap="round" />
      <circle cx="120" cy="89" r="8" fill="#DFA13C" />
      <rect x="160" y="95" width="130" height="12" rx="6" fill="#C9C4B4" />
      <rect x="160" y="117" width="90" height="9" rx="4.5" fill="#D8D4C6" />
      {[0, 1, 2, 3, 4].map((i) => (
        <path
          key={i}
          d={`M${105 + i * 40} 165 l5.5 11.5 12.5 1.5 -9 8.5 2.5 12.5 -11.5 -6.5 -11.5 6.5 2.5 -12.5 -9 -8.5 12.5 -1.5 Z`}
          fill={i < 4 ? "#DFA13C" : "#E4E0D2"}
        />
      ))}
      <rect x="105" y="205" width="190" height="9" rx="4.5" fill="#E7E3D6" />
      <rect x="105" y="220" width="140" height="9" rx="4.5" fill="#E7E3D6" />
      <path d="M40 265 C36 235, 43 205, 40 180" stroke="#33613E" strokeWidth="6" fill="none" strokeLinecap="round" />
      <circle cx="40" cy="167" r="15" fill="#7CA46B" />
      <circle cx="45" cy="162" r="3.5" fill="#F7F4EC" opacity="0.9" />
    </svg>
  );
}

export function ForumIllustration({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 300"
      className={className}
      role="img"
      aria-label="Illustration: Community-Austausch"
    >
      <defs>
        <linearGradient id="il-f-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#EAF0DF" />
          <stop offset="1" stopColor="#DCE8D4" />
        </linearGradient>
      </defs>
      <rect width="400" height="300" rx="24" fill="url(#il-f-bg)" />
      <circle cx="350" cy="55" r="42" fill="#7CA46B" opacity="0.15" />
      <circle cx="50" cy="250" r="46" fill="#DFA13C" opacity="0.12" />
      <path d="M70 70 h170 a18 18 0 0 1 18 18 v52 a18 18 0 0 1 -18 18 h-120 l-32 28 v-28 h-18 a18 18 0 0 1 -18 -18 v-52 a18 18 0 0 1 18 -18 z" fill="#FDFCF7" />
      <circle cx="110" cy="114" r="7" fill="#33613E" />
      <circle cx="150" cy="114" r="7" fill="#DFA13C" />
      <circle cx="190" cy="114" r="7" fill="#33613E" />
      <path d="M330 140 h-140 a16 16 0 0 0 -16 16 v44 a16 16 0 0 0 16 16 h96 l28 24 v-24 h16 a16 16 0 0 0 16 -16 v-44 a16 16 0 0 0 -16 -16 z" fill="#33613E" />
      <rect x="195" y="165" width="110" height="9" rx="4.5" fill="#DCE8D4" opacity="0.85" />
      <rect x="195" y="184" width="80" height="9" rx="4.5" fill="#DCE8D4" opacity="0.6" />
      <path d="M60 235 C56 210, 63 185, 60 165" stroke="#33613E" strokeWidth="6" fill="none" strokeLinecap="round" />
      <circle cx="60" cy="153" r="14" fill="#7CA46B" />
      <circle cx="64.5" cy="148.5" r="3.2" fill="#F7F4EC" opacity="0.9" />
      <circle cx="345" cy="240" r="4.5" fill="#DFA13C" opacity="0.5" />
      <circle cx="320" cy="105" r="4" fill="#DFA13C" opacity="0.5" />
    </svg>
  );
}
