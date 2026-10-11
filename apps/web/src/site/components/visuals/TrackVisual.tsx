import type { VisualProps } from './types';

/** Generated from 05-track-every-application.svg (design handoff, 11 Oct 2026). Text is set in Geist through `.site-visual` (site.css). */
export function TrackVisual({ idPrefix = '', className, decorative = false }: VisualProps) {
  const p = `track-${idPrefix}`;
  return (
    <svg
      viewBox="0 0 720 480"
      className={['site-visual', className].filter(Boolean).join(' ')}
      {...(decorative ? { 'aria-hidden': true } : { role: 'img', 'aria-label': "A list of applications with their status, one of them highlighted with a reminder to follow up" })}
    >
      <defs>
      <linearGradient id={`${p}bg05`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#F3D98F" /><stop offset="1" stopColor="#FFEDBE" /></linearGradient><linearGradient id={`${p}fm05`} x1="0" y1="0" x2="0" y2="1"><stop offset="0.7" stopColor="#fff" /><stop offset="1" stopColor="#000" /></linearGradient><mask id={`${p}m05`} maskUnits="userSpaceOnUse" x="0" y="0" width="720" height="480"><rect width="720" height="480" fill={`url(#${p}fm05)`} /></mask>
      <filter id={`${p}sh5`} x="-10%" y="-10%" width="120%" height="130%"><feDropShadow dx="0" dy="6" stdDeviation="10" floodColor="#3C1E5A" floodOpacity="0.10" /></filter>
      </defs>
      <rect width="720" height="480" fill={`url(#${p}bg05)`} />
      <g mask={`url(#${p}m05)`}>
      <g filter={`url(#${p}sh5)`}><rect x="76" y="40" width="568" height="424" rx="18" fill="#FFFFFF" stroke="#ECE7F1" /></g>
      <text x="104" y="84" fontSize="20" fontWeight="600">Applications</text>
      <text x="616" y="84" fontSize="15" className="m" textAnchor="end">11 active</text>
      <g fontSize="17">
      <rect x="104" y="108" width="40" height="40" rx="11" fill="#DCE8FF" /><text x="124" y="134" textAnchor="middle" fontWeight="600">M</text>
      <text x="158" y="125" fontWeight="600">Maréa</text><text x="158" y="145" fontSize="14" className="m">Interview Thu 15 Oct</text>
      <rect x="476" y="114" width="140" height="30" rx="8" fill="#DCE8FF" /><text x="546" y="135" fontSize="15" textAnchor="middle">Interviewing</text>
      <rect x="92" y="164" width="536" height="104" rx="14" fill="#FFF9E5" stroke="#F3DE91" />
      <rect x="104" y="176" width="40" height="40" rx="11" fill="#FFF0B8" /><text x="124" y="202" textAnchor="middle" fontWeight="600">K</text>
      <text x="158" y="193" fontWeight="600">Kiwimo</text><text x="158" y="213" fontSize="14" className="m">Applied 9 days ago · no answer</text>
      <rect x="476" y="182" width="140" height="30" rx="8" fill="#FFF0B8" /><text x="546" y="203" fontSize="15" textAnchor="middle">Waiting</text>
      <circle cx="166" cy="240" r="5" fill="#E8B93A" />
      <text x="182" y="245" fontSize="15" fontWeight="600">Time to follow up</text>
      <rect x="476" y="226" width="140" height="30" rx="15" fill="#1F0D2C" /><text x="546" y="246" fontSize="15" fontWeight="600" textAnchor="middle" style={{ fill: "#FFFFFF" }}>Draft follow-up</text>
      <rect x="104" y="284" width="40" height="40" rx="11" fill="#DDF3E6" /><text x="124" y="310" textAnchor="middle" fontWeight="600">N</text>
      <text x="158" y="301" fontWeight="600">Nordlys Studio</text><text x="158" y="321" fontSize="14" className="m">Offer received</text>
      <rect x="476" y="290" width="140" height="30" rx="8" fill="#DDF3E6" /><text x="546" y="311" fontSize="15" textAnchor="middle">Accepted</text>
      <rect x="104" y="348" width="40" height="40" rx="11" fill="#FFE1CF" /><text x="124" y="374" textAnchor="middle" fontWeight="600">H</text>
      <text x="158" y="365" fontWeight="600">Halotec</text><text x="158" y="385" fontSize="14" className="m">Applied today</text>
      <rect x="476" y="354" width="140" height="30" rx="8" fill="#F1EDF5" /><text x="546" y="375" fontSize="15" textAnchor="middle">Applied</text>
      </g>
      </g>
    </svg>
  );
}
