'use client';

import { useRef, useState } from 'react';
import { STEPS } from './data';
import { INTERVIEW_INITIAL, InterviewScreen, type InterviewState } from './InterviewScreen';

/** Live interview process: click through the rounds (or use the arrow keys) and tick prep notes. */
export function InterviewDemo() {
  const root = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<InterviewState>(INTERVIEW_INITIAL);
  const go = (i: number, focus = false) => {
    const step = Math.max(0, Math.min(STEPS.length - 1, i));
    setState((s) => ({ ...s, step }));
    if (focus) root.current?.querySelector<HTMLButtonElement>(`#interview-tab-${STEPS[step].id}`)?.focus();
  };
  return (
    <div ref={root}>
      <InterviewScreen
        state={state}
        onStep={(i) => go(i)}
        onStepKeyDown={(e) => {
          const last = STEPS.length - 1;
          const to: Record<string, number> = { ArrowRight: state.step === last ? 0 : state.step + 1, ArrowLeft: state.step === 0 ? last : state.step - 1, Home: 0, End: last };
          if (!(e.key in to)) return;
          e.preventDefault();
          go(to[e.key], true);
        }}
        onCheck={(key) => setState((s) => ({ ...s, checked: s.checked.includes(key) ? s.checked.filter((k) => k !== key) : [...s.checked, key] }))}
      />
    </div>
  );
}
