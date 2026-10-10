import type { DemoIconName } from './parts';

export type HubViewKey = 'board' | 'table' | 'timeline' | 'map';

/** Layouts of the Applications hub, in the product order. */
export const HUB_VIEWS: { key: HubViewKey; label: string; icon: DemoIconName }[] = [
  { key: 'board', label: 'Board', icon: 'board' },
  { key: 'table', label: 'Table', icon: 'table' },
  { key: 'timeline', label: 'Timeline', icon: 'timeline' },
  { key: 'map', label: 'Map', icon: 'map' },
];
