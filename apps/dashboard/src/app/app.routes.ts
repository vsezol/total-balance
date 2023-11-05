import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./dashboard-page/dashboard-page.component').then(
        (m) => m.DashboardPageComponent
      ),
  },
];
