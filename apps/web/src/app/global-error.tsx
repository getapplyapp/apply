'use client';

import NextError from 'next/error';
import { useEffect } from 'react';

export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Loaded on demand so posthog-js stays out of the website's first-load JavaScript. It is a no-op when
    // PostHog was not initialised (no consent on the website, no token).
    void import('posthog-js').then(({ default: posthog }) => posthog.captureException(error));
  }, [error]);

  return (
    <html>
      <body>
        <NextError statusCode={0} />
      </body>
    </html>
  );
}
