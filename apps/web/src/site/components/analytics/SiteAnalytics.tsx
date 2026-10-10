'use client';

import { useEffect, useState } from 'react';
import { buttonStyles } from '@/site/components/ui/buttonStyles';

/**
 * Website analytics, opt-in and out of the first load (SiteAnalyticsLoader fetches this island when the browser
 * is idle). posthog-js is fetched only after the visitor accepts (or already accepted analytics in the app), and
 * only page views and CTA clicks are sent (no autocapture, no session replay, no surveys). The website's own choice is stored apart from the
 * app's, because the app consent also covers identification by email: accepting here does not opt in the app.
 * A "no" given in the app is respected here.
 */

const TOKEN = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN ?? '';
const HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST ?? '';
const SITE_KEY = 'applyspace:site-analytics';
const APP_KEY = `__ph_opt_in_out_${TOKEN}`;
const YES = ['1', 'true', 'yes', 'granted'];
const NO = ['0', 'false', 'no', 'denied'];

type Status = 'off' | 'pending' | 'granted' | 'denied';

function read(key: string): string | null {
  try {
    return window.localStorage.getItem(key)?.replace(/"/g, '') ?? null;
  } catch {
    return null;
  }
}

function storedStatus(): Status {
  if (!TOKEN || !HOST || window.location.hostname.toLowerCase().startsWith('demo.')) return 'off';
  const app = read(APP_KEY);
  if (app && NO.includes(app)) return 'denied';
  const site = read(SITE_KEY);
  if (site && YES.includes(site)) return 'granted';
  if (site && NO.includes(site)) return 'denied';
  if (app && YES.includes(app)) return 'granted';
  return 'pending';
}

type PostHog = typeof import('posthog-js').default;
let client: Promise<PostHog> | null = null;

/** Loads and initialises posthog-js once (this island itself is fetched when the browser is idle). */
function loadPostHog(): Promise<PostHog> {
  client ??= import('posthog-js').then(({ default: posthog }) => {
    if (!posthog.__loaded) {
      posthog.init(TOKEN, {
        api_host: HOST,
        defaults: '2026-05-30',
        capture_pageview: 'history_change',
        capture_pageleave: false,
        autocapture: false,
        capture_dead_clicks: false,
        capture_exceptions: false,
        capture_performance: false,
        enable_heatmaps: false,
        disable_session_recording: true,
        disable_surveys: true,
        disable_external_dependency_loading: true,
      });
    }
    return posthog;
  });
  return client;
}

/** CTA clicks: buttons with `data-cta`, and every link into the app (they carry `utm_source=website`). */
function ctaOf(target: EventTarget | null): { placement: string; href: string } | null {
  const a = (target as Element | null)?.closest?.('a[data-cta], a[href*="utm_source=website"]');
  if (!(a instanceof HTMLAnchorElement)) return null;
  const url = new URL(a.href, window.location.href);
  const placement = a.dataset.cta || url.searchParams.get('utm_content') || 'unknown';
  return { placement, href: url.origin === window.location.origin ? url.pathname + url.hash : url.origin };
}

export function SiteAnalytics({ labels }: { labels: { title: string; body: string; accept: string; decline: string } }) {
  const [status, setStatus] = useState<Status>('off');

  useEffect(() => {
    setStatus(storedStatus()); // eslint-disable-line react-hooks/set-state-in-effect -- reads localStorage once, after hydration
  }, []);

  useEffect(() => {
    if (status !== 'granted') return;
    let alive = true;
    loadPostHog().catch(() => undefined);
    const onClick = (e: MouseEvent) => {
      const cta = ctaOf(e.target);
      if (!cta) return;
      void loadPostHog().then((ph) => alive && ph.capture('website_cta_clicked', { placement: cta.placement, target: cta.href }));
    };
    document.addEventListener('click', onClick, { capture: true });
    return () => {
      alive = false;
      document.removeEventListener('click', onClick, { capture: true });
    };
  }, [status]);

  if (status !== 'pending') return null;

  const choose = (accepted: boolean) => {
    try {
      window.localStorage.setItem(SITE_KEY, accepted ? 'granted' : 'denied');
    } catch {
      // Storage blocked: the choice lasts for this page only.
    }
    setStatus(accepted ? 'granted' : 'denied');
  };

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label={labels.title}
      className="fixed inset-x-4 bottom-4 z-50 flex flex-col gap-3 rounded-2xl border border-stone-200 bg-white p-4 sm:inset-x-auto sm:right-4 sm:w-96"
    >
      <div className="flex flex-col gap-1">
        <p className="text-sm font-medium text-stone-950">{labels.title}</p>
        <p className="text-sm leading-relaxed text-stone-600">{labels.body}</p>
      </div>
      <div className="flex justify-end gap-2">
        <button type="button" onClick={() => choose(false)} className={buttonStyles('secondary')}>
          {labels.decline}
        </button>
        <button type="button" onClick={() => choose(true)} className={buttonStyles('primary')}>
          {labels.accept}
        </button>
      </div>
    </div>
  );
}
