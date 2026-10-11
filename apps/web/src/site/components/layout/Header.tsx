import Link from 'next/link';
import { MobileMenu } from './MobileMenu';
import { Plume } from '@/site/components/ui/Plume';
import { buttonStyles } from '@/site/components/ui/buttonStyles';
import type { SiteSettings } from '@/site/content/types';
import { ui } from '@/site/content/ui';
import { localePath, type Locale } from '@/site/lib/i18n';
import { appHref, internalHref } from '@/site/lib/links';

const navLink = 'inline-flex min-h-10 items-center text-[15px] text-stone-950 hover:text-[#5B2A86] focus-visible:rounded-sm';

/** Plume left, navigation centre, Sign in and Get started for free right; on phones the plume and a compact menu. */
export function Header({ locale, settings }: { locale: Locale; settings: SiteSettings }) {
  const t = ui[locale];
  const nav = settings.nav.map((n) => ({ label: n.label, href: internalHref(locale, n.href) }));
  const signIn = appHref('/login', 'header-sign-in');
  const start = appHref('/login', 'header-start');

  return (
    <header className="relative z-40">
      <div className="mx-auto grid h-[88px] max-w-[1360px] grid-cols-[1fr_auto] items-center gap-4 px-4 sm:px-8 md:grid-cols-3">
        <Link href={localePath(locale, '/')} aria-label={t.homeLabel} className="flex justify-self-start rounded-sm">
          <Plume className="h-auto w-10 text-stone-950" />
        </Link>

        <nav aria-label={t.mainNav} className="hidden items-center justify-center gap-9 md:flex">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className={navLink}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center justify-end gap-6 md:flex">
          <a href={signIn} className={navLink}>
            {t.signIn}
          </a>
          <a href={start} className={buttonStyles('primary')}>
            {t.startFree}
          </a>
        </div>

        <MobileMenu
          nav={nav}
          signInHref={signIn}
          startHref={start}
          labels={{ menu: t.menu, close: t.closeMenu, signIn: t.signIn, start: t.startFree, nav: t.mainNav }}
        />
      </div>
    </header>
  );
}
