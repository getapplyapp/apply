'use client';

import { useEffect, useRef, useState } from 'react';
import { APPLICATIONS, HINT_CARD } from './data';
import { HeroBoardScreen } from './HeroBoard';
import { AppWindow } from './parts';
import { useBoard } from './useBoard';

/**
 * Hero demo: the live Board. Once, on large screens and without reduced motion, a card is highlighted and
 * moves from Waiting to Interviewing to show that cards move; any pointer, key or focus in the demo stops it.
 */
export function BoardDemo() {
  const root = useRef<HTMLDivElement>(null);
  const board = useBoard(APPLICATIONS, root);
  const [hint, setHint] = useState<string | null>(null);
  const { move } = board;

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !window.matchMedia('(min-width: 768px)').matches) return;
    const timers: number[] = [];
    const stop = () => {
      timers.forEach((t) => window.clearTimeout(t));
      setHint(null);
      el.removeEventListener('pointerdown', stop);
      el.removeEventListener('keydown', stop);
      el.removeEventListener('focusin', stop);
    };
    el.addEventListener('pointerdown', stop);
    el.addEventListener('keydown', stop);
    el.addEventListener('focusin', stop);
    timers.push(
      window.setTimeout(() => setHint(HINT_CARD), 1200),
      window.setTimeout(() => {
        setHint(null);
        move(HINT_CARD, 'interviewing', { quiet: true });
        stop();
      }, 2400),
    );
    return stop;
  }, [move]);

  return (
    <div ref={root}>
      <AppWindow active="applications">
        <HeroBoardScreen {...board.view} idPrefix="hero" hint={hint} message={board.message} />
      </AppWindow>
    </div>
  );
}
