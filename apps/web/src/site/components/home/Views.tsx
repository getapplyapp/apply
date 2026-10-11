import { HomeVisual } from './visuals';
import { FeatureIcon } from '@/site/components/ui/icons';
import type { HomeContent } from '@/site/content/types';
import { cn } from '@/site/lib/cn';

/** "Your applications, your way": the four views of the applications hub, the Board shown. */
export function Views({ views }: { views: HomeContent['views'] }) {
  return (
    <section aria-labelledby="views-title" className="px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-[1240px] text-center">
        <h2 id="views-title" className="font-display text-[clamp(40px,5vw,64px)] leading-none">
          {views.title}
        </h2>
        <ul aria-label={views.label} className="mt-8 flex flex-wrap justify-center gap-2">
          {views.items.map((v, i) => (
            <li key={v.key} className={cn('inline-flex h-10 items-center gap-2 rounded-full border px-4 text-[15px]', i === 0 ? 'border-stone-950 bg-stone-950 text-white' : 'border-stone-200 bg-white text-stone-700')}>
              <FeatureIcon name={v.key} size={18} />
              {v.label}
            </li>
          ))}
        </ul>
        <div className="mx-auto mt-12 max-w-[1180px]">
          <HomeVisual name="board" idPrefix="views" decorative />
        </div>
      </div>
    </section>
  );
}
