import { AsyncPipe, NgComponentOutlet } from '@angular/common';
import { Component, computed } from '@angular/core';
import {
  getRemoteRouteData,
  loadUnwrappedRemoteModule,
} from '@quotes-mfe/remote-loader';
import {
  SuspenseComponent,
  SuspenseErrorDirective,
  SuspenseLoadingDirective,
  WithSuspensePipe,
} from '@quotes-mfe/suspense';

@Component({
  selector: 'app-profile-page-loader',
  standalone: true,
  imports: [
    SuspenseComponent,
    WithSuspensePipe,
    SuspenseLoadingDirective,
    SuspenseErrorDirective,
    NgComponentOutlet,
    AsyncPipe,
  ],
  template: `
    <lib-suspense>
      <span *libSuspenseLoading>Loading Profile</span>

      <span *libSuspenseError> Sorry! Profile is not available :( </span>

      <ng-container
        *ngComponentOutlet="loadRemoteComponent() | withSuspense | async"
      />
    </lib-suspense>
  `,
})
export class ProfilePageLoaderComponent {
  readonly #remoteRouteData = getRemoteRouteData();

  readonly loadRemoteComponent = computed(() => {
    const { remote, exposed } = this.#remoteRouteData();
    return loadUnwrappedRemoteModule(remote, exposed);
  });
}
