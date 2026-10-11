import { SoonBadge } from './SoonBadge';
import { CtaButton } from '@/site/components/ui/CtaButton';
import { FeatureIcon } from '@/site/components/ui/icons';
import type { HomeContent } from '@/site/content/types';
import type { Locale } from '@/site/lib/i18n';

const ICON = { desktop: 'apple', mobile: 'mobile', extension: 'browser' } as const;
const TILE = { desktop: 'var(--tile-lilac)', mobile: 'var(--tile-peach)', extension: 'var(--tile-blue)' } as const;

/** Desktop app, mobile app and Chrome extension. */
export function Apps({ locale, apps, soon }: { locale: Locale; apps: HomeContent['apps']; soon: string }) {
  return (
    <section id="download" aria-labelledby="apps-title" className="px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-[1240px]">
        <h2 id="apps-title" className="font-display text-center text-[clamp(40px,5vw,64px)] leading-none">
          {apps.title}
        </h2>
        <ul className="mt-12 grid gap-4 md:grid-cols-3">
          {apps.items.map((app) => (
            <li key={app.key} className="flex flex-col rounded-3xl border border-stone-200 bg-white p-7">
              <span className="flex size-14 items-center justify-center rounded-2xl text-stone-950" style={{ background: TILE[app.key] }}>
                <FeatureIcon name={ICON[app.key]} size={26} />
              </span>
              <div className="mt-6 flex items-center gap-2.5">
                <h3 className="text-xl">{app.title}</h3>
                {app.soon && <SoonBadge label={soon} />}
              </div>
              <p className="mt-2 flex-1 text-pretty text-[15px] leading-[1.55] text-stone-600">{app.text}</p>
              <CtaButton cta={app.cta} locale={locale} placement={`apps-${app.key}`} variant={app.soon ? 'secondary' : 'primary'} className="mt-7 self-start" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
