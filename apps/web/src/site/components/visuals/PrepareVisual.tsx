import type { VisualProps } from './types';

/** Generated from 06-prepare-every-interview.svg (design handoff, 11 Oct 2026). Text is set in Geist through `.site-visual` (site.css). */
export function PrepareVisual({ idPrefix = '', className, decorative = false }: VisualProps) {
  const p = `prepare-${idPrefix}`;
  return (
    <svg
      viewBox="0 0 720 480"
      className={['site-visual', className].filter(Boolean).join(' ')}
      {...(decorative ? { 'aria-hidden': true } : { role: 'img', 'aria-label': "An interview page with a template picker by interview type, notes and a tip" })}
    >
      <defs>
      <linearGradient id={`${p}bg06`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#FFADF8" /><stop offset="1" stopColor="#FFC8FB" /></linearGradient><linearGradient id={`${p}fm06`} x1="0" y1="0" x2="0" y2="1"><stop offset="0.7" stopColor="#fff" /><stop offset="1" stopColor="#000" /></linearGradient><mask id={`${p}m06`} maskUnits="userSpaceOnUse" x="0" y="0" width="720" height="480"><rect width="720" height="480" fill={`url(#${p}fm06)`} /></mask>
      <filter id={`${p}sh6`} x="-10%" y="-10%" width="120%" height="130%"><feDropShadow dx="0" dy="6" stdDeviation="10" floodColor="#3C1E5A" floodOpacity="0.10" /></filter>
      </defs>
      <rect width="720" height="480" fill={`url(#${p}bg06)`} />
      <g mask={`url(#${p}m06)`}>
      <g filter={`url(#${p}sh6)`}><rect x="64" y="40" width="592" height="424" rx="18" fill="#FFFFFF" stroke="#ECE7F1" /></g>
      <text x="92" y="84" fontSize="20" fontWeight="600">Design case · Maréa</text>
      <rect x="92" y="98" width="20" height="20" rx="5" fill="none" stroke="#6B5F78" strokeWidth="1.8" /><path d="M92 105 h20" stroke="#6B5F78" strokeWidth="1.8" />
      <text x="122" y="114" fontSize="16" className="m">Thu 15 Oct, 14:00 · On site · 1 h</text>
      <text x="92" y="156" fontSize="15" className="m">Template</text>
      <g fontSize="15" fontWeight="600">
      <rect x="92" y="168" width="96" height="34" rx="17" fill="#F1EDF5" /><text x="140" y="190" textAnchor="middle">HR call</text>
      <rect x="196" y="168" width="110" height="34" rx="17" fill="#1F0D2C" /><text x="251" y="190" textAnchor="middle" style={{ fill: "#FFFFFF" }}>Case study</text>
      <rect x="314" y="168" width="104" height="34" rx="17" fill="#F1EDF5" /><text x="366" y="190" textAnchor="middle">Technical</text>
      <rect x="426" y="168" width="80" height="34" rx="17" fill="#F1EDF5" /><text x="466" y="190" textAnchor="middle">Final</text>
      </g>
      <text x="92" y="244" fontSize="15" className="m">Prep notes</text>
      <g fontSize="16">
      <rect x="92" y="258" width="20" height="20" rx="6" fill="#1F0D2C" /><path d="M96.5 268 l3.5 3.5 l6 -7" stroke="#FFFFFF" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <text x="124" y="274" className="m" textDecoration="line-through">Rehearse the case in 20 minutes</text>
      <rect x="92" y="292" width="20" height="20" rx="6" fill="none" stroke="#B9AEC4" strokeWidth="1.8" />
      <text x="124" y="308">Bring two process artefacts</text>
      <rect x="92" y="326" width="20" height="20" rx="6" fill="none" stroke="#B9AEC4" strokeWidth="1.8" />
      <text x="124" y="342">Ask how success is measured</text>
      </g>
      <rect x="92" y="372" width="536" height="64" rx="14" fill="#FFF9E5" />
      <text x="112" y="398" fontSize="15" fontWeight="600">Tip</text>
      <text x="112" y="421" fontSize="15" className="m">Walk through your reasoning before showing the final screens.</text>
      </g>
    </svg>
  );
}
