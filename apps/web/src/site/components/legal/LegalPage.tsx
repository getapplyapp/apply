import Link from 'next/link';
import { LEGAL_LAST_UPDATED, legalConfig } from '@/site/content/legal/config';
import type { Block, Inline, LegalDocument } from '@/site/content/legal/document';
import { ui } from '@/site/content/ui';
import type { Locale } from '@/site/lib/i18n';
import { internalHref } from '@/site/lib/links';

const dateFmt = (iso: string, locale: string) =>
  new Intl.DateTimeFormat(locale, { dateStyle: 'long', timeZone: 'UTC' }).format(new Date(iso));

function InlinePart({ part, locale }: { part: Inline; locale: Locale }) {
  if (typeof part === 'string') return <>{part}</>;
  if ('field' in part) {
    const { label, value } = legalConfig[part.field];
    if (value) return <>{value}</>;
    return (
      <mark data-placeholder={part.field} className="rounded-md bg-amber-100 px-1 py-0.5 text-[0.9em] font-medium text-amber-900">
        {ui[locale].toBeCompleted(label)}
      </mark>
    );
  }
  const className = 'font-medium text-stone-950 underline underline-offset-4 hover:text-brand-700';
  if (/^https?:\/\//.test(part.href)) {
    return (
      <a href={part.href} className={className} rel="noopener noreferrer">
        {part.text}
      </a>
    );
  }
  return (
    <Link href={internalHref(locale, part.href)} className={className}>
      {part.text}
    </Link>
  );
}

function Parts({ parts, locale }: { parts: Inline[]; locale: Locale }) {
  return parts.map((part, i) => <InlinePart key={i} part={part} locale={locale} />);
}

function BlockView({ block, locale }: { block: Block; locale: Locale }) {
  if (block.kind === 'p') {
    return (
      <p className="my-4 text-pretty">
        <Parts parts={block.parts} locale={locale} />
      </p>
    );
  }
  return (
    <ul className="my-4 list-disc space-y-2 pl-6 marker:text-stone-400">
      {block.items.map((item, i) => (
        <li key={i} className="pl-1 text-pretty">
          <Parts parts={item} locale={locale} />
        </li>
      ))}
    </ul>
  );
}

/** Long-form legal page: title, last updated date, table of contents with anchors, sections. */
export function LegalPage({ doc, locale }: { doc: LegalDocument; locale: Locale }) {
  const t = ui[locale];
  return (
    <article className="mx-auto max-w-6xl px-4 pt-12 sm:px-6 sm:pt-16">
      <header className="max-w-[70ch]">
        <h1 className="font-display text-balance text-4xl text-stone-950 sm:text-5xl">{doc.title}</h1>
        <p className="mt-4 text-sm text-stone-500">
          {t.lastUpdated} <time dateTime={LEGAL_LAST_UPDATED}>{dateFmt(LEGAL_LAST_UPDATED, locale)}</time>
        </p>
      </header>

      <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,70ch)_15rem] lg:justify-between">
        <nav
          aria-labelledby="toc-heading"
          className="rounded-3xl bg-stone-100 p-5 lg:sticky lg:top-24 lg:order-2 lg:self-start lg:bg-transparent lg:p-0"
        >
          <h2 id="toc-heading" className="text-sm font-semibold text-stone-950">
            {t.onThisPage}
          </h2>
          <ol className="mt-3 list-none space-y-2 text-sm">
            {doc.sections.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="text-stone-600 hover:text-stone-950">
                  {s.heading}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="min-w-0 max-w-[70ch] leading-relaxed text-stone-700 lg:order-1">
          {doc.intro.map((block, i) => (
            <BlockView key={i} block={block} locale={locale} />
          ))}
          {doc.sections.map((s) => (
            <section key={s.id} aria-labelledby={s.id}>
              <h2 id={s.id} className="font-display mt-12 mb-3 text-2xl text-stone-950">
                {s.heading}
              </h2>
              {s.blocks.map((block, i) => (
                <BlockView key={i} block={block} locale={locale} />
              ))}
            </section>
          ))}
        </div>
      </div>
    </article>
  );
}
