import type { VisualProps } from './types';

/** Generated from 04-apply-with-confidence.svg (design handoff, 11 Oct 2026). Text is set in Geist through `.site-visual` (site.css). */
export function ApplyVisual({ idPrefix = '', className, decorative = false }: VisualProps) {
  const p = `apply-${idPrefix}`;
  return (
    <svg
      viewBox="0 0 720 480"
      className={['site-visual', className].filter(Boolean).join(' ')}
      {...(decorative ? { 'aria-hidden': true } : { role: 'img', 'aria-label': "An offer analysis showing how well it matches the profile, company insights and actions to tailor the resume, write a cover letter and autofill the form" })}
    >
      <defs>
      <linearGradient id={`${p}bg04`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#D7C5F7" /><stop offset="1" stopColor="#E7DDFA" /></linearGradient><linearGradient id={`${p}fm04`} x1="0" y1="0" x2="0" y2="1"><stop offset="0.7" stopColor="#fff" /><stop offset="1" stopColor="#000" /></linearGradient><mask id={`${p}m04`} maskUnits="userSpaceOnUse" x="0" y="0" width="720" height="480"><rect width="720" height="480" fill={`url(#${p}fm04)`} /></mask>
      <filter id={`${p}sh4`} x="-10%" y="-10%" width="120%" height="130%"><feDropShadow dx="0" dy="6" stdDeviation="10" floodColor="#3C1E5A" floodOpacity="0.10" /></filter>
      </defs>
      <rect width="720" height="480" fill={`url(#${p}bg04)`} />
      <g mask={`url(#${p}m04)`}>
      <g filter={`url(#${p}sh4)`}><rect x="60" y="40" width="600" height="424" rx="18" fill="#FFFFFF" stroke="#ECE7F1" /></g>
      <rect x="88" y="68" width="52" height="52" rx="14" fill="#EBDCFB" /><text x="114" y="102" fontSize="21" fontWeight="600" textAnchor="middle">N</text>
      <text x="156" y="90" fontSize="20" fontWeight="600">Lead Product Designer</text>
      <text x="156" y="114" fontSize="16" className="m">Nimbalo · Paris · On-site</text>
      <circle cx="596" cy="94" r="30" fill="none" stroke="#F1EDF5" strokeWidth="7" />
      <circle cx="596" cy="94" r="30" fill="none" stroke="#1F0D2C" strokeWidth="7" strokeLinecap="round" strokeDasharray="162 189" transform="rotate(-90 596 94)" />
      <text x="596" y="100" fontSize="17" fontWeight="600" textAnchor="middle">86%</text>
      <line x1="88" x2="632" y1="144" y2="144" stroke="#F1EDF5" />
      <text x="88" y="176" fontSize="15" className="m">Why it fits you</text>
      <g fontSize="16">
      <circle cx="97" cy="202" r="9" fill="#DDF3E6" /><path d="M92.5 202 l3 3 l5.5 -6" stroke="#2E7D55" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" /><text x="114" y="207">Design systems</text>
      <circle cx="97" cy="234" r="9" fill="#DDF3E6" /><path d="M92.5 234 l3 3 l5.5 -6" stroke="#2E7D55" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" /><text x="114" y="239">B2B SaaS</text>
      <circle cx="97" cy="266" r="9" fill="#FFF0B8" /><path d="M93 266 h8" stroke="#8A6A10" strokeWidth="2" strokeLinecap="round" /><text x="114" y="271">Team lead · to highlight</text>
      </g>
      <text x="372" y="176" fontSize="15" className="m">About the company</text>
      <g fontSize="16">
      <text x="372" y="207">Series B · 120 people</text>
      <text x="372" y="239">Product-led, design team of 9</text>
      <text x="372" y="271" className="m">Interviews: 4 rounds</text>
      </g>
      <line x1="88" x2="632" y1="300" y2="300" stroke="#F1EDF5" />
      <g fontSize="16" fontWeight="600">
      <rect x="88" y="324" width="164" height="44" rx="22" fill="#F5EEFC" /><text x="170" y="352" textAnchor="middle">Tailor resume</text>
      <rect x="262" y="324" width="176" height="44" rx="22" fill="#F5EEFC" /><text x="350" y="352" textAnchor="middle">Write cover letter</text>
      <rect x="448" y="324" width="184" height="44" rx="22" fill="#1F0D2C" /><text x="540" y="352" textAnchor="middle" style={{ fill: "#FFFFFF" }}>Autofill and apply</text>
      </g>
      </g>
    </svg>
  );
}
