import { PROFILE, READING_STEPS, RESUME_FILE } from './data';
import { AppWindow, Icon, PageHeader } from './parts';
import { cn } from '@/site/lib/cn';

export type ProfilePhase = 'idle' | 'reading' | 'done';
export type ProfileState = { phase: ProfilePhase; reading: number };
export const PROFILE_INITIAL: ProfileState = { phase: 'idle', reading: 0 };

/** A field: the value fades in once read; until then a quiet bar of the same height holds its place. */
function Value({ show, i, children, className }: { show: boolean; i: number; children: React.ReactNode; className?: string }) {
  return show ? (
    <span className={cn('site-field-in block truncate', className)} style={{ '--i': i } as React.CSSProperties}>
      {children}
    </span>
  ) : (
    <span aria-hidden className={cn('block h-2.5 rounded-full bg-stone-100', className)} />
  );
}

function Box({ label, show, i, children }: { label: string; show: boolean; i: number; children: React.ReactNode }) {
  return (
    <div className="min-w-0">
      <p className="text-xs font-medium text-stone-500">{label}</p>
      <div className="mt-1 flex h-9 items-center rounded-lg border border-stone-200 bg-white px-2.5 text-sm text-stone-950">
        <Value show={show} i={i} className={show ? undefined : 'w-2/3'}>
          {children}
        </Value>
      </div>
    </div>
  );
}

const Label = ({ children }: { children: React.ReactNode }) => <p className="text-xs font-medium uppercase tracking-[0.06em] text-stone-500">{children}</p>;

/** Profile filled from a resume: import panel on the left, the fields it fills on the right. */
export function ProfileScreen({ state, onImport, onReset }: { state: ProfileState; onImport?: () => void; onReset?: () => void }) {
  const show = state.phase === 'done';
  const pct = state.phase === 'done' ? 100 : state.phase === 'reading' ? Math.round(((state.reading + 1) / READING_STEPS.length) * 100) : 0;
  return (
    <AppWindow active="profile">
      <PageHeader title="Profile">
        <span className={cn('ml-auto inline-flex h-7 items-center gap-1.5 rounded-full px-2.5 text-xs font-medium', show ? 'bg-green-50 text-green-700' : 'bg-stone-100 text-stone-500')}>
          <Icon name={show ? 'tick' : 'profile'} size={12} />
          {show ? 'Ready to review' : 'Empty profile'}
        </span>
      </PageHeader>
      <div className="grid gap-4 p-3 sm:p-5 md:h-[440px] md:grid-cols-[240px_minmax(0,1fr)]">
        <div className="flex h-[168px] flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-stone-300 bg-stone-50 p-4 text-center md:h-auto">
          {state.phase === 'idle' ? (
            <>
              <span aria-hidden className="flex size-10 items-center justify-center rounded-xl bg-white text-stone-700 ring-1 ring-stone-200">
                <Icon name="upload" size={20} />
              </span>
              <p className="text-xs text-stone-500">PDF or DOCX, or your LinkedIn export</p>
              <button type="button" data-import onClick={onImport} className="inline-flex h-9 items-center gap-1.5 rounded-full bg-stone-950 px-4 text-sm font-medium text-white hover:bg-stone-800">
                Import a resume
              </button>
            </>
          ) : (
            <>
              <span className="flex w-full items-center gap-2 rounded-xl border border-stone-200 bg-white p-2 text-left">
                <span aria-hidden className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-red-50 text-red-700">
                  <Icon name="pdf" size={16} />
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-sm font-medium text-stone-950">{RESUME_FILE}</span>
                  <span className="block text-xs text-stone-500">{show ? 'Read, nothing saved yet' : READING_STEPS[state.reading]}</span>
                </span>
              </span>
              <span aria-hidden className="h-1.5 w-full overflow-hidden rounded-full bg-stone-200">
                <span className="site-progress block h-full rounded-full bg-brand-500" style={{ width: `${pct}%` }} />
              </span>
              <button
                type="button"
                data-reset
                onClick={onReset}
                disabled={!show}
                className="inline-flex h-8 items-center gap-1.5 rounded-full border border-stone-200 bg-white px-3 text-xs font-medium text-stone-800 hover:border-stone-400 disabled:opacity-40"
              >
                <Icon name="again" size={13} />
                Start over
              </button>
            </>
          )}
        </div>

        <div className="flex min-w-0 flex-col gap-4">
          <div className="grid gap-3 sm:grid-cols-3">
            <Box label="Name" show={show} i={0}>
              {PROFILE.name}
            </Box>
            <Box label="Headline" show={show} i={1}>
              {PROFILE.headline}
            </Box>
            <Box label="Location" show={show} i={2}>
              {PROFILE.location}
            </Box>
          </div>
          <div>
            <Label>Experience</Label>
            <ul className="mt-2 flex list-none flex-col gap-1.5">
              {PROFILE.experience.map((e, i) => (
                <li key={e.company} className="flex h-10 items-center gap-3 rounded-lg border border-stone-200 px-2.5 text-sm">
                  <Value show={show} i={3 + i} className={cn('min-w-0 flex-1', !show && 'max-w-56')}>
                    <span className="font-medium text-stone-950">{e.title}</span>
                    <span className="text-stone-500"> · {e.company}</span>
                  </Value>
                  <Value show={show} i={3 + i} className={cn('shrink-0 text-xs text-stone-500', !show && 'w-16')}>
                    {e.dates}
                  </Value>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="min-w-0">
              <Label>Education</Label>
              <div className="mt-2 flex h-10 items-center rounded-lg border border-stone-200 px-2.5 text-sm">
                <Value show={show} i={6} className={cn('min-w-0 flex-1', !show && 'max-w-48')}>
                  <span className="font-medium text-stone-950">{PROFILE.education[0].title}</span>
                </Value>
              </div>
            </div>
            <div className="min-w-0">
              <Label>Languages</Label>
              <div className="mt-2 flex h-10 items-center gap-1.5 overflow-hidden">
                {PROFILE.languages.map((l, i) =>
                  show ? (
                    <span key={l} className="site-field-in inline-flex h-7 shrink-0 items-center rounded-full bg-stone-100 px-2.5 text-xs text-stone-800" style={{ '--i': 7 + i } as React.CSSProperties}>
                      {l}
                    </span>
                  ) : (
                    <span key={l} aria-hidden className="h-7 w-24 rounded-full bg-stone-100" />
                  ),
                )}
              </div>
            </div>
          </div>
          <div>
            <Label>Skills</Label>
            <div className="mt-2 flex h-16 flex-wrap content-start gap-1.5 overflow-hidden">
              {PROFILE.skills.map((s, i) =>
                show ? (
                  <span key={s} className="site-field-in inline-flex h-7 items-center rounded-full border border-stone-200 px-2.5 text-xs text-stone-800" style={{ '--i': 9 + i } as React.CSSProperties}>
                    {s}
                  </span>
                ) : (
                  <span key={s} aria-hidden className="h-7 w-20 rounded-full bg-stone-100" />
                ),
              )}
            </div>
          </div>
        </div>
      </div>
      <p aria-live="polite" className="sr-only">
        {state.phase === 'reading' ? `Reading ${RESUME_FILE}` : show ? 'Profile filled from the resume: name, headline, location, three experiences, education, languages and skills.' : ''}
      </p>
    </AppWindow>
  );
}
