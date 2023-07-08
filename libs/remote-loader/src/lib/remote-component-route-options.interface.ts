import { Type } from '@angular/core';
import { RemoteRouteData } from './remote-route-data.interface';

export interface RemoteComponentRouteOptions {
  component: Type<unknown>;
  data: RemoteRouteData;
}
