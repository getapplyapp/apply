import { Carousel } from './Carousel';
import { SoonBadge } from './SoonBadge';
import { HomeVisual } from './visuals';
import type { HomeContent } from '@/site/content/types';

/** "Everything your search needs": one row of feature cards, each with its product visual. */
export function Features({ features, labels }: { features: HomeContent['features']; labels: { prev: string; next: string; soon: string } }) {
  return (
    <section aria-labelledby="features-title" className="py-16 sm:py-24">
      <Carousel title={features.title} titleId="features-title" labels={labels}>
        {features.cards.map((card) => (
          <li key={card.title} className="w-[min(400px,82vw)] shrink-0">
            <article className="h-full">
              <div className="overflow-hidden rounded-3xl border border-stone-950/[0.06]">
                <HomeVisual name={card.visual} idPrefix={`card-${card.visual}`} decorative />
              </div>
              <div className="mt-5 flex items-center gap-2.5">
                <h3 className="text-lg text-stone-950">{card.title}</h3>
                {card.soon && <SoonBadge label={labels.soon} />}
              </div>
              <p className="mt-2 text-pretty text-[15px] leading-[1.55] text-stone-600">{card.text}</p>
            </article>
          </li>
        ))}
      </Carousel>
    </section>
  );
}
