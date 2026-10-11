import type { Metadata } from 'next';
import { Apps } from '@/site/components/home/Apps';
import { BoardsLine } from '@/site/components/home/BoardsLine';
import { Closing } from '@/site/components/home/Closing';
import { Features } from '@/site/components/home/Features';
import { HomeHero } from '@/site/components/home/HomeHero';
import { Journey } from '@/site/components/home/Journey';
import { Views } from '@/site/components/home/Views';
import { JsonLd } from '@/site/components/seo/JsonLd';
import { ui } from '@/site/content/ui';
import { getFeatures, getHome, getPage, getPlans } from '@/site/lib/content';
import { type Locale } from '@/site/lib/i18n';
import { softwareApplicationLd } from '@/site/lib/jsonld';
import { buildMetadata } from '@/site/lib/seo';

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const page = await getPage('home', locale);
  return buildMetadata({ locale, path: '/', title: page.seo.title, description: page.seo.description, absoluteTitle: true, noindex: page.seo.noindex, ogImageUrl: page.seo.ogImageUrl });
}

/** Homepage, art direction v3 (11 Oct 2026): fixed structure, copy in content/fallback/home.ts. */
export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  const [home, features, plans] = await Promise.all([getHome(locale), getFeatures(locale), getPlans(locale)]);
  const t = ui[locale];

  return (
    <>
      <JsonLd data={softwareApplicationLd(locale, features, plans)} />
      <HomeHero locale={locale} hero={home.hero} />
      <BoardsLine boards={home.boards} note={t.brandsNote} />
      <Features features={home.features} labels={{ prev: t.carouselPrev, next: t.carouselNext, soon: t.soon }} />
      <Journey locale={locale} journey={home.journey} />
      <Views views={home.views} />
      <Apps locale={locale} apps={home.apps} soon={t.soon} />
      <Closing locale={locale} closing={home.closing} />
    </>
  );
}
