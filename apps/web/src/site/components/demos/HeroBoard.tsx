import { BoardView, type BoardViewProps } from './BoardView';
import { HUB_VIEWS } from './copy';
import { Icon, PageHeader } from './parts';
import { cn } from '@/site/lib/cn';

/**
 * The hero screen: Applications page header (count, layout switch, affordance line) above the Board.
 * Fixed height, so moving cards never shifts the page.
 */
export function HeroBoardScreen({ message = '', ...board }: BoardViewProps & { message?: string }) {
  return (
    <div className="flex h-[430px] flex-col sm:h-[470px]">
      <PageHeader title="Applications" count={String(board.apps.length)}>
        <span aria-hidden className="hidden items-center gap-0.5 rounded-lg bg-stone-100 p-0.5 sm:inline-flex">
          {HUB_VIEWS.map((v, i) => (
            <span key={v.key} className={cn('inline-flex h-7 items-center gap-1.5 rounded-md px-2 text-xs font-medium', i === 0 ? 'bg-white text-stone-950 ring-1 ring-stone-200' : 'text-stone-500')}>
              <Icon name={v.icon} size={13} />
              {v.label}
            </span>
          ))}
        </span>
        <span className="ml-auto hidden items-center gap-1.5 text-xs text-stone-500 md:inline-flex">
          <Icon name="board" size={13} />
          Drag a card to another column
        </span>
        <span className="ml-auto inline-flex items-center gap-1 text-xs text-stone-500 md:hidden">
          Tap
          <Icon name="more" size={13} />
          to move a card
        </span>
      </PageHeader>
      <div className="min-h-0 flex-1 p-3">
        <BoardView {...board} />
      </div>
      <p aria-live="polite" className="sr-only">
        {message}
      </p>
    </div>
  );
}
