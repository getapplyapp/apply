'use client';

import { ArrowLeft01Icon, ArrowRight01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { buttonStyles } from '@/site/components/ui/buttonStyles';

/** One horizontal row of server-rendered cards with previous and next buttons (scroll snap, keyboard scrollable). */
export function Carousel({ title, titleId, labels, children }: { title: React.ReactNode; titleId: string; labels: { prev: string; next: string }; children: React.ReactNode }) {
  const row = useRef<HTMLUListElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  const update = useCallback(() => {
    const el = row.current;
    if (!el) return;
    setEdge({ start: el.scrollLeft <= 4, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4 });
  }, []);

  useEffect(() => {
    update();
    const el = row.current;
    el?.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      el?.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [update]);

  const go = (dir: 1 | -1) => {
    const el = row.current;
    const card = el?.firstElementChild as HTMLElement | null;
    if (!el || !card) return;
    el.scrollBy({ left: dir * (card.offsetWidth + 16) });
  };

  const arrow = buttonStyles('secondary', 'md', 'size-11 px-0 disabled:opacity-35');

  return (
    <>
      <div className="mx-auto flex max-w-[1240px] items-end justify-between gap-6 px-4 sm:px-6">
        <h2 id={titleId} className="font-display text-[clamp(40px,5vw,64px)] leading-none">
          {title}
        </h2>
        <div className="flex shrink-0 gap-2">
          <button type="button" className={arrow} onClick={() => go(-1)} disabled={edge.start} aria-label={labels.prev}>
            <HugeiconsIcon icon={ArrowLeft01Icon} size={20} />
          </button>
          <button type="button" className={buttonStyles('primary', 'md', 'size-11 px-0 disabled:opacity-35')} onClick={() => go(1)} disabled={edge.end} aria-label={labels.next}>
            <HugeiconsIcon icon={ArrowRight01Icon} size={20} />
          </button>
        </div>
      </div>
      <ul
        ref={row}
        tabIndex={0}
        aria-labelledby={titleId}
        className="site-carousel mt-10 flex scroll-px-4 gap-4 overflow-x-auto px-4 pb-2 sm:scroll-px-[max(24px,calc((100vw_-_1240px)/2_+_24px))] focus-visible:outline-offset-[-2px] sm:px-[max(24px,calc((100vw_-_1240px)/2_+_24px))]"
      >
        {children}
      </ul>
    </>
  );
}
