'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { buttonStyles } from '@/site/components/ui/buttonStyles';

type NavItem = { label: string; href: string };

/** The only client component of the header: a disclosure panel for small screens. */
export function MobileMenu({
  nav,
  signInHref,
  startHref,
  labels,
}: {
  nav: NavItem[];
  signInHref: string;
  startHref: string;
  labels: { menu: string; close: string; signIn: string; start: string; nav: string };
}) {
  // The menu is open for the path it was opened on, so navigating closes it without an effect.
  const pathname = usePathname();
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpenOn(null);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? labels.close : labels.menu}
        onClick={() => setOpenOn(open ? null : pathname)}
        className="flex size-10 items-center justify-center rounded-full hover:bg-stone-100"
      >
        {/* Hugeicons Menu01 and Cancel01, inlined to keep the icon library out of the first-load JavaScript. */}
        <svg aria-hidden width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
          <path d={open ? 'M18 6L6 18M18 18L6 6' : 'M4 5H20M4 12H20M4 19H20'} />
        </svg>
      </button>
      {open && (
        <div id="mobile-menu" className="absolute inset-x-0 top-full border-t border-stone-200 bg-white px-4 pb-6 pt-2">
          <nav aria-label={labels.nav} className="flex flex-col">
            {nav.map((item) => (
              <Link key={item.href} href={item.href} className="border-b border-stone-100 py-3 text-base font-medium">
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-5 flex flex-col gap-2">
            <a href={signInHref} className={buttonStyles('secondary', 'lg', 'w-full')}>
              {labels.signIn}
            </a>
            <a href={startHref} className={buttonStyles('primary', 'lg', 'w-full')}>
              {labels.start}
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
