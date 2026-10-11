import type { VisualProps } from './types';

/** Generated from 01-start-from-your-resume.svg (design handoff, 11 Oct 2026). Text is set in Geist through `.site-visual` (site.css). */
export function ResumeVisual({ idPrefix = '', className, decorative = false }: VisualProps) {
  const p = `resume-${idPrefix}`;
  return (
    <svg
      viewBox="0 0 720 480"
      className={['site-visual', className].filter(Boolean).join(' ')}
      {...(decorative ? { 'aria-hidden': true } : { role: 'img', 'aria-label': "A resume turns into a complete apply profile, which feeds tailored resumes and cover letters" })}
    >
      <defs>
      <linearGradient id={`${p}bg01`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#F1C2BE" /><stop offset="1" stopColor="#FFDEC0" /></linearGradient><linearGradient id={`${p}fm01`} x1="0" y1="0" x2="0" y2="1"><stop offset="0.7" stopColor="#fff" /><stop offset="1" stopColor="#000" /></linearGradient><mask id={`${p}m01`} maskUnits="userSpaceOnUse" x="0" y="0" width="720" height="480"><rect width="720" height="480" fill={`url(#${p}fm01)`} /></mask>
      <filter id={`${p}sh1`} x="-10%" y="-10%" width="120%" height="130%"><feDropShadow dx="0" dy="6" stdDeviation="10" floodColor="#3C1E5A" floodOpacity="0.10" /></filter>
      </defs>
      <rect width="720" height="480" fill={`url(#${p}bg01)`} />
      <g mask={`url(#${p}m01)`}>
      <g transform="rotate(-4 170 250)" filter={`url(#${p}sh1)`}>
      <rect x="64" y="84" width="220" height="300" rx="14" fill="#FFFFFF" stroke="#ECE7F1" />
      <rect x="88" y="110" width="110" height="14" rx="7" fill="#1F0D2C" />
      <rect x="88" y="134" width="150" height="9" rx="4.5" fill="#D9D2E0" />
      <rect x="88" y="168" width="70" height="9" rx="4.5" fill="#B9AEC4" />
      <rect x="88" y="186" width="168" height="8" rx="4" fill="#ECE7F1" />
      <rect x="88" y="202" width="150" height="8" rx="4" fill="#ECE7F1" />
      <rect x="88" y="218" width="160" height="8" rx="4" fill="#ECE7F1" />
      <rect x="88" y="250" width="70" height="9" rx="4.5" fill="#B9AEC4" />
      <rect x="88" y="268" width="168" height="8" rx="4" fill="#ECE7F1" />
      <rect x="88" y="284" width="130" height="8" rx="4" fill="#ECE7F1" />
      <rect x="88" y="318" width="54" height="22" rx="11" fill="#FFF0B8" />
      <rect x="148" y="318" width="64" height="22" rx="11" fill="#FFF0B8" />
      <text x="88" y="368" fontSize="15" className="m">camille-aubert-cv.pdf</text>
      </g>
      <path d="M300 236 C 330 236, 340 236, 366 236" stroke="#1F0D2C" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeDasharray="2 8" />
      <path d="M360 228 L370 236 L360 244" stroke="#1F0D2C" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <g filter={`url(#${p}sh1)`}>
      <rect x="384" y="56" width="296" height="368" rx="18" fill="#FFFFFF" stroke="#ECE7F1" />
      </g>
      <circle cx="420" cy="100" r="20" fill="#E2B8FF" />
      <text x="420" y="106" fontSize="15" fontWeight="600" textAnchor="middle">CA</text>
      <text x="452" y="96" fontSize="19" fontWeight="600">Camille Aubert</text>
      <text x="452" y="118" fontSize="15" className="m">Senior Product Designer · Paris</text>
      <text x="408" y="164" fontSize="14" className="m">Profile</text>
      <text x="656" y="164" fontSize="14" fontWeight="600" textAnchor="end">82%</text>
      <rect x="408" y="174" width="248" height="8" rx="4" fill="#F1EDF5" />
      <rect x="408" y="174" width="203" height="8" rx="4" fill="#1F0D2C" />
      <g fontSize="16">
      <circle cx="418" cy="214" r="9" fill="#DDF3E6" /><path d="M413.5 214 l3 3 l5.5 -6" stroke="#2E7D55" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <text x="436" y="219">Experience · 4 roles</text>
      <circle cx="418" cy="246" r="9" fill="#DDF3E6" /><path d="M413.5 246 l3 3 l5.5 -6" stroke="#2E7D55" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <text x="436" y="251">Skills · 12 found</text>
      <circle cx="418" cy="278" r="9" fill="#F1EDF5" /><path d="M418 274 v8 M414 278 h8" stroke="#6B5F78" strokeWidth="2" strokeLinecap="round" />
      <text x="436" y="283" className="m">Add a portfolio link</text>
      </g>
      <line x1="408" x2="656" y1="310" y2="310" stroke="#F1EDF5" />
      <text x="408" y="338" fontSize="14" className="m">Ready to use</text>
      <rect x="408" y="352" width="122" height="36" rx="18" fill="#F5EEFC" />
      <text x="469" y="375" fontSize="15" fontWeight="600" textAnchor="middle">Tailored resume</text>
      <rect x="538" y="352" width="118" height="36" rx="18" fill="#F5EEFC" />
      <text x="597" y="375" fontSize="15" fontWeight="600" textAnchor="middle">Cover letter</text>
      </g>
    </svg>
  );
}
