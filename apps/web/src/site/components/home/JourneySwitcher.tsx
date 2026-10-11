'use client';

import { useId, useState } from 'react';
import { cn } from '@/site/lib/cn';

export type JourneyItem = { key: string; title: string; text: string; icon: React.ReactNode; link: React.ReactNode };

/**
 * Dovetail-style switcher: hovering, focusing or pressing a step swaps the visual. Below `md` it is an accordion:
 * the active step opens its text, the visual follows the list.
 */
export function JourneySwitcher({ items, panels }: { items: JourneyItem[]; panels: React.ReactNode[] }) {
  const [active, setActive] = useState(0);
  const id = useId();

  return (
    <div className="grid items-center gap-10 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-16">
      <ul className="flex flex-col gap-2">
        {items.map((item, i) => {
          const on = i === active;
          return (
            <li key={item.key} onMouseEnter={() => setActive(i)} className={cn('rounded-3xl border border-transparent transition-colors', on ? 'border-stone-200 bg-white' : 'hover:bg-white/60')}>
              <h3>
                <button
                  type="button"
                  id={`${id}-tab-${i}`}
                  aria-expanded={on}
                  aria-controls={`${id}-panel-${i}`}
                  onClick={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className="flex w-full items-center gap-4 rounded-3xl px-5 py-4 text-left"
                >
                  <span className={cn('flex size-11 shrink-0 items-center justify-center rounded-2xl transition-colors', on ? 'bg-stone-950 text-white' : 'bg-stone-100 text-stone-950')}>{item.icon}</span>
                  <span className="font-display text-[34px] leading-none">{item.title}</span>
                </button>
              </h3>
              <div id={`${id}-text-${i}`} hidden={!on} className="px-5 pb-5 pl-[84px]">
                <p className="text-pretty text-[15px] leading-[1.55] text-stone-600">{item.text}</p>
                <div className="mt-3">{item.link}</div>
              </div>
            </li>
          );
        })}
      </ul>
      <div className="relative">
        {panels.map((panel, i) => (
          <div key={items[i].key} id={`${id}-panel-${i}`} role="region" aria-labelledby={`${id}-tab-${i}`} hidden={i !== active} className="site-fade-in overflow-hidden rounded-3xl border border-stone-950/[0.06]">
            {panel}
          </div>
        ))}
      </div>
    </div>
  );
}
