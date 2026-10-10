import type { DemoApplication, PlaceKey } from './data';
import { PLACES, RANGE, TODAY, WEEKS, ago, day, percent } from './data';
import { CompanyMark, Icon, StatusBadge } from './parts';
import { cn } from '@/site/lib/cn';

// ── Table ──────────────────────────────────────────────────────────────────

export type SortKey = 'company' | 'status' | 'applied';
export type Sort = { key: SortKey; dir: 'asc' | 'desc' };

const STATUS_ORDER = ['waiting', 'interviewing', 'accepted', 'rejected', 'ghosted'];

export function sortApps(apps: DemoApplication[], sort: Sort): DemoApplication[] {
  const sign = sort.dir === 'asc' ? 1 : -1;
  return [...apps].sort((a, b) => {
    if (sort.key === 'company') return sign * a.company.name.localeCompare(b.company.name);
    if (sort.key === 'status') return sign * (STATUS_ORDER.indexOf(a.status) - STATUS_ORDER.indexOf(b.status)) || a.company.name.localeCompare(b.company.name);
    return sign * a.applied.localeCompare(b.applied);
  });
}

/** Table layout (components/applications/TableLayout.tsx): sortable headers, sticky company column. */
export function TableView({ apps, sort, onSort }: { apps: DemoApplication[]; sort: Sort; onSort?: (key: SortKey) => void }) {
  const rows = sortApps(apps, sort);
  const head = (key: SortKey, label: string, className?: string) => (
    <th scope="col" aria-sort={sort.key === key ? (sort.dir === 'asc' ? 'ascending' : 'descending') : undefined} className={cn('px-3 py-2.5 font-medium sm:px-4', className)}>
      <button type="button" onClick={onSort ? () => onSort(key) : undefined} className="inline-flex min-h-7 items-center gap-1 rounded-md hover:text-stone-950">
        {label}
        <Icon name={sort.key !== key ? 'sort' : sort.dir === 'asc' ? 'up' : 'down'} size={12} className={sort.key === key ? 'text-stone-950' : 'opacity-50'} />
      </button>
    </th>
  );
  return (
    <div className="site-scroll-quiet h-full overflow-auto rounded-2xl border border-stone-200">
      <table className="w-full border-collapse text-sm">
        <thead className="sticky top-0 z-10 bg-white">
          <tr className="border-b border-stone-200 text-left text-xs text-stone-500">
            {head('company', 'Company')}
            <th scope="col" className="hidden px-4 py-2.5 font-medium lg:table-cell">
              Role
            </th>
            {head('status', 'Status')}
            {head('applied', 'Applied', 'hidden sm:table-cell')}
            <th scope="col" className="hidden px-4 py-2.5 font-medium md:table-cell">
              Place
            </th>
            <th scope="col" className="hidden px-4 py-2.5 font-medium xl:table-cell">
              Next step
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((a) => (
            <tr key={a.id} className="border-b border-stone-200 last:border-b-0 hover:bg-stone-50">
              <td className="max-w-0 px-3 py-2 sm:px-4">
                <span className="flex min-w-0 items-center gap-2.5">
                  <CompanyMark company={a.company} className="size-8" />
                  <span className="min-w-0">
                    <span className="block truncate font-medium text-stone-950">{a.company.name}</span>
                    <span className="block truncate text-xs text-stone-500 lg:hidden">{a.title}</span>
                  </span>
                </span>
              </td>
              <td className="hidden max-w-56 truncate px-4 py-2 text-stone-950 lg:table-cell">{a.title}</td>
              <td className="px-3 py-2 sm:px-4">
                <StatusBadge status={a.status} />
              </td>
              <td className="hidden px-4 py-2 whitespace-nowrap text-stone-600 sm:table-cell" title={ago(a.applied)}>
                {day(a.applied)}
              </td>
              <td className="hidden px-4 py-2 whitespace-nowrap text-stone-600 md:table-cell">{PLACES[a.place].label}</td>
              <td className="hidden px-4 py-2 whitespace-nowrap text-stone-600 xl:table-cell">
                {a.interview && a.status === 'interviewing' ? `Interview ${day(a.interview)}` : '-'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ── Timeline ───────────────────────────────────────────────────────────────

type EventType = 'applied' | 'reply' | 'interview';
const MARKER: Record<EventType, string> = { applied: 'bg-stone-400', reply: 'bg-brand-500', interview: 'bg-blue-500' };
const EVENT_LABEL: Record<EventType, string> = { applied: 'Applied', reply: 'Reply', interview: 'Interview' };

function eventsOf(a: DemoApplication): { type: EventType; at: string }[] {
  const list: { type: EventType; at: string }[] = [{ type: 'applied', at: a.applied }];
  if (a.replied) list.push({ type: 'reply', at: a.replied });
  if (a.interview && a.status === 'interviewing') list.push({ type: 'interview', at: a.interview });
  return list;
}

export type TimelinePick = { id: string; type: EventType } | null;

/** Timeline layout (components/applications/TimelineLayout.tsx): one row per application, weeks, a line for today. */
export function TimelineView({ apps, pick, onPick }: { apps: DemoApplication[]; pick: TimelinePick; onPick?: (p: TimelinePick) => void }) {
  const rows = [...apps].sort((a, b) => a.applied.localeCompare(b.applied));
  const picked = pick ? apps.find((a) => a.id === pick.id) : undefined;
  const pickedEvent = picked && pick ? eventsOf(picked).find((e) => e.type === pick.type) : undefined;

  return (
    <div className="flex h-full flex-col gap-2">
      <div className="hidden min-h-0 flex-1 overflow-hidden rounded-2xl border border-stone-200 md:flex md:flex-col">
        <div className="flex border-b border-stone-200">
          <div className="w-48 shrink-0 px-4 py-2 text-xs text-stone-500 lg:w-56">{day(RANGE.from)} - {day(RANGE.to)}</div>
          <div className="relative h-8 flex-1">
            {WEEKS.map((w) => (
              <span key={w} className="absolute top-1/2 -translate-y-1/2 pl-1.5 text-[11px] text-stone-500" style={{ left: `${percent(w)}%` }}>
                {day(w)}
              </span>
            ))}
          </div>
        </div>
        <div className="site-scroll-quiet relative min-h-0 flex-1 overflow-y-auto">
          {rows.map((a) => {
            const events = eventsOf(a);
            const first = events[0];
            const last = events[events.length - 1];
            return (
              <div key={a.id} className="flex border-b border-stone-200 last:border-b-0">
                <div className="flex w-48 shrink-0 items-center gap-2.5 px-4 py-2 lg:w-56">
                  <CompanyMark company={a.company} className="size-7 text-xs" />
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-medium text-stone-950">{a.company.name}</span>
                    <span className="block truncate text-xs text-stone-500">{a.title}</span>
                  </span>
                </div>
                <div className="relative flex-1">
                  {WEEKS.map((w) => (
                    <span key={w} aria-hidden className="absolute inset-y-0 w-px bg-stone-100" style={{ left: `${percent(w)}%` }} />
                  ))}
                  {first !== last && (
                    <span aria-hidden className="absolute top-1/2 h-0.5 -translate-y-1/2 rounded-full bg-stone-200" style={{ left: `${percent(first.at)}%`, width: `${percent(last.at) - percent(first.at)}%` }} />
                  )}
                  {events.map((e) => {
                    const on = pick?.id === a.id && pick.type === e.type;
                    return (
                      <button
                        key={e.type}
                        type="button"
                        aria-label={`${a.company.name}, ${EVENT_LABEL[e.type]}, ${day(e.at)}`}
                        aria-pressed={on}
                        onClick={onPick ? () => onPick(on ? null : { id: a.id, type: e.type }) : undefined}
                        className={cn('absolute top-1/2 size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full ring-2 ring-white transition-transform hover:scale-125', MARKER[e.type], on && 'scale-125 ring-stone-950')}
                        style={{ left: `${percent(e.at)}%` }}
                      />
                    );
                  })}
                </div>
              </div>
            );
          })}
          <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 left-48 lg:left-56">
            <span className="absolute inset-y-0 w-px bg-stone-950/60" style={{ left: `${percent(TODAY)}%` }} />
          </div>
        </div>
      </div>

      {/* Phones: dated events, newest first. */}
      <ul className="site-scroll-quiet flex min-h-0 flex-1 list-none flex-col gap-1.5 overflow-y-auto md:hidden">
        {rows
          .flatMap((a) => eventsOf(a).map((e) => ({ a, e })))
          .sort((x, y) => y.e.at.localeCompare(x.e.at))
          .map(({ a, e }) => (
            <li key={`${a.id}-${e.type}`} className="flex items-center gap-3 rounded-xl border border-stone-200 bg-white px-3 py-2">
              <span aria-hidden className={cn('size-2.5 shrink-0 rounded-full', MARKER[e.type])} />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-medium text-stone-950">{a.company.name}</span>
                <span className="block truncate text-xs text-stone-500">{EVENT_LABEL[e.type]}</span>
              </span>
              <span className="shrink-0 text-xs text-stone-500">{day(e.at)}</span>
            </li>
          ))}
      </ul>

      <div className="hidden min-h-6 items-center gap-4 px-1 text-xs text-stone-500 md:flex">
        {(Object.keys(MARKER) as EventType[]).map((t) => (
          <span key={t} className="inline-flex items-center gap-1.5">
            <span aria-hidden className={cn('size-2 rounded-full', MARKER[t])} />
            {EVENT_LABEL[t]}
          </span>
        ))}
        <span aria-live="polite" className="ml-auto truncate text-stone-700">
          {picked && pickedEvent ? `${picked.company.name}: ${EVENT_LABEL[pickedEvent.type]} on ${day(pickedEvent.at)}` : 'Select a marker'}
        </span>
      </div>
    </div>
  );
}

// ── Map ────────────────────────────────────────────────────────────────────

export function placesOf(apps: DemoApplication[]) {
  const byPlace = new Map<PlaceKey, DemoApplication[]>();
  for (const a of apps) byPlace.set(a.place, [...(byPlace.get(a.place) ?? []), a]);
  return byPlace;
}

/**
 * Map layout, stylised: the Seine, the ring road and the inner suburbs drawn in SVG (no map tiles), one pin
 * per place with its count. Selecting a pin lists its applications; remote ones are listed apart.
 */
export function MapView({ apps, place, onPlace }: { apps: DemoApplication[]; place: PlaceKey; onPlace?: (p: PlaceKey) => void }) {
  const byPlace = placesOf(apps);
  const selected = byPlace.get(place) ?? [];
  const remote = byPlace.get('remote') ?? [];
  return (
    <div className="flex h-full flex-col gap-3 md:flex-row">
      <div className="relative min-h-0 flex-1 overflow-hidden rounded-2xl border border-stone-200 bg-stone-50">
        <svg viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice" aria-hidden className="absolute inset-0 size-full">
          <rect width="400" height="260" fill="#fafaf9" />
          <path d="M70 40 C 110 70, 120 20, 170 50 S 260 30, 330 70" fill="none" stroke="#e7e5e4" strokeWidth="1.2" />
          <path d="M40 200 C 90 230, 150 250, 220 222 S 330 230, 380 196" fill="none" stroke="#e7e5e4" strokeWidth="1.2" />
          <ellipse cx="212" cy="128" rx="92" ry="66" fill="#ffffff" stroke="#d6d3d1" strokeWidth="1.6" strokeDasharray="5 4" />
          <path d="M-10 60 C 50 80, 70 130, 110 150 S 160 120, 190 126 S 250 150, 290 168 S 360 190, 410 214" fill="none" stroke="#bfdbfe" strokeWidth="7" strokeLinecap="round" />
          <text x="212" y="66" textAnchor="middle" fontSize="10" fill="#a8a29e" letterSpacing="2">PARIS</text>
          <text x="58" y="120" fontSize="8" fill="#a8a29e">Hauts-de-Seine</text>
          <text x="300" y="92" fontSize="8" fill="#a8a29e">Seine-Saint-Denis</text>
          <text x="196" y="246" fontSize="8" fill="#a8a29e">Val-de-Marne</text>
        </svg>
        {[...byPlace.entries()].map(([key, list]) => {
          const p = PLACES[key];
          if ('remote' in p) return null;
          const on = key === place;
          return (
            <button
              key={key}
              type="button"
              aria-pressed={on}
              aria-label={`${p.label}, ${list.length} ${list.length === 1 ? 'application' : 'applications'}`}
              onClick={onPlace ? () => onPlace(key) : undefined}
              className={cn(
                'absolute flex h-7 min-w-7 -translate-x-1/2 -translate-y-full items-center justify-center rounded-full border-2 px-1.5 text-xs font-semibold tabular-nums transition-colors',
                on ? 'border-white bg-stone-950 text-white' : 'border-white bg-brand-300 text-stone-950 hover:bg-brand-400',
              )}
              style={{ left: `${(p.x / 400) * 100}%`, top: `${(p.y / 260) * 100}%` }}
            >
              {list.length}
            </button>
          );
        })}
      </div>
      <div className="flex h-36 shrink-0 flex-col gap-2 md:h-auto md:w-64">
        <p className="flex items-center gap-1.5 text-sm font-medium text-stone-950">
          <Icon name="pin" size={14} />
          {PLACES[place].label}
          <span className="font-normal text-stone-500">{selected.length}</span>
        </p>
        <ul aria-live="polite" className="site-scroll-quiet flex min-h-0 flex-1 list-none flex-col gap-1.5 overflow-y-auto">
          {selected.map((a) => (
            <li key={a.id} className="flex items-center gap-2.5 rounded-xl border border-stone-200 bg-white p-2">
              <CompanyMark company={a.company} className="size-7 text-xs" />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-medium text-stone-950">{a.company.name}</span>
                <span className="block truncate text-xs text-stone-500">{a.title}</span>
              </span>
            </li>
          ))}
        </ul>
        {remote.length > 0 && (
          <button
            type="button"
            aria-pressed={place === 'remote'}
            onClick={onPlace ? () => onPlace('remote') : undefined}
            className={cn('inline-flex h-8 shrink-0 items-center gap-2 self-start rounded-full border px-3 text-xs font-medium', place === 'remote' ? 'border-transparent bg-stone-950 text-white' : 'border-stone-200 bg-white text-stone-700')}
          >
            Remote
            <span className="tabular-nums opacity-70">{remote.length}</span>
          </button>
        )}
      </div>
    </div>
  );
}
