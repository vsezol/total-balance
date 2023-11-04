import { Type } from '@angular/core';
import { loadRemoteModule } from '@nx/angular/mf';

export const loadUnwrappedRemoteModule = (
  remote: string,
  exposed: string
): Promise<Type<unknown>> =>
  loadRemoteModule(remote, exposed).then((m) => m[exposed]);
