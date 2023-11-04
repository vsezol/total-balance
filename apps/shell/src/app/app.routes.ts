import { Route } from '@angular/router';
import { RemoteRoute } from '@quotes-mfe/remote-loader';

export const appRoutes: Route[] = [
  new RemoteRoute().for('feed').use('feed', 'FeedPageComponent'),
  new RemoteRoute().for('register').use('register', 'RegisterPageComponent'),
  new RemoteRoute()
    .for('profile')
    .by(() => import('./profile-page-loader.component'))
    .use('profile', 'ProfilePageComponent'),
];
