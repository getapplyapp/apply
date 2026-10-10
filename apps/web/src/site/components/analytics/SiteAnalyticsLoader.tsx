'use client';

import { useEffect, useState, type ComponentType } from 'react';

type Labels = { title: string; body: string; accept: string; decline: string };
type Loaded = ComponentType<{ labels: Labels }>;

/**
 * Fetches the analytics island (consent prompt, then PostHog after consent) once the browser is idle, so not
 * even the prompt is in the first-load JavaScript. Renders nothing when PostHog is not configured.
 */
export function SiteAnalyticsLoader({ labels }: { labels: Labels }) {
  const [Island, setIsland] = useState<Loaded | null>(null);

  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN || !process.env.NEXT_PUBLIC_POSTHOG_HOST) return;
    const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number; cancelIdleCallback?: (id: number) => void };
    let alive = true;
    const load = () => void import('./SiteAnalytics').then((m) => alive && setIsland(() => m.SiteAnalytics));
    const id = w.requestIdleCallback ? w.requestIdleCallback(load, { timeout: 3000 }) : window.setTimeout(load, 1500);
    return () => {
      alive = false;
      (w.cancelIdleCallback ?? window.clearTimeout)(id);
    };
  }, []);

  return Island ? <Island labels={labels} /> : null;
}
