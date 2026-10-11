import type { VisualProps } from './types';

/** Generated from 03-be-the-first-to-know.svg (design handoff, 11 Oct 2026). Text is set in Geist through `.site-visual` (site.css). */
export function AlertsVisual({ idPrefix = '', className, decorative = false }: VisualProps) {
  const p = `alerts-${idPrefix}`;
  return (
    <svg
      viewBox="0 0 720 480"
      className={['site-visual', className].filter(Boolean).join(' ')}
      {...(decorative ? { 'aria-hidden': true } : { role: 'img', 'aria-label': "A stack of notifications announcing new matching offers, the top one with an Apply button" })}
    >
      <defs>
      <linearGradient id={`${p}bg03`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#B5D5BD" /><stop offset="1" stopColor="#C1EABE" /></linearGradient><linearGradient id={`${p}fm03`} x1="0" y1="0" x2="0" y2="1"><stop offset="0.7" stopColor="#fff" /><stop offset="1" stopColor="#000" /></linearGradient><mask id={`${p}m03`} maskUnits="userSpaceOnUse" x="0" y="0" width="720" height="480"><rect width="720" height="480" fill={`url(#${p}fm03)`} /></mask>
      <filter id={`${p}sh3`} x="-10%" y="-20%" width="120%" height="150%"><feDropShadow dx="0" dy="6" stdDeviation="10" floodColor="#3C1E5A" floodOpacity="0.12" /></filter>
      </defs>
      <rect width="720" height="480" fill={`url(#${p}bg03)`} />
      <g mask={`url(#${p}m03)`}>
      <g transform="translate(330 40)">
      <circle cx="30" cy="30" r="30" fill="#FFFFFF" stroke="#ECE7F1" />
      <path d="M20 36 v-8 a10 10 0 0 1 20 0 v8 l3 4 h-26 z M26 43 a4 4 0 0 0 8 0" stroke="#1F0D2C" strokeWidth="2.2" fill="none" strokeLinejoin="round" strokeLinecap="round" />
      <circle cx="48" cy="12" r="11" fill="#1F0D2C" /><text x="48" y="17" fontSize="13" fontWeight="600" textAnchor="middle" style={{ fill: "#FFFFFF" }}>3</text>
      </g>
      <rect x="140" y="292" width="440" height="96" rx="18" fill="#FFFFFF" opacity="0.55" />
      <g filter={`url(#${p}sh3)`}><rect x="118" y="230" width="484" height="100" rx="18" fill="#FFFFFF" stroke="#ECE7F1" /></g>
      <rect x="142" y="256" width="44" height="44" rx="12" fill="#DCE8FF" /><text x="164" y="285" fontSize="18" fontWeight="600" textAnchor="middle">C</text>
      <text x="202" y="272" fontSize="18" fontWeight="600">Product Designer, Design System</text>
      <text x="202" y="298" fontSize="16" className="m">Cobaltine · Paris · 1 h ago</text>
      <g filter={`url(#${p}sh3)`}><rect x="96" y="120" width="528" height="124" rx="20" fill="#FFFFFF" stroke="#ECE7F1" /></g>
      <rect x="120" y="148" width="52" height="52" rx="14" fill="#FFE1CF" /><text x="146" y="182" fontSize="21" fontWeight="600" textAnchor="middle">F</text>
      <text x="188" y="164" fontSize="15" className="m">New offer for “Product Designer, Paris”</text>
      <text x="188" y="192" fontSize="20" fontWeight="600">Senior Product Designer</text>
      <text x="188" y="220" fontSize="16" className="m">Ferma · Hybrid · 2 min ago</text>
      <rect x="500" y="160" width="100" height="44" rx="22" fill="#1F0D2C" /><text x="550" y="188" fontSize="17" fontWeight="600" textAnchor="middle" style={{ fill: "#FFFFFF" }}>Apply</text>
      </g>
    </svg>
  );
}
