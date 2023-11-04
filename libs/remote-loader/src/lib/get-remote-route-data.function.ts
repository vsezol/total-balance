import { Signal, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Data } from '@angular/router';
import { RemoteRouteData } from './remote-route-data.interface';

export function getRemoteRouteData(): Signal<RemoteRouteData> {
  const routeData = toSignal(inject(ActivatedRoute).data);

  return computed(() => {
    const data: Data | undefined = routeData();

    if (!isRemoteRouteData(data)) {
      throw new Error('[getRemoteRouteData] remote route data is not provided');
    }

    return data;
  });
}

function isRemoteRouteData(obj: unknown): obj is RemoteRouteData {
  if (!obj) {
    return false;
  }

  return Object.hasOwn(obj, 'remote') && Object.hasOwn(obj, 'exposed');
}
