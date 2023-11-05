import { ModuleFederationConfig } from '@nx/webpack';

const config: ModuleFederationConfig = {
  name: 'dashboard',
  exposes: {
    DashboardPageComponent:
      'apps/dashboard/src/app/dashboard-page/dashboard-page.component.ts',
  },
};

export default config;
