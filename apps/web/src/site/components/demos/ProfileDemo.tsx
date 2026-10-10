'use client';

import { useEffect, useRef, useState } from 'react';
import { READING_STEPS } from './data';
import { PROFILE_INITIAL, ProfileScreen, type ProfileState } from './ProfileScreen';

const STEP_MS = 450;

/** Live resume import: "Import a resume" plays the reading steps, then the fields fill in. Instant under reduced motion. */
export function ProfileDemo() {
  const [state, setState] = useState<ProfileState>(PROFILE_INITIAL);
  const timers = useRef<number[]>([]);
  const root = useRef<HTMLDivElement>(null);
  const keepFocus = useRef(false);

  const clear = () => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  };
  useEffect(() => clear, []);

  // The import and reset buttons replace each other: keep keyboard focus in the demo.
  useEffect(() => {
    if (!keepFocus.current || state.phase === 'reading') return;
    keepFocus.current = false;
    root.current?.querySelector<HTMLButtonElement>(state.phase === 'done' ? '[data-reset]' : '[data-import]')?.focus();
  }, [state.phase]);

  const start = () => {
    clear();
    keepFocus.current = root.current?.contains(document.activeElement) ?? false;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setState({ phase: 'done', reading: READING_STEPS.length - 1 });
      return;
    }
    setState({ phase: 'reading', reading: 0 });
    READING_STEPS.forEach((_, i) => {
      if (i > 0) timers.current.push(window.setTimeout(() => setState({ phase: 'reading', reading: i }), i * STEP_MS));
    });
    timers.current.push(window.setTimeout(() => setState({ phase: 'done', reading: READING_STEPS.length - 1 }), READING_STEPS.length * STEP_MS));
  };

  return (
    <div ref={root}>
      <ProfileScreen
        state={state}
        onImport={start}
        onReset={() => {
          clear();
          keepFocus.current = true;
          setState(PROFILE_INITIAL);
        }}
      />
    </div>
  );
}
