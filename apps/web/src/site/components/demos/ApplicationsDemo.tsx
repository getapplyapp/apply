'use client';

import { useRef, useState } from 'react';
import { ApplicationsScreen, type HubViewItem } from './ApplicationsScreen';
import type { HubViewKey } from './copy';
import { APPLICATIONS, type PlaceKey } from './data';
import type { Sort, SortKey, TimelinePick } from './HubViews';
import { useBoard } from './useBoard';

/** Live Applications hub: tabs switch real layouts of the same state; the Board moves cards. */
export function ApplicationsDemo({ views, figure, figureLabel }: { views: HubViewItem[]; figure?: number; figureLabel: string }) {
  const root = useRef<HTMLDivElement>(null);
  const board = useBoard(APPLICATIONS, root);
  const [active, setActive] = useState<HubViewKey>(views[0]?.key ?? 'board');
  const [sort, setSort] = useState<Sort>({ key: 'applied', dir: 'desc' });
  const [pick, setPick] = useState<TimelinePick>(null);
  const [place, setPlace] = useState<PlaceKey>('paris10');

  const select = (key: HubViewKey, focus = false) => {
    setActive(key);
    if (focus) root.current?.querySelector<HTMLButtonElement>(`#views-tab-${key}`)?.focus();
  };

  const onTabKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    const i = views.findIndex((v) => v.key === active);
    const last = views.length - 1;
    const to: Record<string, number> = { ArrowRight: i === last ? 0 : i + 1, ArrowLeft: i === 0 ? last : i - 1, Home: 0, End: last };
    if (!(e.key in to)) return;
    e.preventDefault();
    select(views[to[e.key]].key, true);
  };

  return (
    <div ref={root}>
      <ApplicationsScreen
        views={views}
        active={active}
        figure={figure}
        figureLabel={figureLabel}
        board={{ ...board.view, idPrefix: 'views' }}
        sort={sort}
        pick={pick}
        place={place}
        message={board.message}
        onTab={(k) => select(k)}
        onTabKeyDown={onTabKeyDown}
        onSort={(key: SortKey) => setSort((cur) => ({ key, dir: cur.key === key && cur.dir === 'asc' ? 'desc' : 'asc' }))}
        onPick={setPick}
        onPlace={setPlace}
      />
    </div>
  );
}
