import { ApplicationsScreen, type HubViewItem } from './ApplicationsScreen';
import { APPLICATIONS } from './data';
import { HeroBoardScreen } from './HeroBoard';
import { INTERVIEW_INITIAL, InterviewScreen } from './InterviewScreen';
import { AppWindow } from './parts';
import { PROFILE_INITIAL, ProfileScreen } from './ProfileScreen';
import { SEARCH_INITIAL, SearchScreen } from './SearchScreen';
import type { DemoKey } from '@/site/content/types';

/**
 * First state of each demo, rendered on the server with the same pure views as the live demos (so the swap
 * on hydration changes nothing on screen). Also used as is for decorative, non-interactive crops.
 */
export function DemoStatic({ demo, idPrefix, views = [], figure, figureLabel = 'Fig.' }: { demo: DemoKey; idPrefix?: string; views?: HubViewItem[]; figure?: number; figureLabel?: string }) {
  switch (demo) {
    case 'board':
      return (
        <div>
          <AppWindow active="applications">
            <HeroBoardScreen apps={APPLICATIONS} mobileColumn="waiting" idPrefix={idPrefix ?? 'hero'} hint={null} />
          </AppWindow>
        </div>
      );
    case 'applications':
      return (
        <div>
          <ApplicationsScreen
            views={views}
            active={views[0]?.key ?? 'board'}
            figure={figure}
            figureLabel={figureLabel}
            board={{ apps: APPLICATIONS, mobileColumn: 'waiting', idPrefix: idPrefix ?? 'views' }}
            sort={{ key: 'applied', dir: 'desc' }}
            pick={null}
            place="paris10"
          />
        </div>
      );
    case 'search':
      return (
        <div>
          <SearchScreen state={SEARCH_INITIAL} />
        </div>
      );
    case 'interviews':
      return (
        <div>
          <InterviewScreen state={INTERVIEW_INITIAL} />
        </div>
      );
    case 'profile':
      return (
        <div>
          <ProfileScreen state={PROFILE_INITIAL} />
        </div>
      );
  }
}
