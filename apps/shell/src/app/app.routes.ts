import { Route } from '@angular/router';
import { RemoteRoute } from '@quotes-mfe/remote-loader';

export const appRoutes: Route[] = [
  new RemoteRoute()
    .by(() => import('./remote-loader.component'))
    .use('dashboard', 'DashboardPageComponent'),
  new RemoteRoute()
    .by(() => import('./remote-loader.component'))
    .use('feed', 'FeedPageComponent'),
  new RemoteRoute()
    .by(() => import('./remote-loader.component'))
    .use('register', 'RegisterPageComponent'),
  new RemoteRoute()
    .by(() => import('./profile-page-loader.component'))
    .use('profile', 'ProfilePageComponent'),
];
