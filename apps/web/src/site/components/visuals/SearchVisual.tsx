import type { VisualProps } from './types';

/** Generated from 02-search-across-every-board.svg (design handoff, 11 Oct 2026). Text is set in Geist through `.site-visual` (site.css). */
export function SearchVisual({ idPrefix = '', className, decorative = false }: VisualProps) {
  const p = `search-${idPrefix}`;
  return (
    <svg
      viewBox="0 0 720 480"
      className={['site-visual', className].filter(Boolean).join(' ')}
      {...(decorative ? { 'aria-hidden': true } : { role: 'img', 'aria-label': "Search filters with criteria chips and a list of job boards to search, each with an on or off toggle" })}
    >
      <defs>
      <linearGradient id={`${p}bg02`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#ABC8FF" /><stop offset="1" stopColor="#BBD9FF" /></linearGradient><linearGradient id={`${p}fm02`} x1="0" y1="0" x2="0" y2="1"><stop offset="0.7" stopColor="#fff" /><stop offset="1" stopColor="#000" /></linearGradient><mask id={`${p}m02`} maskUnits="userSpaceOnUse" x="0" y="0" width="720" height="480"><rect width="720" height="480" fill={`url(#${p}fm02)`} /></mask>
      <filter id={`${p}sh2`} x="-10%" y="-10%" width="120%" height="130%"><feDropShadow dx="0" dy="6" stdDeviation="10" floodColor="#3C1E5A" floodOpacity="0.10" /></filter>
      </defs>
      <rect width="720" height="480" fill={`url(#${p}bg02)`} />
      <g mask={`url(#${p}m02)`}>
      <g filter={`url(#${p}sh2)`}><rect x="88" y="44" width="544" height="420" rx="18" fill="#FFFFFF" stroke="#ECE7F1" /></g>
      <rect x="116" y="72" width="488" height="52" rx="12" fill="#F8F6FA" stroke="#ECE7F1" />
      <circle cx="145" cy="96" r="9" stroke="#1F0D2C" strokeWidth="2.2" fill="none" /><path d="M152 103 l7 7" stroke="#1F0D2C" strokeWidth="2.2" strokeLinecap="round" />
      <text x="170" y="104" fontSize="20" fontWeight="600">Product Designer</text>
      <g fontSize="16" fontWeight="600">
      <rect x="116" y="140" width="96" height="36" rx="18" fill="#1F0D2C" /><text x="164" y="164" textAnchor="middle" fill="#FFFFFF" style={{ fill: "#FFFFFF" }}>Paris</text>
      <rect x="220" y="140" width="96" height="36" rx="18" fill="#F1EDF5" /><text x="268" y="164" textAnchor="middle">Hybrid</text>
      <rect x="324" y="140" width="122" height="36" rx="18" fill="#F1EDF5" /><text x="385" y="164" textAnchor="middle">Permanent</text>
      <rect x="454" y="140" width="96" height="36" rx="18" fill="#F1EDF5" /><text x="502" y="164" textAnchor="middle">€55k+</text>
      </g>
      <line x1="116" x2="604" y1="198" y2="198" stroke="#F1EDF5" />
      <text x="116" y="228" fontSize="15" className="m">Search on</text>
      <g fontSize="17" fontWeight="600">
      <rect x="116" y="244" width="28" height="28" rx="8" fill="#FFF0B8" /><text x="158" y="264">Welcome to the Jungle</text>
      <rect x="552" y="246" width="44" height="24" rx="12" fill="#1F0D2C" /><circle cx="584" cy="258" r="9" fill="#FFFFFF" />
      <rect x="116" y="288" width="28" height="28" rx="8" fill="#DCE8FF" /><text x="158" y="308">LinkedIn</text>
      <rect x="552" y="290" width="44" height="24" rx="12" fill="#1F0D2C" /><circle cx="584" cy="302" r="9" fill="#FFFFFF" />
      <rect x="116" y="332" width="28" height="28" rx="8" fill="#EBDCFB" /><text x="158" y="352">Indeed</text>
      <rect x="552" y="334" width="44" height="24" rx="12" fill="#1F0D2C" /><circle cx="584" cy="346" r="9" fill="#FFFFFF" />
      <rect x="116" y="376" width="28" height="28" rx="8" fill="#FFE1CF" /><text x="158" y="396" className="m">HelloWork</text>
      <rect x="552" y="378" width="44" height="24" rx="12" fill="#E4DEEA" /><circle cx="564" cy="390" r="9" fill="#FFFFFF" />
      </g>
      </g>
    </svg>
  );
}
