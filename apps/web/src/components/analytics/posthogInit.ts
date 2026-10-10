import posthog from 'posthog-js';

/**
 * PostHog for the product (web and desktop), initialised once when the app's Providers module loads, before
 * the first render. It used to live in `instrumentation-client.ts`, which runs on every route: that put
 * posthog-js in the first-load JavaScript of the public website too. The website loads PostHog on its own,
 * after consent (`src/site/components/analytics/SiteAnalytics.tsx`).
 */
const projectToken = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
const host = process.env.NEXT_PUBLIC_POSTHOG_HOST;

function init() {
  // The public demo (demo.applyspace.app) never loads PostHog: nothing to opt out of, nothing sent.
  if (window.location.hostname.toLowerCase().startsWith('demo.')) return;
  if (!projectToken || !host) {
    if (process.env.NODE_ENV === 'development') {
      const missing = projectToken ? 'NEXT_PUBLIC_POSTHOG_HOST' : 'NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN';
      console.warn(`${missing} is missing: PostHog is off and events are silently dropped.`);
    }
    return;
  }
  posthog.init(projectToken, {
    api_host: host,
    defaults: '2026-05-30',
    // Opt-in: nothing is captured (events, pageviews, exceptions, identify) until the user accepts.
    opt_out_capturing_by_default: true,
    capture_exceptions: true,
    tracing_headers: [window.location.hostname],
    debug: process.env.NODE_ENV === 'development',
  });
}

if (typeof window !== 'undefined' && !posthog.__loaded) init();
