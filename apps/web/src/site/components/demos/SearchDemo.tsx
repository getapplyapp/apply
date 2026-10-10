'use client';

import { useState } from 'react';
import { SEARCH_INITIAL, SearchScreen, type SearchState } from './SearchScreen';

const toggle = <T,>(list: T[], v: T) => (list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);

/** Live job offers search: the field and filters narrow the list as you type; Save toggles. */
export function SearchDemo() {
  const [state, setState] = useState<SearchState>(SEARCH_INITIAL);
  const set = (patch: Partial<SearchState>) => setState((s) => ({ ...s, ...patch }));
  return (
    <div>
      <SearchScreen
        state={state}
        onQuery={(query) => set({ query })}
        onContract={(c) => setState((s) => ({ ...s, contracts: toggle(s.contracts, c) }))}
        onCity={(city) => set({ city })}
        onRemote={() => setState((s) => ({ ...s, remote: !s.remote }))}
        onSave={(id) => setState((s) => ({ ...s, saved: toggle(s.saved, id) }))}
        onReset={() => setState((s) => ({ ...SEARCH_INITIAL, saved: s.saved, contracts: [], city: 'Anywhere' }))}
      />
    </div>
  );
}
