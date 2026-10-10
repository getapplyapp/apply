import type { Metadata } from 'next';
import { LegalPage } from '@/site/components/legal/LegalPage';
import { JsonLd } from '@/site/components/seo/JsonLd';
import { privacyPolicy } from '@/site/content/legal/privacy';
import { ui } from '@/site/content/ui';
import { type Locale } from '@/site/lib/i18n';
import { breadcrumbLd } from '@/site/lib/jsonld';
import { siteUrl } from '@/site/lib/links';
import { buildMetadata } from '@/site/lib/seo';

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({ locale, path: privacyPolicy.path, title: privacyPolicy.title, description: privacyPolicy.description });
}

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params;
  const t = ui[locale];
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: t.breadcrumbHome, url: siteUrl(locale, '/') }, { name: privacyPolicy.title, url: siteUrl(locale, privacyPolicy.path) }])} />
      <LegalPage doc={privacyPolicy} locale={locale} />
    </>
  );
}
