import { DemoIsland } from './DemoIsland';
import { DemoStatic } from './DemoStatic';
import type { Demo } from '@/site/content/types';
import { ui } from '@/site/content/ui';
import { cn } from '@/site/lib/cn';
import type { Locale } from '@/site/lib/i18n';

/** A product demo in a figure: server-rendered first state, live once near the viewport, "Fig. N - caption" below. */
export function LiveDemo({ locale, demo, figure, eager = false, className }: { locale: Locale; demo: Demo; figure?: number; eager?: boolean; className?: string }) {
  const t = ui[locale];
  const caption = demo.caption && figure !== undefined ? `${t.figure} ${figure} - ${demo.caption}` : demo.caption;
  return (
    <figure className={cn('min-w-0', className)}>
      <DemoIsland demo={demo.key} label={demo.label} eager={eager}>
        <DemoStatic demo={demo.key} />
      </DemoIsland>
      {caption && <figcaption className="mt-3 text-[13px] leading-snug text-stone-600">{caption}</figcaption>}
    </figure>
  );
}
