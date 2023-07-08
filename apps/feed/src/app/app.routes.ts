import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./feed-page/feed-page.component').then(
        (m) => m.FeedPageComponent
      ),
  },
];
