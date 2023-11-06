import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RemoteComponentLoaderComponent } from '@total-balance/remote-loader';

@Component({
  selector: 'app-remote-loader',
  standalone: true,
  imports: [RemoteComponentLoaderComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<lib-remote-component-loader />`,
})
export default class RemoteLoaderComponent {}
