import type { HomeContent } from '@/site/content/types';

/**
 * The job boards apply searches, one line of wordmarks (the onboarding picker list). Brand logos (Brandfetch) can
 * replace the wordmarks later; the note stays.
 */
export function BoardsLine({ boards, note }: { boards: HomeContent['boards']; note: string }) {
  return (
    <section aria-labelledby="boards-title" className="px-4 py-14 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-[1240px] text-center">
        <h2 id="boards-title" className="text-[15px] text-stone-600">
          {boards.title}
        </h2>
        <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-lg text-stone-500 sm:gap-x-10">
          {boards.items.map((b) => (
            <li key={b.domain} className="whitespace-nowrap">
              {b.name}
            </li>
          ))}
        </ul>
        <p className="mt-5 text-xs text-stone-400">{note}</p>
      </div>
    </section>
  );
}
