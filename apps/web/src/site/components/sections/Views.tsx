import { body, eyebrow, h2, sectionTop, wrap } from './styles';
import { DemoIsland } from '@/site/components/demos/DemoIsland';
import { DemoStatic } from '@/site/components/demos/DemoStatic';
import { HUB_VIEWS } from '@/site/components/demos/copy';
import type { Section } from '@/site/content/types';
import { ui } from '@/site/content/ui';
import { cn } from '@/site/lib/cn';
import type { Locale } from '@/site/lib/i18n';

/** The applications hub: the live demo with its four layouts behind accessible tabs, on the same data. */
export function Views({ locale, section, figure }: { locale: Locale; section: Extract<Section, { type: 'views' }>; figure: number }) {
  const key = section.anchor ?? 'views';
  const t = ui[locale];
  const views = section.views.map((v) => ({ ...v, icon: HUB_VIEWS.find((h) => h.key === v.key)?.icon ?? 'board' }));
  return (
    <section id={section.anchor} aria-labelledby={`h-${key}`} className={cn(wrap, sectionTop)}>
      <div data-reveal className="max-w-[720px] sm:mx-auto sm:text-center">
        <p className={eyebrow}>{section.eyebrow}</p>
        <h2 id={`h-${key}`} className={cn(h2, 'mt-4')}>
          {section.title}
        </h2>
        <p className={cn(body, 'mt-5')}>{section.intro}</p>
      </div>
      <div className="mx-auto mt-10 max-w-[1120px] sm:mt-12">
        <DemoIsland demo="applications" label={section.label} props={{ views, figure, figureLabel: t.figure }}>
          <DemoStatic demo="applications" views={views} figure={figure} figureLabel={t.figure} />
        </DemoIsland>
      </div>
    </section>
  );
}
