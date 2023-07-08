import { AsyncPipe, NgComponentOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { loadUnwrappedRemoteModule } from '@quotes-mfe/remote-loader';
import {
  SuspenseComponent,
  SuspenseErrorDirective,
  SuspenseLoadingDirective,
  WithSuspensePipe,
} from '@quotes-mfe/suspense';

@Component({
  standalone: true,
  imports: [
    RouterModule,
    NgComponentOutlet,
    AsyncPipe,
    SuspenseComponent,
    WithSuspensePipe,
    SuspenseLoadingDirective,
    SuspenseErrorDirective,
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  sidebarComponent = loadUnwrappedRemoteModule('sidebar', 'SidebarComponent');
}
