import { AsyncPipe, JsonPipe, NgComponentOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed } from '@angular/core';
import {
  SuspenseComponent,
  SuspenseErrorDirective,
  SuspenseLoadingDirective,
  WithSuspensePipe,
} from '@quotes-mfe/suspense';
import { getRemoteRouteData } from './get-remote-route-data.function';
import { loadUnwrappedRemoteModule } from './load-unwrapped-remote-module';

@Component({
  selector: 'lib-remote-component-loader',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    SuspenseComponent,
    WithSuspensePipe,
    SuspenseLoadingDirective,
    SuspenseErrorDirective,
    NgComponentOutlet,
    AsyncPipe,
    JsonPipe,
  ],
  template: `
    <lib-suspense>
      <span *libSuspenseLoading>Loading {{ remoteComponentPath() }}</span>

      <span *libSuspenseError="let error">
        {{ remoteComponentPath() }} is not available :(
      </span>

      <ng-container
        *ngComponentOutlet="loadRemoteComponent() | withSuspense | async"
      />
    </lib-suspense>
  `,
})
export default class RemoteComponentLoaderComponent {
  readonly #remoteRouteData = getRemoteRouteData();

  readonly remoteComponentPath = computed(() => {
    const { remote, exposed } = this.#remoteRouteData();
    return `${remote}/${exposed}`;
  });

  readonly loadRemoteComponent = computed(() => {
    const { remote, exposed } = this.#remoteRouteData();
    return loadUnwrappedRemoteModule(remote, exposed);
  });
}
