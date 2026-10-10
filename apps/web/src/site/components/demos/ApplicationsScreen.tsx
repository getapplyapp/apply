import { BoardView, type BoardViewProps } from './BoardView';
import type { HubViewKey } from './copy';
import type { PlaceKey } from './data';
import { MapView, TableView, TimelineView, type Sort, type SortKey, type TimelinePick } from './HubViews';
import { AppWindow, Icon, PageHeader, type DemoIconName } from './parts';
import { cn } from '@/site/lib/cn';

export type HubViewItem = { key: HubViewKey; label: string; icon: DemoIconName; caption?: string };

export type ApplicationsScreenProps = {
  views: HubViewItem[];
  active: HubViewKey;
  figure?: number;
  figureLabel: string;
  board: BoardViewProps;
  sort: Sort;
  pick: TimelinePick;
  place: PlaceKey;
  message?: string;
  onTab?: (key: HubViewKey) => void;
  onTabKeyDown?: (e: React.KeyboardEvent<HTMLButtonElement>) => void;
  onSort?: (key: SortKey) => void;
  onPick?: (p: TimelinePick) => void;
  onPlace?: (p: PlaceKey) => void;
};

/**
 * Applications hub demo: a segmented control (ARIA tabs) above one product window; the four layouts render the
 * same applications, so a card moved on the Board shows its new status in the Table, Timeline and Map.
 */
export function ApplicationsScreen(p: ApplicationsScreenProps) {
  const current = p.views.find((v) => v.key === p.active) ?? p.views[0];
  const id = p.board.idPrefix;
  return (
    <figure className="min-w-0">
      <div className="-mx-4 flex overflow-x-auto px-4 sm:mx-0 sm:justify-center sm:px-0">
        <div role="tablist" aria-label="Applications layouts" className="inline-flex shrink-0 gap-1 rounded-full border border-stone-200 bg-white p-1">
          {p.views.map((v) => {
            const on = v.key === current.key;
            return (
              <button
                key={v.key}
                type="button"
                role="tab"
                id={`${id}-tab-${v.key}`}
                aria-selected={on}
                aria-controls={`${id}-panel`}
                tabIndex={on ? 0 : -1}
                onClick={p.onTab ? () => p.onTab?.(v.key) : undefined}
                onKeyDown={p.onTabKeyDown}
                className={cn(
                  'inline-flex h-11 shrink-0 items-center gap-2 rounded-full px-3.5 text-sm font-medium transition-colors duration-150 sm:px-5',
                  on ? 'bg-stone-950 text-white' : 'text-stone-700 hover:bg-stone-100 hover:text-stone-950',
                )}
              >
                <Icon name={v.icon} size={18} />
                {v.label}
              </button>
            );
          })}
        </div>
      </div>

      <AppWindow active="applications" className="mt-8 sm:mt-10">
        <PageHeader title="Applications" count={String(p.board.apps.length)}>
          <span className="ml-auto hidden text-xs text-stone-500 sm:inline">{p.board.apps.filter((a) => a.status === 'interviewing').length} in interviews</span>
        </PageHeader>
        <div role="tabpanel" id={`${id}-panel`} aria-labelledby={`${id}-tab-${current.key}`} className="site-fade-in h-[440px] p-3 sm:h-[480px]" key={current.key}>
          {current.key === 'board' && <BoardView {...p.board} compact />}
          {current.key === 'table' && <TableView apps={p.board.apps} sort={p.sort} onSort={p.onSort} />}
          {current.key === 'timeline' && <TimelineView apps={p.board.apps} pick={p.pick} onPick={p.onPick} />}
          {current.key === 'map' && <MapView apps={p.board.apps} place={p.place} onPlace={p.onPlace} />}
        </div>
      </AppWindow>
      <figcaption className="mt-3 text-[13px] leading-snug text-stone-600">
        {p.figure !== undefined ? `${p.figureLabel} ${p.figure} - ` : ''}
        {current.label}. {current.caption}
      </figcaption>
      <p aria-live="polite" className="sr-only">
        {p.message}
      </p>
    </figure>
  );
}
