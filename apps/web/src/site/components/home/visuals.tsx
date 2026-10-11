import { AlertsVisual } from '@/site/components/visuals/AlertsVisual';
import { ApplyVisual } from '@/site/components/visuals/ApplyVisual';
import { HeroBoardVisual } from '@/site/components/visuals/HeroBoardVisual';
import { PrepareVisual } from '@/site/components/visuals/PrepareVisual';
import { ResumeVisual } from '@/site/components/visuals/ResumeVisual';
import { SearchVisual } from '@/site/components/visuals/SearchVisual';
import { TrackVisual } from '@/site/components/visuals/TrackVisual';
import type { VisualProps } from '@/site/components/visuals/types';
import type { HomeVisualKey } from '@/site/content/types';

const VISUALS: Record<HomeVisualKey, (p: VisualProps) => React.ReactNode> = {
  board: HeroBoardVisual,
  resume: ResumeVisual,
  search: SearchVisual,
  alerts: AlertsVisual,
  apply: ApplyVisual,
  track: TrackVisual,
  prepare: PrepareVisual,
};

/** Renders a homepage product visual (inline SVG, server-rendered) by key. */
export function HomeVisual({ name, ...props }: VisualProps & { name: HomeVisualKey }) {
  const V = VISUALS[name];
  return <V {...props} />;
}
