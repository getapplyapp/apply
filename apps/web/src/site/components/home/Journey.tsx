import { JourneySwitcher } from './JourneySwitcher';
import { HomeVisual } from './visuals';
import Link from 'next/link';
import { FeatureIcon } from '@/site/components/ui/icons';
import type { HomeContent } from '@/site/content/types';
import { internalHref } from '@/site/lib/links';
import type { Locale } from '@/site/lib/i18n';

const ICONS = { find: 'search', apply: 'pen', track: 'board', prepare: 'interview' } as const;

/** Find, Apply, Track, Prepare: the path of a job search, one visual per step. */
export function Journey({ locale, journey }: { locale: Locale; journey: HomeContent['journey'] }) {
  return (
    <section aria-labelledby="journey-title" className="px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-[1240px]">
        <h2 id="journey-title" className="font-display max-w-[760px] text-[clamp(40px,5vw,64px)] leading-none">
          {journey.label}
        </h2>
        <div className="mt-12">
          <JourneySwitcher
            items={journey.steps.map((s) => ({
              key: s.key,
              title: s.title,
              text: s.text,
              icon: <FeatureIcon name={ICONS[s.key]} size={22} />,
              link: (
                <Link href={internalHref(locale, s.link.href)} className="inline-flex min-h-8 items-center text-[15px] text-stone-950 underline decoration-stone-300 underline-offset-4 hover:decoration-stone-950">
                  {s.link.label}
                </Link>
              ),
            }))}
            panels={journey.steps.map((s) => (
              <HomeVisual key={s.key} name={s.visual} idPrefix={`journey-${s.key}`} decorative />
            ))}
          />
        </div>
      </div>
    </section>
  );
}
