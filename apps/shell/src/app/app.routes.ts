import { Route } from '@angular/router';
import { RemoteRoute } from '@quotes-mfe/remote-loader';

export const appRoutes: Route[] = [
  new RemoteRoute().use('dashboard', 'DashboardPageComponent'),
  new RemoteRoute().use('feed', 'FeedPageComponent'),
  new RemoteRoute().use('register', 'RegisterPageComponent'),
  new RemoteRoute()
    .by(() => import('./profile-page-loader.component'))
    .use('profile', 'ProfilePageComponent'),
];
