import { Route } from '@angular/router';
import {
  RemoteComponentLoaderComponent,
  RemoteRouteData,
} from '@quotes-mfe/remote-loader';

export const appRoutes: Route[] = [
  {
    path: 'register',
    component: RemoteComponentLoaderComponent,
    data: {
      remote: 'register',
      exposed: 'RegisterPageComponent',
    } satisfies RemoteRouteData,
  },
  {
    path: 'feed',
    component: RemoteComponentLoaderComponent,
    data: {
      remote: 'feed',
      exposed: 'FeedPageComponent',
    } satisfies RemoteRouteData,
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./profile-page-loader.component').then(
        (c) => c.ProfilePageLoaderComponent
      ),
    data: {
      remote: 'profile',
      exposed: 'ProfilePageComponent',
    } satisfies RemoteRouteData,
  },
];
