import { Route } from '@angular/router';
import { loadUnwrappedRemoteModule } from './functions/load-unwrapped-remote-module';

export const appRoutes: Route[] = [
  {
    path: 'register',
    loadComponent: () =>
      loadUnwrappedRemoteModule('register', 'RegisterPageComponent'),
  },
  {
    path: 'profile',
    loadComponent: () =>
      loadUnwrappedRemoteModule('profile', 'ProfilePageComponent'),
  },
  {
    path: 'feed',
    loadComponent: () => loadUnwrappedRemoteModule('feed', 'FeedPageComponent'),
  },
];
