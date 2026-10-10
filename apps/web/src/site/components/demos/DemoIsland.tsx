'use client';

import { useEffect, useRef, useState, type ComponentType, type ReactNode } from 'react';
import type { DemoKey } from '@/site/content/types';

type Loaded = ComponentType<Record<string, unknown>>;

/** Each live demo is its own chunk, fetched only when needed: none of them is in the page's first-load JavaScript. */
const LOADERS: Record<DemoKey, () => Promise<Loaded>> = {
  board: () => import('./BoardDemo').then((m) => m.BoardDemo as Loaded),
  applications: () => import('./ApplicationsDemo').then((m) => m.ApplicationsDemo as unknown as Loaded),
  search: () => import('./SearchDemo').then((m) => m.SearchDemo as Loaded),
  interviews: () => import('./InterviewDemo').then((m) => m.InterviewDemo as Loaded),
  profile: () => import('./ProfileDemo').then((m) => m.ProfileDemo as Loaded),
};

type IdleWindow = Window & { requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number; cancelIdleCallback?: (id: number) => void };

/**
 * Lazy hydration for a product demo. The server renders the demo's first state (`children`, plain HTML from a
 * pure view, no JavaScript); this island swaps in the live component, which renders the same markup, once the
 * demo comes near the viewport (or right after idle with `eager`, for the hero), or as soon as the visitor
 * points at or focuses it. No layout shift: both renders have the same size.
 */
export function DemoIsland({ demo, label, eager = false, props, children }: { demo: DemoKey; label: string; eager?: boolean; props?: Record<string, unknown>; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [Live, setLive] = useState<Loaded | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const w = window as IdleWindow;
    let cancelled = false;
    let started = false;
    let idle: number | undefined;
    let io: IntersectionObserver | undefined;

    const cleanup = () => {
      io?.disconnect();
      if (idle !== undefined) (w.cancelIdleCallback ?? window.clearTimeout)(idle);
      el.removeEventListener('pointerenter', load);
      el.removeEventListener('focusin', load);
      el.removeEventListener('touchstart', load);
    };
    function load() {
      if (started) return;
      started = true;
      cleanup();
      LOADERS[demo]()
        .then((C) => {
          if (!cancelled) setLive(() => C);
        })
        .catch(() => {
          started = false; // offline or a failed chunk: the static demo stays, the next interaction retries
        });
    }

    el.addEventListener('pointerenter', load);
    el.addEventListener('focusin', load);
    el.addEventListener('touchstart', load, { passive: true });
    if (eager) {
      idle = w.requestIdleCallback ? w.requestIdleCallback(load, { timeout: 2000 }) : window.setTimeout(load, 300);
    } else if ('IntersectionObserver' in window) {
      io = new IntersectionObserver((entries) => entries.some((e) => e.isIntersecting) && load(), { rootMargin: '400px 0px' });
      io.observe(el);
    } else {
      load();
    }
    return () => {
      cancelled = true;
      cleanup();
    };
  }, [demo, eager]);

  return (
    <div ref={ref} role="group" aria-label={label} data-demo={demo} data-live={Live ? '' : undefined}>
      {Live ? <Live {...props} /> : children}
    </div>
  );
}
