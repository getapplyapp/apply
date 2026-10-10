'use client';

import { useEffect, useRef, useState } from 'react';
import { buttonStyles } from '@/site/components/ui/buttonStyles';

/**
 * Website cookie consent and analytics, out of the first load (SiteAnalyticsLoader fetches this island when the
 * browser is idle, or when "Cookie settings" is pressed). It opens a centered modal dialog while no choice is
 * stored. posthog-js is fetched only after the visitor accepts (or already accepted analytics in the app), and
 * only page views and CTA clicks are sent (no autocapture, no session replay, no surveys). The website's choice is
 * stored apart from the app's, because the app consent also covers identification by email: accepting here does
 * not opt in the app. A "no" given in the app is respected here. Closing the dialog (Esc) is not a choice: it
 * opens again on the next page load.
 */

const TOKEN = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN ?? '';
const HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST ?? '';
const SITE_KEY = 'applyspace:site-analytics';
const APP_KEY = `__ph_opt_in_out_${TOKEN}`;
const YES = ['1', 'true', 'yes', 'granted'];
const NO = ['0', 'false', 'no', 'denied'];

type Status = 'off' | 'pending' | 'granted' | 'denied';
export type ConsentLabels = { title: string; body: string; accept: string; decline: string; policy: string; policyHref: string };

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
/** Events leave the page only while this is true (a later "Reject all" stops them without reloading). */
let allowed = false;

/** Loads and initialises posthog-js once. */
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
        before_send: (event) => (allowed ? event : null),
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

const FOCUSABLE = 'a[href], button:not([disabled])';

/** `reopen` grows each time "Cookie settings" is pressed. */
export function SiteAnalytics({ labels, reopen }: { labels: ConsentLabels; reopen: number }) {
  const [status, setStatus] = useState<Status>('off');
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const s = storedStatus();
    setStatus(s); // eslint-disable-line react-hooks/set-state-in-effect -- reads localStorage once, after hydration
    if (s === 'pending') setOpen(true);
  }, []);

  useEffect(() => {
    if (reopen > 0) setOpen(true); // eslint-disable-line react-hooks/set-state-in-effect -- an outside request to open
  }, [reopen]);

  useEffect(() => {
    allowed = status === 'granted';
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

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) {
      d.showModal();
      d.focus();
    } else if (!open && d.open) {
      d.close();
    }
  }, [open]);

  const choose = (accepted: boolean) => {
    try {
      window.localStorage.setItem(SITE_KEY, accepted ? 'granted' : 'denied');
    } catch {
      // Storage blocked: the choice lasts for this page only.
      setStatus(accepted && TOKEN && HOST ? 'granted' : 'denied');
      setOpen(false);
      return;
    }
    setStatus(storedStatus());
    setOpen(false);
  };

  /** Keeps Tab inside the dialog (the page behind is inert, but Tab could still reach the browser UI). */
  const onKeyDown = (e: React.KeyboardEvent<HTMLDialogElement>) => {
    if (e.key !== 'Tab' || !ref.current) return;
    const items = Array.from(ref.current.querySelectorAll<HTMLElement>(FOCUSABLE));
    if (!items.length) return;
    const first = items[0];
    const last = items[items.length - 1];
    const active = document.activeElement;
    if (e.shiftKey && (active === first || active === ref.current)) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && active === last) {
      e.preventDefault();
      first.focus();
    }
  };

  return (
    <dialog
      ref={ref}
      tabIndex={-1}
      aria-labelledby="cookie-title"
      aria-describedby="cookie-body"
      onClose={() => setOpen(false)}
      onKeyDown={onKeyDown}
      className="site-dialog m-auto w-[calc(100%-32px)] max-w-[440px] rounded-2xl border border-stone-200 bg-white p-6 text-stone-950 shadow-[0_24px_48px_-12px_rgb(28_25_23/0.18)] outline-none backdrop:bg-stone-950/20 sm:p-7"
    >
      <h2 id="cookie-title" className="text-pretty text-base font-semibold leading-[1.4] tracking-tight">
        {labels.title}
      </h2>
      <p id="cookie-body" className="mt-2 text-pretty text-sm leading-[1.6] text-stone-600">
        {labels.body}
      </p>
      <a href={labels.policyHref} className="mt-3 inline-flex min-h-8 items-center text-sm font-medium text-stone-950 underline decoration-stone-300 underline-offset-4 hover:decoration-stone-950">
        {labels.policy}
      </a>
      <div className="mt-5 grid grid-cols-2 gap-2">
        <button type="button" onClick={() => choose(false)} className={buttonStyles('secondary', 'md', 'w-full')}>
          {labels.decline}
        </button>
        <button type="button" onClick={() => choose(true)} className={buttonStyles('secondary', 'md', 'w-full')}>
          {labels.accept}
        </button>
      </div>
    </dialog>
  );
}
