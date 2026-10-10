import type { DemoApplication, DemoStatus } from './data';
import { BOARD_COLUMNS, PLACES, STATUS_LABEL, STATUS_SHORT, STATUS_TONE, day } from './data';
import { CompanyMark, Icon } from './parts';
import { cn } from '@/site/lib/cn';

export type BoardDrag = { id: string; x: number; y: number; width: number };

export type BoardViewProps = {
  apps: DemoApplication[];
  /** Column shown on phones (one column at a time, like the product). */
  mobileColumn: DemoStatus;
  /** Ids of the elements, unique per demo on the page. */
  idPrefix: string;
  compact?: boolean;
  drag?: BoardDrag | null;
  over?: DemoStatus | null;
  menu?: string | null;
  landed?: string | null;
  hint?: string | null;
  onPointerDown?: (e: React.PointerEvent<HTMLElement>, id: string) => void;
  onMenuKeyDown?: (e: React.KeyboardEvent<HTMLButtonElement>, id: string) => void;
  onToggleMenu?: (id: string) => void;
  onMove?: (id: string, to: DemoStatus) => void;
  onMobileColumn?: (s: DemoStatus) => void;
};

/**
 * Applications Board, as in the product (components/applications/BoardLayout.tsx): one column per status,
 * cards with the company, the role, the place and the next interview. Pure view: the static server render and
 * the live demo (BoardDemo, ApplicationsDemo) share it, so hydration swaps identical markup.
 */
export function BoardView(props: BoardViewProps) {
  const { apps, mobileColumn, idPrefix, compact, drag, over, onMobileColumn } = props;
  const count = (s: DemoStatus) => apps.filter((a) => a.status === s).length;
  const dragged = drag ? apps.find((a) => a.id === drag.id) : undefined;

  return (
    <div className="flex h-full min-h-0 flex-col gap-3">
      <p id={`${idPrefix}-hint`} className="sr-only">
        Use the menu of a card to change its status. Left and right arrows on the menu button move the card to the next column.
      </p>
      {/* Phones: one column at a time, picked from a status strip. */}
      <div className="site-scroll-none -mx-3 flex gap-1.5 overflow-x-auto px-3 md:hidden" role="group" aria-label="Columns">
        {BOARD_COLUMNS.map((s) => (
          <button
            key={s}
            type="button"
            aria-pressed={mobileColumn === s}
            data-column-chip={s}
            onClick={onMobileColumn ? () => onMobileColumn(s) : undefined}
            className={cn(
              'inline-flex h-8 shrink-0 items-center gap-1.5 rounded-full border px-3 text-xs font-medium transition-colors',
              mobileColumn === s ? 'border-transparent bg-stone-950 text-white' : 'border-stone-200 bg-white text-stone-600',
            )}
          >
            {STATUS_SHORT[s]}
            <span className="tabular-nums opacity-70">{count(s)}</span>
          </button>
        ))}
      </div>

      <div className="flex min-h-0 flex-1 gap-3">
        {BOARD_COLUMNS.map((s) => {
          const items = apps.filter((a) => a.status === s);
          return (
            <section
              key={s}
              data-col={s}
              aria-label={`${STATUS_LABEL[s]}, ${items.length}`}
              className={cn(
                'min-h-0 min-w-0 flex-1 flex-col rounded-2xl bg-stone-100/70 p-2 transition-[box-shadow,background-color] duration-150 md:flex',
                mobileColumn === s ? 'flex' : 'hidden',
                over === s && 'bg-brand-50 ring-2 ring-brand-300',
              )}
            >
              <header className="flex items-center gap-2 px-2 py-1.5">
                <span aria-hidden className={cn('size-2 rounded-full', STATUS_TONE[s].dot)} />
                <h3 className="truncate text-sm font-medium text-stone-950">{STATUS_LABEL[s]}</h3>
                <span className="text-xs tabular-nums text-stone-500">{items.length}</span>
              </header>
              <ul className="site-scroll-quiet flex min-h-0 list-none flex-col gap-2 overflow-y-auto p-0.5">
                {items.length === 0 ? (
                  <li className="rounded-xl border border-dashed border-stone-300 px-3 py-6 text-center text-xs text-stone-500">Drop an application here</li>
                ) : (
                  items.map((a) => (
                    <li key={a.id}>
                      <Card {...props} a={a} ghost={drag?.id === a.id} compact={compact} />
                    </li>
                  ))
                )}
              </ul>
            </section>
          );
        })}
      </div>

      {drag && dragged && (
        <div aria-hidden className="pointer-events-none fixed z-50 rotate-[1.5deg]" style={{ left: drag.x, top: drag.y, width: drag.width }}>
          <CardBody a={dragged} compact={compact} lifted />
        </div>
      )}
    </div>
  );
}

function Card({
  a,
  ghost,
  compact,
  idPrefix,
  menu,
  landed,
  hint,
  onPointerDown,
  onMenuKeyDown,
  onToggleMenu,
  onMove,
}: BoardViewProps & { a: DemoApplication; ghost: boolean }) {
  const open = menu === a.id;
  const menuId = `${idPrefix}-menu-${a.id}`;
  return (
    <article
      data-card={a.id}
      onPointerDown={onPointerDown ? (e) => onPointerDown(e, a.id) : undefined}
      className={cn('relative rounded-2xl', onPointerDown && 'md:cursor-grab', ghost && 'opacity-40', landed === a.id && 'site-card-landed', hint === a.id && 'site-card-hint')}
    >
      <CardBody a={a} compact={compact} />
      <button
        type="button"
        data-menu-button={a.id}
        aria-label={`Move ${a.company.name}, ${a.title}`}
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        aria-describedby={`${idPrefix}-hint`}
        onClick={onToggleMenu ? () => onToggleMenu(a.id) : undefined}
        onKeyDown={onMenuKeyDown ? (e) => onMenuKeyDown(e, a.id) : undefined}
        className="absolute top-2 right-2 flex size-7 items-center justify-center rounded-lg text-stone-500 transition-colors hover:bg-stone-100 hover:text-stone-950"
      >
        <Icon name="more" size={16} />
      </button>
      {open && (
        <div id={menuId} role="group" aria-label="Move to" className="mx-3 -mt-1 mb-3 flex flex-wrap gap-1.5 border-t border-stone-200 pt-2.5">
          {BOARD_COLUMNS.map((s) => (
            <button
              key={s}
              type="button"
              aria-pressed={a.status === s}
              disabled={a.status === s}
              onClick={onMove ? () => onMove(a.id, s) : undefined}
              className={cn(
                'inline-flex h-7 items-center gap-1.5 rounded-full border px-2.5 text-xs font-medium',
                a.status === s ? 'border-transparent bg-stone-100 text-stone-500' : 'border-stone-200 bg-white text-stone-800 hover:border-stone-400',
              )}
            >
              <span aria-hidden className={cn('size-1.5 rounded-full', STATUS_TONE[s].dot)} />
              {STATUS_SHORT[s]}
            </button>
          ))}
        </div>
      )}
    </article>
  );
}

function CardBody({ a, compact, lifted }: { a: DemoApplication; compact?: boolean; lifted?: boolean }) {
  const place = PLACES[a.place];
  return (
    <div className={cn('flex flex-col gap-2.5 rounded-2xl border bg-white p-3', lifted ? 'border-stone-400' : 'border-stone-200')}>
      <div className="flex items-center gap-2.5 pr-7">
        <CompanyMark company={a.company} className={compact ? 'size-8' : undefined} />
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-stone-950">{a.company.name}</p>
          <p className="truncate text-[13px] text-stone-500">{a.title}</p>
        </div>
      </div>
      <p className="flex items-center gap-1.5 text-xs text-stone-500">
        <Icon name="pin" size={13} />
        <span className="truncate">{place.label}</span>
      </p>
      {a.interview && a.status === 'interviewing' && (
        <span className="inline-flex h-6 items-center gap-1 self-start rounded-full bg-blue-50 px-2 text-xs font-medium text-blue-700">
          <Icon name="calendar" size={12} />
          Interview {day(a.interview)}
        </span>
      )}
    </div>
  );
}
