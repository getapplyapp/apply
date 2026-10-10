import Link from 'next/link';
import { buttonStyles } from './buttonStyles';
import { FeatureIcon } from './icons';
import type { Cta } from '@/site/content/types';
import type { Locale } from '@/site/lib/i18n';
import { ctaHref } from '@/site/lib/links';

/**
 * A CMS call to action as a button: internal pages through next/link, app and download links as plain anchors.
 * `data-cta` names the placement for the click event (SiteAnalytics, after consent).
 */
export function CtaButton({ cta, locale, placement, variant = 'primary', className }: { cta: Cta; locale: Locale; placement: string; variant?: 'primary' | 'secondary'; className?: string }) {
  const href = ctaHref(cta, locale, placement);
  const cls = buttonStyles(variant, 'lg', className);
  const label = (
    <>
      {cta.kind === 'download' && <FeatureIcon name="apple" size={18} />}
      {cta.label}
    </>
  );
  if (cta.kind === 'internal' || !cta.kind) {
    return (
      <Link href={href} className={cls} data-cta={placement}>
        {label}
      </Link>
    );
  }
  return (
    <a href={href} className={cls} data-cta={placement}>
      {label}
    </a>
  );
}
