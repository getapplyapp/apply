import type { Metadata } from 'next';
import { LegalPage } from '@/site/components/legal/LegalPage';
import { JsonLd } from '@/site/components/seo/JsonLd';
import { termsOfUse } from '@/site/content/legal/terms';
import { ui } from '@/site/content/ui';
import { type Locale } from '@/site/lib/i18n';
import { breadcrumbLd } from '@/site/lib/jsonld';
import { siteUrl } from '@/site/lib/links';
import { buildMetadata } from '@/site/lib/seo';

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({ locale, path: termsOfUse.path, title: termsOfUse.title, description: termsOfUse.description });
}

export default async function TermsPage({ params }: Props) {
  const { locale } = await params;
  const t = ui[locale];
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: t.breadcrumbHome, url: siteUrl(locale, '/') }, { name: termsOfUse.title, url: siteUrl(locale, termsOfUse.path) }])} />
      <LegalPage doc={termsOfUse} locale={locale} />
    </>
  );
}
