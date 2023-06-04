import { NxWelcomeComponent } from './nx-welcome.component';
import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'feed',
    loadChildren: () => import('feed/Module').then((m) => m.RemoteEntryModule),
  },
  {
    path: 'sidebar',
    loadChildren: () =>
      import('sidebar/Module').then((m) => m.RemoteEntryModule),
  },
  {
    path: '',
    component: NxWelcomeComponent,
  },
];
